import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../image/로고.png";
const Header = () => {
  const navigate = useNavigate();

  return (
    <Body>
      <Container>
        <LOGO src={Logo} onClick={() => navigate("/lend")}></LOGO>
        <Box>
          <Menu>대출 상품</Menu>
          <Menu>문의 게시판</Menu>
          <Menu as={Link} to="/lend/wishlist">
            찜 목록
          </Menu>
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

  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 500px) {
    margin: 0;
    margin-top: 20px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
`;

const Box = styled.div`
  display: flex;
`;

const LOGO = styled.img`
  width: 8%;
  height: 8%;
  object-fit: fill;
  cursor: pointer;
  caret-color: transparent;
  @media (max-width: 500px) {
    width: 18%;
    height: 18%;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  font-size: 1.5vw;
  caret-color: transparent;
  color: black;
  cursor: pointer;
  margin: 0 30px; /* Add some spacing between menu items */
  white-space: nowrap;
  text-decoration: none;

  &&:hover {
    color: #29c555;
  }

  @media (max-width: 500px) {
    font-size: 3vw;
    margin-left: 3vw;
  }
`;
