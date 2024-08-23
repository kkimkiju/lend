import { useContext, useEffect } from "react";
import AxiosApi from "../axios/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";

const LoginComponent = ({ isLogin, email, pw, handleLoginFail }) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setLoginStatus } = context;

  useEffect(() => {
    if (isLogin) {
      Login();
    }
  }, [isLogin]);

  const Login = async () => {
    try {
      const rsp = await AxiosApi.login(email, pw);
      localStorage.setItem("accessToken", rsp.data.tokenDto.accessToken);
      localStorage.setItem("refreshToken", rsp.data.tokenDto.refreshToken);
      console.log(rsp.data, "rsp 권한");
      const authorities = rsp.data.authorities;
      setLoginStatus(true); // 로그인 상태 업데이트

      if (authorities.includes("ROLE_ADMIN")) {
        navigate("/lend");
      } else {
        navigate("/lend");
      }
    } catch (e) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      handleLoginFail();
    }
  };

  return;
};
export default LoginComponent;
