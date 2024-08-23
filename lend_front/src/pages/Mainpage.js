import styled from "styled-components";
import forest from "../image/숲사진.jpg";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import { useContext, useEffect, useState } from "react";
import KakaoApi from "../axios/KakaoApi";
import AxiosApi from "../axios/AxiosApi";
import KaKaoSignUpModal from "../components/KaKaoSignUpModal";
import NaverApi from "../axios/NaverApi";

const Mainpage = () => {
  const { loginStatus, setLoginStatus } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [accToken, setAccToken] = useState("");
  const [pw, setPw] = useState("");

  useEffect(() => {
    if (accToken === "") {
      const initializeLogin = async () => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
          setLoginStatus(true);
        } else {
          setLoginStatus(false);
        }

        const loginMethod = localStorage.getItem("loginMethod");
        const code = new URL(window.location.href).searchParams.get("code");
        const state = new URL(window.location.href).searchParams.get("state");

        if (loginMethod && code) {
          await handleLoginToken(loginMethod, code, state);
        }
      };
      initializeLogin();
    } else {
      navigate("/");
      return;
    }
  }, [accToken]);

  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.clear();
    navigate("/");
  };

  const checkMem = async (email) => {
    try {
      const rsp = await AxiosApi.userCheck(email);
      // isReg 값을 반환하도록 수정
      return rsp.data;
    } catch (e) {
      console.error("User check error:", e);
      return false;
    }
  };

  const handleKakaoUser = async (token) => {
    try {
      const res = await KakaoApi.getInfo(token);
      const isUserRegistered = await checkMem(
        res.data.userInfo.kakao_account.email
      );
      if (isUserRegistered) {
        if (res.data.isMember) {
          console.log("카카오 로그인");
          await login(
            res.data.userInfo.kakao_account.email,
            res.data.userInfo.id
          );
        } else {
          setOpenModal(true);
          setIsMember(true);
          setPw(res.data.userInfo.id);
          localStorage.setItem("email", res.data.userInfo.kakao_account.email);
        }
      } else {
        alert("이미 가입된 아이디 입니다.");
        return;
      }
    } catch (error) {
      console.error("카카오 사용자 정보 가져오기 에러:", error);
      alert("카카오 로그인 중 오류가 발생했습니다.");
    }
  };
  useEffect(() => {
    console.log("openModal 상태 변경:", openModal);
  }, [openModal]);

  const handleLoginToken = async (loginMethod, code, state) => {
    try {
      let response;
      if (loginMethod === "kakao") {
        response = await KakaoApi.getToken(code);
        console.log("response", response.data);
        if (response.data) {
          setAccToken(response.data.access_token);
          await handleKakaoUser(response.data.access_token); // t
        }
      } else if (loginMethod === "naver") {
        const token = { code, state };
        response = await NaverApi.getNaverUserInfo(token); // t
        if (response.data.isMember) {
          setAccToken(response.data.accToken);

          await login(
            response.data.userInfo.response.email,
            response.data.userInfo.response.id
          );
        } else {
          setIsMember(true);
          setPw(response.data.userInfo.response.id);
          localStorage.setItem("email", response.data.userInfo.response.email);
          setOpenModal(true);
        }
      }
    } catch (error) {
      console.error(`${loginMethod} Token Error:`, error);
      alert(`${loginMethod} 로그인 중 오류가 발생했습니다.`);
    }
  };

  const login = async (email, password) => {
    try {
      const rsp = await AxiosApi.login(email, password);
      if (rsp.data.tokenDto.grantType === "Bearer") {
        setAccToken(rsp.data.accessToken);
        localStorage.setItem("accessToken", rsp.data.tokenDto.accessToken);
        localStorage.setItem("refreshToken", rsp.data.tokenDto.refreshToken);
        setLoginStatus(true);
        console.log("이거ㅗㄴ가?ㄴ");
        setOpenModal(false);
        navigate("/");
      } else {
        setOpenModal(true);
      }
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  return (
    <>
      <Body>
        <Container>
          <MainImage>
            <TextOverlay>
              <h1>Always Lend</h1>
              ever land
              <br />
              ever lend
              <br />
              {loginStatus ? (
                <TryBtn as={Link} to="/lend/login" onClick={handleLogout}>
                  로그아웃
                </TryBtn>
              ) : (
                <TryBtn as={Link} to="/lend/login">
                  Try it
                </TryBtn>
              )}
            </TextOverlay>
          </MainImage>
          <Section />
          <Footer />
        </Container>
        <KaKaoSignUpModal open={openModal} login={login} pw={pw} />
      </Body>
    </>
  );
};

const Body = styled.div`
  width: 100%;
  border: 3px solid rgba(41, 197, 85, 0.1);
  border-top: none;
  border-bottom: none;
  @media (max-width: 500px) {
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  height: auto;
  @media (max-width: 500px) {
    width: 99%;
  }
`;

const MainImage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 200px;
  background-image: url(${forest});
  background-size: cover;
  background-position: center; /* 가운데 정렬 */
  height: 400px; /* 필요에 따라 조정 */

  @media (max-width: 500px) {
    margin-bottom: 100px;
    height: 300px;
    margin-top: 20px;
  }
`;

const TextOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  text-align: center;
  justify-content: center;
  caret-color: transparent;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const TryBtn = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 50px;
  border-radius: 100px;
  color: white;
  font-size: 25px;
  text-decoration: none;
  background-color: #29c555;

  font-weight: bold;

  &&:hover {
    background-color: white;
    color: #29c555;
  }
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

export default Mainpage;
