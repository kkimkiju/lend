import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosApi from "../axios/AxiosApi";
import Logo from "../image/로고.png";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";

const Header = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;
  const [findAdmin, setFindAdmin] = useState("");
  useEffect(() => {
    if (loginStatus === true) {
      const fetchData = async () => {
        try {
          const rsp = await AxiosApi.getMemberInfo();
          if (rsp.data) {
            setFindAdmin(rsp.data.email);
          }
        } catch (e) {
          console.error(e);
          alert("header");
        }
      };
      fetchData();
    }
  }, [loginStatus]);

  return (
    <Body>
      <Container>
        <LOGO src={Logo} onClick={() => navigate("/lend")}></LOGO>
        {loginStatus ? (
          <Box>
            {findAdmin !== "admin" && (
              <Menu as={Link} to="/lend/Loaninfo">
                대출 상품
              </Menu>
            )}
            <Menu as={Link} to="/lend/support">
              문의 게시판
            </Menu>
            {findAdmin !== "admin" && (
              <Menu as={Link} to="/lend/wishlist">
                찜 목록
              </Menu>
            )}
            {findAdmin !== "admin" && (
              <Menu as={Link} to="/lend/mypage">
                마이 페이지
              </Menu>
            )}
            {findAdmin === "admin" && (
              <Menu as={Link} to="/lend/chatlist">
                실시간 문의
              </Menu>
            )}
            {findAdmin === "admin" && (
              <Menu as={Link} to="/lend/loanapp">
                대출 신청 목록
              </Menu>
            )}
          </Box>
        ) : (
          <Box>
            <Menu>대출 상품</Menu>
            <Menu as={Link} to="/lend/login">
              문의 게시판
            </Menu>
            <Menu as={Link} to="/lend/login">
              찜 목록
            </Menu>
            <Menu as={Link} to="/lend/login">
              마이 페이지
            </Menu>
          </Box>
        )}
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
  margin: 0 30px;
  white-space: nowrap;
  text-decoration: none;

  &&:hover {
    color: #29c555;
  }

  @media (max-width: 500px) {
    font-size: 10px;
    margin-left: 1px;
  }
`;
