import axios from "axios";

const LEND_DOMAIN = "http://localhost:8118";
const AxiosApi = {
  // 채팅방 목록 보기
  chatList: async () => {
    return await axios.get(LEND_DOMAIN + "/chat/list");
  },
  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    return await axios.get(`${LEND_DOMAIN}/chat/room/${roomId}`);
  },
  // 채팅방 생성
  chatCreate: async (chatRoom) => {
    return await axios.post(LEND_DOMAIN + "/chat/new", chatRoom);
  },
};

export default AxiosApi;
