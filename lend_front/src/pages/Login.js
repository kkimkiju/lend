import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Text,
  Img,
  Pointer,
  GlobalStyle,
  PointerBox,
  TextAnimation,
} from "../style/LoginStyle";
import LoginMain from "../components/LoginMain";
import styled from "styled-components";
import SingUpContainer from "../components/SingUpContainer";
import FindInfo from "../components/FindInfo";
import { UserContext } from "../context/UserStore";
import FirstPrivacyModal from "../components/member/FirstPrivacyModal";
import SecondPrivacyModal from "../components/member/SecondPrivacyModal";
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10%;
  width: 80%;
  // height: 650px;
  @media only screen and (max-width: 1024px) {
    // height: 550px;
  }
`;
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const context = useContext(UserContext);
  const { isModalOpen, setIsModalOpen, fisrtPrivacyModal, secondPrivacyModal } =
    context;
  const ref = useRef(null);

  const toggleForm = () => {
    setTimeout(() => {
      setIsSignIn(!isSignIn);
    }, 100); // 100ms 딜레이 추가
  };

  // 다른 곳을 클릭하면 드롭다운 닫기
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };
  // 이벤트 리스너 등록
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container isSignIn={isSignIn}>
        <FindInfo open={isModalOpen} ref={ref}></FindInfo>
        <FirstPrivacyModal
          open={fisrtPrivacyModal}
          header="개인정보취급방침"
        ></FirstPrivacyModal>
        <SecondPrivacyModal
          open={secondPrivacyModal}
          header="이용약관"
        ></SecondPrivacyModal>
        <Row>
          <Col isSignIn={!isSignIn}>
            <LoginContainer>
              <SingUpContainer isSignIn={isSignIn}></SingUpContainer>
              <PointerBox isSignIn={!isSignIn}>
                <p>
                  <span> 이미 계정이 있나요? </span>
                  <Pointer onClick={toggleForm}> 여기서 로그인 </Pointer>
                </p>
              </PointerBox>
            </LoginContainer>
          </Col>
          <Col isSignIn={isSignIn}>
            <LoginContainer>
              <LoginMain isSignIn={isSignIn}></LoginMain>
              <PointerBox isSignIn={isSignIn}>
                <p>
                  <span> 계정이 없으신가요? </span>
                  <Pointer onClick={toggleForm}> 여기서 회원가입 </Pointer>
                </p>
              </PointerBox>
            </LoginContainer>
          </Col>
        </Row>
        <Row className="content-row">
          <Col className="media-col">
            <Text isSignIn={isSignIn}>
              <div className="sign-in">
                <TextAnimation>
                  <h2>환영합니다</h2>
                </TextAnimation>
              </div>
            </Text>
            <Img />
          </Col>
          <Col>
            <Img />
            <Text isSignIn={isSignIn}>
              <div className="sign-up">
                <h2>함께 하세요</h2>
              </div>
            </Text>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
