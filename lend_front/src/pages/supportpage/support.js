import { useEffect, useState } from "react";
import styled from "styled-components";
import DropdownComponent from "./dropdowncomponent";
import ChatRoomCreate from "../chatting/ChatRoomCreate";
import AxiosApi from "../../axios/AxiosApi";

export default function Support() {
  const [questionBoard, showQuestionBoard] = useState(true);
  const [FAQBoard, showFAQBoard] = useState(false);
  const BoardHandler = (number) => () => {
    if (number === 1) {
      showQuestionBoard(true);
      showFAQBoard(false);
    } else if (number === 2) {
      showQuestionBoard(false);
      showFAQBoard(true);
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
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // 페이지당 글 수
  useEffect(() => {
    const fetchQuestionList = async (page = 0) => {
      try {
        const response = await AxiosApi.getQuestionList(page + 1);
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
    fetchQuestionList(currentPage - 1 );
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

  return (
    <Body>
      <Container>
        {/* <SearchBox> 검색기능 일단 보류<SearchInput /></SearchBox> */}
        <ChatRoomCreate />
        <ButtonBox>
          <Button onClick={BoardHandler(1)}>질문 게시판</Button>
          <Button onClick={BoardHandler(2)}>자주 묻는 질문</Button>
        </ButtonBox>
        {questionBoard && (
          <Box>
            <Item>
              <div>번호 제목 + 댓글 수 작성자 작성일 </div>
              {questionList.map((question, index) => (
                <div key={question.id}>
                  <div>
                  {((currentPage - 1) * pageSize) + (index + 1)} {question.title}{" "}
                    {question.commentList ? question.commentList.length : 0}{" "}
                    {question.memberReqDto.name} {question.createTime}
                  </div>
                </div>
              ))}
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
        <ButtonBox>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전 페이지
          </Button>
          {renderPageButtons()}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음 페이지
          </Button>
        </ButtonBox>
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
  background-color: ${({ active }) => (active ? '#ddd' : '#f5f5f5')};
`;
