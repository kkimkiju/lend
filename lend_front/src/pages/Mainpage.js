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

const Mainpage = () => {
  const context = useContext(UserContext);
  const { loginStatus, setLoginStatus } = context;
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [accToken, setAccToken] = useState("");

  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.clear();
    navigate("/");
    setLoginStatus("");
  };

  // 토큰이 없을 때만 카카오 API 요청을 수행하도록 수정
  const kakaoToken = async () => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code || accToken) return; // code가 없거나 이미 토큰이 존재하면 반환

    try {
      const res = await KakaoApi.getToken(code);
      if (res.data) {
        setAccToken(res.data.access_token); // 토큰을 상태에 저장
        kakaoUser(res.data.access_token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!accToken) {
      kakaoToken(); // 초기 렌더링 시에만 카카오 API 호출
    }
  }, [accToken]);

  const kakaoUser = async (token) => {
    try {
      const res = await KakaoApi.getInfo(token);
      console.log("kakaoUser", typeof res.data);
      console.log("res", res.data);

      if (res.data.isMember) {
        login(res.data.userInfo.kakao_account.email, res.data.userInfo.id);
      } else {
        setIsMember(!res.data.isMember);
        localStorage.setItem("email", res.data.userInfo.kakao_account.email);
        setOpenModal(true);
      }
    } catch (err) {
      console.log("카카오 사용자 정보 가져오기 에러: " + err);
    }
  };

  const login = async (email, password) => {
    console.log("카카오 로그인!");
    try {
      const rsp = await AxiosApi.login(email, password);
      if (rsp.data.grantType === "Bearer") {
        setAccToken(rsp.data.accessToken);
        localStorage.setItem("accessToken", rsp.data.accessToken);
        localStorage.setItem("refreshToken", rsp.data.refreshToken);
        console.log(accToken);
        setLoginStatus(true);
        setOpenModal(false);
        navigate("/");
      } else {
        setOpenModal(true);
      }
    } catch (err) {
      console.log("로그인 에러 : " + err);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
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
                <TryBtn
                  as={Link}
                  to="/lend/login"
                  onClick={() => handleLogout()}
                >
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
        <KaKaoSignUpModal open={openModal}></KaKaoSignUpModal>
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
