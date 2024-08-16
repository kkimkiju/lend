import axios from "axios";
import { memo, useContext, useEffect, useState } from "react";
import AxiosApi from "../axios/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import KakaoApi from "../axios/KakaoApi";
import styled from "styled-components";
import KaKaoSignUpModal from "./KaKaoSignUpModal";

const KakaoLogin = ({ openModal }) => {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [kakaoId, setKakaoId] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [accToken, setAccToken] = useState("");
  const context = useContext(UserContext);
  const { setLoginStatus } = context;

  // const kakaoLogin = () => {
  //   const Rest_api_key = "8ec1c2d801a094cbc3c525fe5f6a53d4"; //REST API KEY
  //   const redirect_uri = "http://localhost:3000/lend"; //Redirect URI
  //   // oauth 요청 URL
  //   const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  //   window.location.href = kakaoURL;
  // };
  // const kakaoToken = async () => {
  //   const code = new URL(window.location.href).searchParams.get("code");
  //   try {
  //     const res = await KakaoApi.getToken(code);
  //     if (res.data) {
  //       kakaoUser(res.data.access_token);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // // const checkId = async () => {
  // //     const rsp = await AxiosApi.userCheck()
  // // };
  // const kakaoUser = async (token) => {
  //   const res = await KakaoApi.getInfo(token);
  //   console.log("kakaoUser", typeof res.data);
  //   if (res.data.isMember) {
  //     login(res.data.userInfo.kakao_account.email, res.data.userInfo.id);
  //   } else {
  //     setIsMember(!res.data.isMember);
  //     localStorage.setItem("email", res.data.userInfo.kakao_account.email);
  //     setOpenModal(true);
  //   }
  //   // if (res.data === "") {
  //   //   //handleModal("오류", "이미 일반회원으로 사용중인 이메일입니다", false);
  //   //   alert("이미 일반회원으로 사용중인 이메일입니다");
  //   // }
  // };
  // const closeModal = () => {
  //   setOpenModal(false);
  // };
  // const login = async (email, password) => {
  //   console.log("카카오 로그인!");
  //   try {
  //     const rsp = await AxiosApi.login(email, password);
  //     if (rsp.data.grantType === "Bearer") {
  //       setAccToken(rsp.data.accessToken);
  //       localStorage.setItem("accessToken", rsp.data.accessToken);
  //       localStorage.setItem("refreshToken", rsp.data.refreshToken);
  //       console.log(accToken);
  //       setLoginStatus(true);
  //       setOpenModal(false);
  //       navigate("/");
  //     } else {
  //       setOpenModal(true);
  //     }
  //   } catch (err) {
  //     console.log("로그인 에러 : " + err);
  //   }
  // };

  // useEffect(() => {
  //   kakaoToken();
  // }, []);
  return (
    <>
      {openModal ? (
        <KaKaoSignUpModal open={openModal}></KaKaoSignUpModal>
      ) : null}
    </>
  );
};
export default KakaoLogin;
