import { useState } from "react";
import styled from "styled-components";
import DropdownComponent from "./dropdowncomponent";

export default function Support() {
  const [questionBoard, showQuestionBoard] = useState(null);
  const [FAQBoard, showFAQBoard] = useState(null);
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

  return (
    <Body>
      <Container>
        {/* <SearchBox> 검색기능 일단 보류<SearchInput /></SearchBox> */}
        <ButtonBox>
          <Button onClick={BoardHandler(1)}>질문 게시판</Button>
          <Button onClick={BoardHandler(2)}>자주 묻는 질문</Button>
        </ButtonBox>
        {questionBoard && (
          <Box>
            <Item>
              <div>번호 제목 + 댓글 수 작성자 작성일  </div>
              <div>목록</div>
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
