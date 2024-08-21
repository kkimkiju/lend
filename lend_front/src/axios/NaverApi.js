import axios from "axios";
//const LEND_DOMAIN = "http://192.168.10.6:8118";
const LEND_DOMAIN = "http://localhost:8118";
const NaverApi = {
  getNaverUserInfo: async (value) => {
    return await axios.post(LEND_DOMAIN + "/naver/token", value);
  },
};
export default NaverApi;
