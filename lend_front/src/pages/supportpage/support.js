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
  }, [currentPage]);
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
  const [writeMode, setWriteMode] = useState(false);
  const handleWriteMode = () => {
    setWriteMode(true);
    showQuestionBoard(false);
  };
  // 글 수정 & 저장
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  // 수정 모드
  const handelEditPost = () => {
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
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <Body>
      <Container>
        {/* <SearchBox> 검색기능 일단 보류<SearchInput /></SearchBox> */}
        <ChatRoomCreate />
        <ButtonBox>
          <Button onClick={BoardHandler(1)}>질문 게시판</Button>
          <Button onClick={BoardHandler(2)}>자주 묻는 질문</Button>
          <WritePost
            writeMode={writeMode}
            setWriteMode={setWriteMode}
            showQuestionBoard={showQuestionBoard}
            showFAQBoard={showFAQBoard}
          />
        </ButtonBox>
        {questionBoard && (
          <>
            <ButtonBox>
              <Button onClick={() => handleWriteMode()}>질문하기</Button>{" "}
            </ButtonBox>
            <Box>
              <Item>
                <div>번호 제목 + 댓글 수 작성자 작성일 </div>
                {questionList.map((question, index) => (
                  <div key={question.id}>
                    <div onClick={() => handleOpenPost(question.id)}>
                      {(currentPage - 1) * pageSize + (index + 1)}{" "}
                      {question.title}{" "}
                      {question.commentList ? question.commentList.length : 0}{" "}
                      {question.memberReqDto.name} {question.createTime}
                    </div>
                  </div>
                ))}
              </Item>
            </Box>
            <ButtonBox>
              <PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전 페이지
              </PageButton>
              {renderPageButtons()}
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음 페이지
              </Button>
            </ButtonBox>
          </>
        )}
        {detailedPost && (
          <Box>
            <Item>
              <button onClick={() => handelEditPost()}> 수정</button>
              <button onClick={() => handleSavePost()}> 저장 </button>
              {editMode ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <div>제목: {currentPost.title}</div>
              )}
              <div>작성자: {currentPost.memberReqDto.name}</div>
              <div>작성일: {currentPost.createTime}</div>
              <div>수정일: {currentPost.modifyTime}</div>
              {editMode ? (
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              ) : (
                <div>내용: {currentPost.content}</div>
              )}
              <div>댓글조회 등록 수정 삭제 대댓글 등록 수정 삭제</div>
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
`;
const Button = styled.button`
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
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
`;
const DropDownButton = styled.button`
  border: 0;
  border-radius: 2vw;
  background-color: transparent;
  padding: 2vw; /* 여백 추가 */
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
`;

const PageButton = styled(Button)`
  background-color: ${({ active }) => (active ? "#ddd" : "#f5f5f5")};
`;
