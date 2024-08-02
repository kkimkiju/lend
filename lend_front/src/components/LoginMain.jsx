import styled, { css } from "styled-components";
import ThirdLogin from "./ThirdLogin";
import { useEffect, useState } from "react";
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
  transform: ${(props) => (props.isTrue ? "scale(1)" : "scale(0)")};
`;
const Logo = styled.div`
  font-size: 50px;
  color: #504f4f;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 50%;
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
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    }
  };
  return (
    <Container isTrue={isTrue}>
      <Logo>로고</Logo>
      <InputContainer>
        <WithMsg>
          <EmailInput placeholder="Email" onChange={onChangeEmail}></EmailInput>
          {inputEmail.length > 0 && (
            <div className={`${isId ? "success" : "error"}`}>{idMessage}</div>
          )}
        </WithMsg>
        <EmailInput type="password" placeholder="Password"></EmailInput>
        <LoginBtt>로그인</LoginBtt>
        <LoginEtc>
          <>아이디/비밀번호 찾기</>
          <>회원가입</>
        </LoginEtc>
      </InputContainer>
      <ThirdLogin></ThirdLogin>
    </Container>
  );
};
export default LoginMain;
