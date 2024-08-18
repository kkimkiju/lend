import styled, { keyframes } from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../image/로고.png";
import LoginComponent from "./LoginComponent";
import KaKaoImg from "../image/카카오btn.png";
import FindInfo from "./FindInfo";
import { UserContext } from "../context/UserStore";
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
  @media only screen and (max-width: 1024px) {
    height: 80%;
    padding: 56px;
  }
  @media only screen and (max-width: 500px) {
    height: 65%;
    border-radius: 50px;
    padding: 0;
    gap: 0.5rem;
  }
`;
const Logo = styled.img`
  width: 180px;
  height: 110px;
  object-fit: fill;
  cursor: pointer;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "1s"};
  @media only screen and (max-width: 1024px) {
    width: 120px;
    height: 80px;
  }
  @media only screen and (max-width: 500px) {
    width: 70px;
    height: 50px;
  }
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
  @media only screen and (max-width: 1024px) {
    gap: 1rem;
    font-size: 12px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 12px;
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
  @media only screen and (max-width: 1024px) {
    height: 10px;
  }
  @media only screen and (max-width: 500px) {
    padding: 8px;
    font-size: 8px;
  }
`;
const PasswordInput = styled.input`
  all: unset;
  width: 80%;
  height: 20px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: start;
  @media only screen and (max-width: 1024px) {
    height: 10px;
  }
  @media only screen and (max-width: 500px) {
    padding: 8px;
    font-size: 8px;
  }
`;
const LoginBtt = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #29c555;
  color: #fff;
  font-weight: bold;
  @media only screen and (max-width: 1024px) {
    width: 70px;
    height: 40px;
    font-size: 12px;
  }
  @media only screen and (max-width: 500px) {
    width: 54px;
    height: 27px;
    font-size: 8px;
  }
`;
const LoginEtc = styled.div`
  display: flex;
  gap: 10px;
  & {
    @media only screen and (max-width: 500px) {
      font-size: 6px;
    }
  }
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
const KaKaoBtt = styled.div``;
const KaKaoLogo = styled.img`
  width: 50px;
  height: 50px;
  @media only screen and (max-width: 1024px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 500px) {
    width: 25px;
    height: 25px;
  }
`;
const LoginMain = ({ isSignIn }) => {
  const [inputEmail, setInputEmail] = useState("");
  // 오류 메시지
  const [idMessage, setIdMessage] = useState("");
  const [isTrue, setIsTrue] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const context = useContext(UserContext);
  const { setIsModalOpen } = context;
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  // const ref = useRef(null);
  const kakaoLogin = () => {
    const Rest_api_key = "8ec1c2d801a094cbc3c525fe5f6a53d4"; //REST API KEY
    const redirect_uri = "http://localhost:3000/lend"; //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.href = kakaoURL;
  };

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
  // // 다른 곳을 클릭하면 드롭다운 닫기
  // const handleClickOutside = (event) => {
  //   if (ref.current && !ref.current.contains(event.target)) {
  //     setIsModalOpen(false);
  //   }
  // };
  // // 이벤트 리스너 등록
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     console.log("mouse down 실행");
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
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
          <div onClick={() => setIsModalOpen(true)}>비밀번호 찾기</div>
          {/* <FindInfo open={isModalOpen} ref={ref}></FindInfo> */}
        </LoginEtc>
      </InputContainer>
      <KaKaoBtt onClick={() => kakaoLogin()}>
        <KaKaoLogo src={KaKaoImg}></KaKaoLogo>
      </KaKaoBtt>
    </Container>
  );
};
export default LoginMain;
