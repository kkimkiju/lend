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
    return await AxiosInstance.get("/chat/list");
  },
  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    return await AxiosInstance.get(`/chat/room/${roomId}`);
  },
  // 채팅방 생성
  chatCreate: async (email) => {
    return await AxiosInstance.post(
      "/chat/new",
      { email }, // JSON 데이터 형태
      { headers: { "Content-Type": "application/json" } }
    );
  },

  // 로그인
  login: async (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    return await axios.post(LEND_DOMAIN + "/auth/login", user);
  },
  // 회원 가입
  signup: async (user) => {
    return await axios.post(LEND_DOMAIN + "/auth/signup", user);
  },
  // 회원 가입 여부 체크
  userCheck: async (email) => {
    console.log(email, "email");
    return await axios.get(`${LEND_DOMAIN}/auth/check?email=${email}`);
  },
  // 문의게시판 ----------------------
  // 글생성
  createQuestion: async (questionDto) =>{
    return await AxiosInstance.post(`${LEND_DOMAIN}/support/create-question`, questionDto)
  },
  // 글조회
  getQuestionList: async (page) =>{
    return await AxiosInstance.get(`${LEND_DOMAIN}/support/question-list?page=${page}&size=10`);
  },
  // 글 입장 글 세부 정보
  getDetailedPost: async (id) =>{
    return await AxiosInstance.get(`${LEND_DOMAIN}/support/detailed-question/${id}`)
  },
  // 글수정
  modifyQuestion : async (questionDto)=>{
    return await AxiosInstance.put(`${LEND_DOMAIN}/support/modify-question`, questionDto)
  },
  // 글삭제
  deleteQuestion : async (id)=> {
    return await AxiosInstance.delete(`${LEND_DOMAIN}/support/modify-question/${id}`)
  },
  // 댓글생성
  createComment: async (commentDto)=>{
    return await AxiosInstance.post(`${LEND_DOMAIN}/support/create-comment`, commentDto)
  },
  // 댓글조회
  getComment: async (questionId) =>{
    return await AxiosInstance.get(`${LEND_DOMAIN}/support/question/${questionId}`)
  },
  // 댓글수정
  modifyCommnet: async (commnetDto)=>{
    return await AxiosInstance.put(`${LEND_DOMAIN}/support/modify-comment`, commnetDto)
  },
  // 댓글가상삭제
  deleteCommnet: async (id) =>{
    return await AxiosInstance.put(`${LEND_DOMAIN}/support/delete-comment/${id}`)
  },
  // 문의게시판 ----------------------
};

export default AxiosApi;
