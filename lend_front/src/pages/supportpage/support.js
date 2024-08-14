//support/js
import { useEffect, useState, useId } from "react";
import styled from "styled-components";
import DropdownComponent from "./dropdowncomponent";
import ChatRoomCreate from "../chatting/ChatRoomCreate";
import AxiosApi from "../../axios/AxiosApi";
import WritePost from "./writepost";
import CommentComponent from "./commentComponent";

export default function Support() {
  const [questionBoard, showQuestionBoard] = useState(true);
  const [FAQBoard, showFAQBoard] = useState(false);
  const [writeMode, setWriteMode] = useState(false);
  const [answerState, setAnswerState] = useState(false); //관리자 답변 여부 관리
  const BoardHandler = (number) => () => {
    if (number === 1) {
      showQuestionBoard(true);
      showDetailedPost(false);
      showFAQBoard(false);
      setEditMode(false);
      setWriteMode(false);
    } else if (number === 2) {
      showQuestionBoard(false);
      showDetailedPost(false);
      showFAQBoard(true);
      setEditMode(false);
      setWriteMode(false);
    }
    console.log(questionBoard, FAQBoard);
  };
  const [dropDown, setDropDown] = useState(null);
  const DropDownHandler = (number) => () => {
    setDropDown(dropDown === number ? null : number);
  };
  // 페이지 관련
  const [questionList, setQuestionList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 초기값 1페이지
  const pageSize = 10; // 페이지당 글 수
  useEffect(() => {
    const fetchQuestionList = async (page) => {
      try {
        const response = await AxiosApi.getQuestionList(page - 1); // 백엔드로 요청할 때는 page-1을 보냄
        if (response.data && Array.isArray(response.data.boards)) {
          setQuestionList(response.data.boards);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Unexpected response format", response.data);
        }
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    };
    fetchQuestionList(currentPage);
  }, [currentPage, writeMode]);
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  // 페이지 번호 버튼 생성
  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PageButton
          key={i}
          onClick={() => handlePageChange(i)}
          active={i === currentPage}
        >
          {i}
        </PageButton>
      );
    }
    return buttons;
  };
  // 세부 게시글 조회 코드
  const [detailedPost, showDetailedPost] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentPostId, setCurrentPostId] =useState(null)
  const handleOpenPost = async (id) => {
    try {
      const response = await AxiosApi.getDetailedPost(id);
      if (response.data) {
        showDetailedPost(true);
        showQuestionBoard(false);
        setCurrentPost(response.data);
        setCurrentPostId(id);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  //글 작성 컴포넌트 활성화
  const handleWriteMode = () => {
    setWriteMode(true);
    showQuestionBoard(false);
  };
  // 글 수정 & 저장
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  // 수정 모드
  const handleEditPost = () => {
    if (currentPost) {
      setEditedTitle(currentPost.title);
      setEditedContent(currentPost.content);
      setEditMode(true);
    }
  };
  // 저장 요청
  const handleSavePost = async () => {
    if (!currentPost) return;
    const questionDto = {
      id: currentPost.id,
      title: editedTitle,
      content: editedContent,
      memberReqDto: {
        email: localStorage.getItem("email"),
      },
    };
    try {
      const response = await AxiosApi.modifyQuestion(questionDto);
      if (response.data) {
        console.log(response.data);
        setEditMode(false);
        // 현재 게시글을 갱신
        setCurrentPost({
          ...currentPost,
          title: editedTitle,
          content: editedContent,
          modifyTime: response.data.modifyTime,
        });
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  // 글 삭제
  const handleDeletePost = async () => {
    if (!currentPost) return;
    try {
      const response = await AxiosApi.deleteQuestion(currentPost.id);
      
      if (response.data) {
        alert("게시글이 삭제되었습니다.");
        // 삭제 후 게시판 목록으로 돌아가기
        showDetailedPost(false);
        showQuestionBoard(true);
        // 게시글 목록 갱신
      }
    } catch (error) {
      console.log(currentPost.id);
      console.error(error.response);
    }
  };
  // 현재 로그인된 사용자의 이메일과 글 작성자의 이메일 비교  + 관리자 계정인지 확인 기능 추가 필요
  const isOwner = localStorage.getItem("email") === currentPost?.memberReqDto?.email;
  return (
    <Body>
      <Container>
        {/* <SearchBox> 검색기능 일단 보류<SearchInput /></SearchBox> */}
        <ChatRoomCreate />
        <ButtonBox>
          <Button onClick={BoardHandler(1)}>질문 게시판</Button>
          <Button onClick={BoardHandler(2)}>자주 묻는 질문</Button>
        </ButtonBox>
        <WritePost
            writeMode={writeMode}
            setWriteMode={setWriteMode}
            showQuestionBoard={showQuestionBoard}
            showFAQBoard={showFAQBoard}
          />
        {questionBoard && (
          <>
            <ButtonBox>
              <Button className="writepost" onClick={handleWriteMode}>질문하기</Button>
            </ButtonBox>
            <Box className="boardArea">
              <Item >
                <TitleOfPost><div>번호</div><div>제목</div><div>{"댓글"}</div><div>작성자</div><div>작성일</div><div>답변처리</div></TitleOfPost>
                
                {questionList.map((question, index) => (
                  <div key={question.id}>
                    <ListOfPost onClick={() => handleOpenPost(question.id)}>
                      <div>{(currentPage - 1) * pageSize + (index + 1)}</div>
                      <div>{question.title}</div>
                      <div>{question.commentList ? question.commentList.length : "" }</div>
                      <div>{question.memberReqDto.name}</div> 
                      <div>{question.createTime.slice(0, 11)}</div>
                      {/* 관리자 계정 답변이 하나라도 있으면 완료처리 */}
                      <div>{question.commentList && question.commentList.some(comment =>comment?.member?.authority === "ROLE_ADMIN")
                        ? "완료"
                        : "미처리"}
                      </div>
                    </ListOfPost>
                  </div>
                ))}
              </Item>
            </Box>
            <ButtonBox>
              <PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </PageButton>
              {renderPageButtons()}
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </Button>
            </ButtonBox>
          </>
        )}
        {detailedPost && (
          <Box>
            <Item>
              {editMode ? (
                <input
                  className="title"
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <div className="title">{currentPost.title}</div>
              )}
              <PostInfoBox>
              <div>작성자</div><div>{currentPost.memberReqDto.name}</div>
              <div>작성일</div><div>{currentPost.createTime}</div>
              <div>수정일</div><div>{currentPost.modifyTime}</div>
              </PostInfoBox>
              {editMode ? (
                <textarea
                  className="content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              ) : (
                <div className="content">{currentPost.content}</div>
              )}
              {isOwner && (
                <ButtonBox>
                  <button onClick={handleEditPost}>수정</button>
                  <button onClick={handleSavePost} disabled={!editMode}>저장</button>
                  <button onClick={handleDeletePost}>삭제</button>
                </ButtonBox>
              )}
              <CommentComponent currentPostId = {currentPostId}/>
            </Item>
          </Box>
        )}
        {FAQBoard && (
          <Box>
            <Item>
              <DropDownButton onClick={DropDownHandler("menu1")}>
                메뉴1
              </DropDownButton>
              <DropDownButton onClick={DropDownHandler("menu2")}>
                메뉴2
              </DropDownButton>
              <DropDownButton onClick={DropDownHandler("menu3")}>
                메뉴3
              </DropDownButton>
            </Item>
            <ListItem>
              {dropDown && <DropdownComponent number={dropDown} />}
            </ListItem>
          </Box>
        )}
      </Container>
    </Body>
  );
}

const Body = styled.div`
  width: auto;
  height: auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100dvw;
  height: 100dvh;
`;
const SearchBox = styled.div`
  justify-content: flex-start;
`;
const SearchInput = styled.input`
  width: 100dvw;
  height: 30dvw;
  background-color: blue;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: auto;
  height: 3vh;
  margin-bottom: 20px;
`;
const Button = styled.button`
  width: auto;
  height: auto;
  border: 0;
  background-color: transparent;
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
  border-radius: 1vw;
  font-size: 30px;
  margin: 2vw 5vw;
  .writepost {
    width: 100%;
    float: right;
    margin-left: 50vw;
    background-color: blue;
  }
`;
const PageButton = styled(Button)`
height: 5vh;
  background-color: ${({ active }) => (active ? "#ddd" : "#f5f5f5")};
`;
const Box = styled.div`
  width: 60vw;
  min-height: 550px;

  flex-direction: row;
  justify-content: center;
  .boardArea{
    background-color: aqua;
  }
`;
const ListItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  & > button:hover {
    background-color: rgb(240, 240, 240);
  }
  .title{
    font-size: 40px;
    border-left: 5px solid #29c555;
    padding: 0 15px;
  }
  .content{
    font-size: 30px;
    min-height: 300px;
    white-space: pre-wrap; //textArea에서 엔터친부분이 줄바꿈되도록 설정
  }

`;
const DropDownButton = styled.button`
  border: 0;
  border-radius: 2vw;
  background-color: transparent;
  padding: 2vw; /* 여백 추가 */
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
`;

const PostInfoBox =styled.div`
display: flex;
align-items: center;
white-space: nowrap;
color: gray;
margin: 20px 0;
& div {
  margin: 0 2px;
  font-size: 15px;
}
  & div:nth-child(odd){
    color: white;
    border-radius: 5vw;
    background-color: #29c555;
    padding: 2px 10px;
  }
`
const TitleOfPost =styled.div`
  width: 60vw;
  height: 3vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  border-bottom: 0.2vw solid;
  margin: 1vw 0 0 0;
  & div {
    width: 10vw;
    font-size: 1vw;
    margin: 0;
  }
  & div:nth-child(1){ // 게시글리스트 번호부분 
    width: 5vw;
  }
  & div:nth-child(2){ // 게시글리스트 제목부분
    width: 20vw;
  }
  & div:nth-child(3){ // 댓글수 부분
    width: 2vw;
  }
`
const ListOfPost = styled.div`
  width: 60;
  height: 2.5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  & div{
    width: 10vw;
    height: auto;
    font-size: 1vw;
  }
  & div:nth-child(1){ // 게시글리스트 번호부분 
    width: 5vw;
  }
  & div:nth-child(2){ // 게시글리스트 제목부분
    width: 20vw;
    //텍스트 줄이기 세트
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  & div:nth-child(3){ // 댓글수 부분
    width: 2vw;
    text-align: left;
  }
  :hover{
    background-color: #DDD;
  }
`