import React, { useState } from "react";
import "./Login.css"; // 또는 './Login.module.css'

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className={`container ${isSignIn ? "sign-in" : "sign-up"}`}>
      <div className="row">
        {/* SIGN UP */}
        <div
          className={`col align-items-center flex-col ${
            isSignIn ? "sign-up" : ""
          }`}
        >
          <div className="form-wrapper align-items-center">
            <div className={`form sign-up ${isSignIn ? "" : "active"}`}>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="이름" />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input type="email" placeholder="이메일" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="비밀번호" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="비밀번호 확인" />
              </div>
              <button>Sign up</button>
              <p>
                <span> 이미 계정이 있나요? </span>
                <b onClick={toggleForm} className="pointer">
                  {" "}
                  여기서 로그인{" "}
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN UP */}

        {/* SIGN IN */}
        <div
          className={`col align-items-center flex-col ${
            isSignIn ? "" : "sign-in"
          }`}
        >
          <div className="form-wrapper align-items-center">
            <div className={`form sign-in ${isSignIn ? "active" : ""}`}>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="이메일" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" />
              </div>
              <button>로그인</button>
              <br />
              <br />
              <button>카카오톡 로그인</button>
              <p>
                <b> 비밀번호를 잊으셨나요? </b>
              </p>
              <p>
                <span> 계정이 없으신가요? </span>
                <b onClick={toggleForm} className="pointer">
                  {" "}
                  여기서 회원가입{" "}
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN IN */}
      </div>
      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className={`text sign-in ${isSignIn ? "active" : ""}`}>
            <h2>환영합니다</h2>
          </div>
          <div className={`img sign-in ${isSignIn ? "active" : ""}`}></div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className="col align-items-center flex-col">
          <div className={`img sign-up ${!isSignIn ? "active" : ""}`}></div>
          <div className={`text sign-up ${!isSignIn ? "active" : ""}`}>
            <h2>함께 하세요</h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
      {/* END CONTENT SECTION */}
    </div>
  );
};

export default Login;
