import { useState } from "react";
import styled from "styled-components";
import DropdownComponent from "./dropdowncomponent";

export default function Support() {
  const [dropDown, setDropDown] = useState(null);
  const DropDownHandler = (number) => () => {
    setDropDown(dropDown === number ? null : number);
  };

  return (
    <Body>
      <Container>
        <SearchBox>
          <SearchInput />
        </SearchBox>
        <Box>
          <DropDonwButton onClick={DropDownHandler("menu1")}>
            메뉴1
          </DropDonwButton>
          <DropDonwButton onClick={DropDownHandler("menu2")}>
            메뉴2
          </DropDonwButton>
          <DropDonwButton onClick={DropDownHandler("menu3")}>
            메뉴3
          </DropDonwButton>
          {dropDown && <DropdownComponent number={dropDown} />}
        </Box>
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  & > button:hover {
    background-color: rgb(240, 240, 240);
  }
`;

const DropDonwButton = styled.button`
  border: 0;
  border-radius: 2vw;
  background-color: transparent;
  padding: 2vw; /* 여백 추가 */
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
`;
