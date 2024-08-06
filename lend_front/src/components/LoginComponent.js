import { useEffect } from "react";
import AxiosApi from "../axios/AxiosApi";

const LoginComponent = ({ isLogin, email, pw }) => {
  const Login = async () => {
    console.log("밑", isLogin, pw, email);
    const rsp = await AxiosApi.login(email, pw);
    localStorage.setItem("accessToken", rsp.data.accessToken);
    localStorage.setItem("refreshToken", rsp.data.refreshToken);
    if (rsp.data) {
      alert("성공");
    } else {
      alert("실패");
    }
  };
  useEffect(() => {
    if (isLogin) {
      Login();
    }
  }, [isLogin]);
  return;
};
export default LoginComponent;
