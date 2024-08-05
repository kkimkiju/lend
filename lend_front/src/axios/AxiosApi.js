import axios from "axios";
import AxiosInstance from "./AxiosInstance";

const LEND_DOMAIN = "http://localhost:8118";
const AxiosApi = {
  // 발행된 토큰을 로컬에 저장
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
  },
  // 로컬에 저장된 토큰 정보 가져오기
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
  // 발행된 리프래시 토큰을 로컬에 저장
  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },
  // 로컬에 저장된 리프레시 토큰 정보 가져옴
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },

  // 토큰 만료시 재발행하기
  // 401 에러 처리 함수
  handleUnauthorized: async () => {
    console.log("handleUnauthorized");
    const refreshToken = AxiosApi.getRefreshToken();
    const config = {
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    try {
      const rsp = await axios.post(
        `${LEND_DOMAIN}/auth/reissued`,
        refreshToken,
        config
      );
      console.log(rsp.data.accessToken);
      AxiosApi.setAccessToken(rsp.data.accessToken);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  // 채팅방 목록 보기
  chatList: async () => {
    return await axios.get(LEND_DOMAIN + "/chat/list");
  },
  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    return await axios.get(`${LEND_DOMAIN}/chat/room/${roomId}`);
  },
  // 채팅방 생성
  chatCreate: async (email) => {
    return await axios.post(
      LEND_DOMAIN + "/chat/new",
      { email }, // JSON 데이터 형태
      { headers: { "Content-Type": "application/json" } }
    );
  },
  // 회원 가입
  signup: async (user) => {
    return await AxiosInstance.post("/auth/signup", user);
  },
  // 회원 가입 여부 체크
  userCheck: async (email) => {
    console.log(email, "email");
    return await axios.get(`${LEND_DOMAIN}/auth/check?email=${email}`);
  },
};

export default AxiosApi;
