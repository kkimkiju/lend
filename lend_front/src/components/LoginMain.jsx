import styled, { keyframes } from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../image/로고.png";
import LoginComponent from "./LoginComponent";
import KaKaoImg from "../image/카카오btn.png";
import NaverImg from "../image/네이버.png";
import { UserContext } from "../context/UserStore";
import { v4 as uuidv4 } from "uuid";

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

  transition: 0.5s ease-in-out;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "0.5s"};
  transform: ${(props) => (props.isTrue ? "scale(1)" : "scale(0)")};
  @media only screen and (max-width: 1024px) {
    height: 80%;
    padding: 52px 0;
  }
  @media only screen and (max-width: 500px) {
    height: 75%;

    gap: 0.5rem;

    animation: none;
    transition: none;
    opacity: 1;
  }
  .error {
    @media only screen and (max-width: 500px) {
      font-size: 7px;
    }
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
const SocialBttContainer = styled.div`
  display: flex;
  gap: 10%;
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
  const [isId, setIsId] = useState("");
  const context = useContext(UserContext);
  const { setIsModalOpen } = context;
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const ref = useRef(null); // Ref를 추가합니다.

  const kakaoLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    //const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const REDIRECT_URI = "http://localhost:3000/lend";
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    localStorage.setItem("loginMethod", "kakao");
    window.location.href = kakaoURL;
  };
  const NaverLogin = () => {
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
    //const REDIRECT_URI = "process.env.REACT_APP_REDIRECT_URI";
    const REDIRECT_URI = "http://localhost:3000/lend"; // Callback URL
    const STATE = uuidv4();
    localStorage.setItem("loginMethod", "naver");
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = NAVER_AUTH_URL;
  };
  useEffect(() => {
    setIsTrue(isSignIn);
  }, [isSignIn]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 유효성 검사

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

  const handleLogin = () => {
    setIsLogin(!isLogin);
    localStorage.setItem("email", inputEmail);
  };
  const handleLoginFail = () => {
    setIsLogin(false);
  };
  const clickModalOpen = () => {
    setIsModalOpen(true);
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
          <div onClick={() => clickModalOpen()}>비밀번호 찾기</div>
          {/* <FindInfo open={isModalOpen} ref={ref}></FindInfo> */}
        </LoginEtc>
      </InputContainer>
      <SocialBttContainer>
        <KaKaoBtt onClick={() => kakaoLogin()}>
          <KaKaoLogo src={KaKaoImg}></KaKaoLogo>
        </KaKaoBtt>
        <KaKaoBtt onClick={() => NaverLogin()}>
          <KaKaoLogo src={NaverImg}></KaKaoLogo>
        </KaKaoBtt>
      </SocialBttContainer>
    </Container>
  );
};
export default LoginMain;
