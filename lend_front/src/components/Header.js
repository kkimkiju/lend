import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Body>
      <Container>
        <LOGO onClick={() => navigate("/lend")}>Lend</LOGO>
        <Box>
          <Menu>대출 상품</Menu>
          <Menu>문의 게시판</Menu>
          <Menu>마이 페이지</Menu>
        </Box>
      </Container>
    </Body>
  );
};

export default Header;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  margin: 0 15vw;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  @media (max-width: 500px) {
    width: 100vw;
    height: 10vw;
  }
`;

const Box = styled.div`
  display: flex;
`;

const LOGO = styled.div`
  font-size: 50px;
  caret-color: transparent;
  color: #29c555;
  cursor: pointer;
  font-weight: bold;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  font-size: 1.5vw;
  caret-color: transparent;
  cursor: pointer;

  margin: 0 30px; /* Add some spacing between menu items */
`;
