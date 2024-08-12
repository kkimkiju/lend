import axios from "axios";
const LEND_DOMAIN = "http://localhost:8118";
const Rest_api_key = "8ec1c2d801a094cbc3c525fe5f6a53d4"; //REST API KEY
const redirect_uri = "http://localhost:3000/lend/kakaologin"; //Redirect URI
const KakaoApi = {
  getToken: async (code) => {
    console.log("getToken 실행");
    const data = {
      grant_type: "authorization_code",
      client_id: Rest_api_key,
      redirect_uri: redirect_uri,
      code: code,
    };
    console.log("data", data);
    return await axios.post("https://kauth.kakao.com/oauth/token", data, {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
  },
  getInfo: async (token) => {
    return await axios.post(LEND_DOMAIN + `/kakao/ismember`, token);
  },
};
export default KakaoApi;
