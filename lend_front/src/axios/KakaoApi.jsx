import axios from "axios";
//const LEND_DOMAIN = "http://192.168.10.6:8118";
const LEND_DOMAIN = "http://localhost:8118";
const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
//const REDIRECT_URI = "process.env.REACT_APP_REDIRECT_URI";
const REDIRECT_URI = "http://localhost:3000/lend";
const KakaoApi = {
  getToken: async (code) => {
    const data = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
    };
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
