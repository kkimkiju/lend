import React from "react";

const NaverLgoin = () => {
  const NAVER_CLIENT_ID = "ZA8r5FN2jztp7YcszStq"; // 발급받은 클라이언트 아이디
  //const REDIRECT_URI = "http://192.168.10.6:3000/lend"; // Callback URL
  const REDIRECT_URI = "http://localhost:3000/lend"; // Callback URL
  const STATE = "flase";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const Naver = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return <button onClick={Naver}>네이버 로그인</button>;
};

export default NaverLgoin;
