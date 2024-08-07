import { useContext, useEffect } from "react";
import AxiosApi from "../axios/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";

const LoginComponent = ({ isLogin, email, pw, handleLoginFail }) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setLoginStatus, loginStatus } = context;
  useEffect(() => {
    if (loginStatus) {
      navigate("/ ");
    }
  }, []);
  useEffect(() => {
    if (isLogin) {
      Login();
    }
  }, [isLogin]);
  const Login = async () => {
    console.log("밑", isLogin, pw, email);
    try {
      const rsp = await AxiosApi.login(email, pw);
      localStorage.setItem("accessToken", rsp.data.accessToken);
      localStorage.setItem("refreshToken", rsp.data.refreshToken);
      console.log(rsp.data, "data");
      navigate("/lend");
      setLoginStatus(true);
    } catch (e) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      handleLoginFail();
    }
  };

  return;
};
export default LoginComponent;
