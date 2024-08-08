import styled, { css, keyframes } from "styled-components";
import ThirdLogin from "./ThirdLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../image/로고.png";
import LoginComponent from "./LoginComponent";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2rem;
  border-radius: 100px;
  border: solid 0.75px #c7c7c7;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: 0.5s ease-in-out;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "0.5s"};
  transform: ${(props) => (props.isTrue ? "scale(1)" : "scale(0)")};
`;
const Logo = styled.img`
  width: 180px;
  height: 110px;
  object-fit: fill;
  cursor: pointer;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "1s"};
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 50%;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "1s"};
  input:focus {
    outline: 2px solid #29c555;
  }
`;
const EmailInput = styled.input`
  all: unset;
  width: 80%;
  height: 20px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: start;
`;
const PasswordInput = styled.input`
  all: unset;
  width: 80%;
  height: 20px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: start;
`;
const LoginBtt = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #29c555;
  color: #fff;
  font-weight: bold;
`;
const LoginEtc = styled.div`
  display: flex;
  gap: 10px;
`;
const WithMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .success {
    color: royalblue;
    text-align: start;
    width: 80%;
  }
  .error {
    color: red;
    text-align: start;
    width: 80%;
  }
`;
const LoginMain = ({ isSignIn }) => {
  const [inputEmail, setInputEmail] = useState("");
  // 오류 메시지
  const [idMessage, setIdMessage] = useState("");
  const [isTrue, setIsTrue] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const [pw, setPw] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setIsTrue(isSignIn);
  }, [isSignIn]);

  // 유효성 검사
  const [isId, setIsId] = useState("");
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");

      setIsId(false);
    } else {
      setIdMessage("");
      setIsId(true);
    }
  };
  useEffect(() => {
    console.log(pw, "pw");
  }, [pw]);
  const handleLogin = () => {
    setIsLogin(!isLogin);
    localStorage.setItem("email", inputEmail);
  };
  const handleLoginFail = () => {
    setIsLogin(false);
  };
  return (
    <Container isTrue={isTrue}>
      <Logo src={LogoImg} onClick={() => navigate("/lend")}></Logo>
      <InputContainer>
        <WithMsg>
          <EmailInput placeholder="Email" onChange={onChangeEmail}></EmailInput>
          {inputEmail.length > 0 && (
            <div className={`${isId ? "success" : "error"}`}>{idMessage}</div>
          )}
        </WithMsg>
        <PasswordInput
          type="password"
          placeholder="Password"
          onChange={(e) => setPw(e.target.value)}
        ></PasswordInput>
        <LoginBtt onClick={handleLogin}>
          로그인
          <LoginComponent
            isLogin={isLogin}
            pw={pw}
            handleLoginFail={handleLoginFail}
            email={inputEmail}
          ></LoginComponent>
        </LoginBtt>
        <LoginEtc>
          <>아이디/비밀번호 찾기</>
          <>회원가입</>
        </LoginEtc>
      </InputContainer>
      <ThirdLogin></ThirdLogin>
      {/* <WithMsg>
              <Input
                placeholder="Email"
                onChange={(e) => onChangeEmail(e)}
              ></Input>
              {inputEmail.length > 0 && (
                <div className={`${isId ? "success" : "error"}`}>
                  {idMessage}
                </div>
              )}
            </WithMsg> */}
    </Container>
  );
};
export default LoginMain;
