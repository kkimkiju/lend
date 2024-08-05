import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Text,
  Img,
  Pointer,
  GlobalStyle,
} from "../style/LoginStyle";
import LoginMain from "../components/LoginMain";
import styled from "styled-components";
import SingUpContainer from "../components/SingUpContainer";
const LoginContainer = styled.div`
  margin: 0 10%;
  width: 800px;
  height: 650px;
`;
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      <GlobalStyle />
      <Container isSignIn={isSignIn}>
        <Row>
          <Col isSignIn={!isSignIn}>
            <SingUpContainer isSignIn={isSignIn}></SingUpContainer>
            <p>
              <span> 이미 계정이 있나요? </span>
              <Pointer onClick={toggleForm}> 여기서 로그인 </Pointer>
            </p>
          </Col>
          <Col isSignIn={isSignIn}>
            <LoginContainer>
              <LoginMain isSignIn={isSignIn}></LoginMain>
              <p>
                <span> 계정이 없으신가요? </span>
                <Pointer onClick={toggleForm}> 여기서 회원가입 </Pointer>
              </p>
            </LoginContainer>
          </Col>
        </Row>
        <Row className="content-row">
          <Col>
            <Text isSignIn={isSignIn}>
              <div className="sign-in">
                <h2>환영합니다</h2>
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
