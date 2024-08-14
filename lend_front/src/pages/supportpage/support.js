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
    useEffect(() => {
    fetchQuestionList(currentPage);
  }, [currentPage, writeMode]);
  const handlePageChange = (page) => {
    console.log("questioninfo:", questionList)
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  // 페이지 번호 버튼 생성
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 5; // 표시할 버튼 수
  
    // 현재 페이지가 중앙에 오도록 계산
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;
  
    // 페이지 범위를 벗어나면 조정
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
  
    // 5개의 버튼을 기본으로 생성
    for (let i = 0; i < maxButtons; i++) {
      const pageNumber = startPage + i;
      const isOutOfRange = pageNumber < 1 || pageNumber > totalPages;
  
      buttons.push(
        <PageButton
          key={i}
          onClick={() => handlePageChange(pageNumber)}
          active={!isOutOfRange && pageNumber === currentPage}
          disabled={isOutOfRange} // 페이지 범위 밖의 버튼 비활성화
        >
          {isOutOfRange ? "" : pageNumber}
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
    // 입력값 유효성검사
    if(!editedTitle){
      alert("제목을 입력하세요")
    } else if(!editedContent){
      alert("내용을 입력하세요.")
    } else {
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
        fetchQuestionList(currentPage);
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
              <Button className="writepost" onClick={handleWriteMode}>✒️ 질문하기</Button>
            </ButtonBox>
            <Box >
              <Item >
                <TitleOfPost><div>번호</div><div>제목</div><div>{"댓글"}</div><div>작성자</div><div>작성일</div><div>답변 상태</div></TitleOfPost>
                {questionList.map((question, index) => (
                  <div key={question.id}>
                    <ListOfPost className="boardArea" onClick={() => handleOpenPost(question.id)}>
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
            <PageButtonBox>
              <PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </PageButton>
              {renderPageButtons()}
              <PageButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </PageButton>
            </PageButtonBox>
          </>
        )}
        {detailedPost && (
          <Box>
            <Item>
              {editMode ? (
                <input
                  className="title"
                  type="text"
                  placeholder="제목을 입력해주세요."
                  maxlength="100"
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
                  placeholder="500자 이내로 내용을 입력하세요."
                  maxlength="500"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              ) : (
                <div className="content">{currentPost.content}</div>
              )}
              {isOwner && (
                <ButtonBox className="editpost">
                  {editMode
                  ? (<EditPostButton className="editpost" onClick={handleSavePost} disabled={!editMode}>저장</EditPostButton>)
                  : (<EditPostButton className="editpost" onClick={handleEditPost}>수정</EditPostButton>) }
                  <EditPostButton className="editpost" onClick={handleDeletePost}>삭제</EditPostButton>
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
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  :hover{
    background-color: #DDD;
  }
  >.writepost { // 질문하기 글작성 버튼
    float: right;
    white-space: nowrap;
    margin-left: 800px;
    padding: 0 1vw;
  }
  >.editpost { // 글 수정 관련 버튼
    justify-content: flex-end;
    margin-bottom: 10px;
  }
`;
const Button = styled.button`
  width: auto;
  height: auto;
  border: 0;
  border-radius: 1vw;
  white-space: nowrap;
  font-size: 20px;
  background-color: white;
  margin: 10px 100px;
`;
const EditPostButton = styled.button`
  width: auto;
  height: auto;
  border: 0;
  border-radius: 1vw;
  white-space: nowrap;
  font-size: 20px;
  background-color: white;
  margin: 0 5px;
  padding: 2px 20px;
`
const PageButtonBox = styled.div`
`
const PageButton = styled(Button)`
  border-radius: 10vw;
  background-color: ${(props) => (props.active ? "#29c555" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : props.disabled ? "#000" : "#29c555")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  margin: 0 5px;
  padding: 8px 16px;
  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e9ecef")};
  }
`;
const Box = styled.div`
  width: 60vw;
  min-height: 550px;

  flex-direction: row;
  justify-content: center;
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
  .boardArea:hover{
    background-color: rgba(50,250,100,0.1);
  }
  .editpost {
    justify-content: flex-end;
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
`