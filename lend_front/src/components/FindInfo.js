import { useEffect, forwardRef, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../axios/AxiosApi";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;

    /* 팝업이 열릴때 스르륵 열리는 효과 */
    /* animation: modal-bg-show 0.8s; */
  }

  section {
    display: flex;
    padding: 48px 16px;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    border: 0.8px solid;
    background-color: white;
    overflow: hidden;
    @media only screen and (max-width: 500px) {
      width: 80%;
    }
    div {
      padding: 16px;
      border-bottom: 2px solid #dee2e6;
      text-align: center;
      color: #fff;
      white-space: pre-line;
      line-height: 1.4;
    }
  }
`;
const Input = styled.input`
  text-align: start;
  width: 80%;
  height: 16px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  input:focus {
    outline: 2px solid #29c555;
  }
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  min-width: 120px;
  height: 47px;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  color: #fff;
  background-color: #29c555;
  cursor: pointer;
`;
const WithMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .success {
    display: none;
  }
  .error {
    color: red;
    text-align: start;
    width: 80%;
  }
`;
const FindInfo = forwardRef(({ open }, ref) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isCollect, setIsCollect] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [pwdValid, setPwdValid] = useState(false); // 비밀번호 유효성 검사
  const [passwordError, setPasswordError] = useState("");
  const [passwordheckError, setPasswordCheckError] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  // 인증번호 성공시 true
  const [isCerCheck, setIsCerCheck] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  //
  const [checkCert, setCheckCert] = useState("");
  const [inputCert, setInputCert] = useState("");
  // const [checkEmail, setCheckEmail] = useState("");
  const [certMessage, setCertMessage] = useState("");

  // 아이디 이메일로 유효성검사
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const findPw = async (name, email) => {
    try {
      const rsp = await AxiosApi.findPw(name, email);
      if (rsp.data) {
        setName("");
        alert("인증번호를 발송했습니다.");
        setIsCollect(true);
        console.log(rsp.data);
      } else {
        alert("아이디가 없습니다.");
        return;
      }
    } catch (e) {
      alert("아이디/비밀번호를 모두 입력해주세요.");
      console.error(e);
    }
  };
  const handleSearch = () => {
    console.log("name, email", name, email);
    findPw(name, email);
    onClickCert();
  };
  // 여기 까지 아이디 이메일로 유효성검사

  // 새로운 비밀번호 입력
  const onChangePassword = (e) => {
    const pw = e.target.value;
    setNewPassword(pw); // 비밀번호 상태 업데이트
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;',.?/\\-]).{8,}$/;
    if (!passwordRegex.test(pw)) {
      setPasswordError("숫자,영어 소문자,특수문자 포함 8자 이상");
      setPwdValid(false);
    } else {
      setPasswordError("");
      setPwdValid(true);
    }
  };
  // 비밀번호 재입력 테스트
  useEffect(() => {
    if (passwordCheck.length > 0) {
      if (newPassword !== passwordCheck) {
        setPasswordCheckError("비밀번호가 다릅니다.");
        setPwdValid(false);
      } else {
        setPasswordCheckError("");
        setPwdValid(true);
      }
    }
  }, [newPassword, passwordCheck]);
  const handlePwCheck = (e) => {
    setPasswordCheck(e.target.value);
  };
  const modify = async () => {
    const user = {
      email: email,
      password: newPassword,
      // identityNumber: identityNumber,
      // name: name,
      // isKaKao: false,
    };
    if (pwdValid) {
      try {
        const response = await AxiosApi.extraInfo(user);
        if (response.data) {
          alert("수정에 성공했습니다.");

          console.log(response.data);
          navigate("/lend/login");
        }
      } catch (e) {
        console.log(e);
        alert("수정에 실패했습니다.");
      }
    } else {
      alert("유효하지 않은 비밀번호입니다.");
    }
  };
  // 이메일 인증
  const onClickCert = async () => {
    setIsClicked(true);

    const certification = Math.floor(Math.random() * 9000) + 1000;
    setCheckCert(certification);
    const templateParams = {
      email: email,
      certification: certification,
    };
    console.log("eamiljs , ", templateParams);
    try {
      await emailjs.send(
        "service_fu65d2x",
        "template_ubt738r",
        templateParams,
        "HuDGKNw851eq0DIbU"
      );
      // setCheckEmail(email);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (event) => {
    setInputCert(event.target.value);
    // 숫자만 입력받기
    const value = event.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    event.target.value = value;
  };
  const onClick = () => {
    if (inputCert == checkCert) {
      setCertMessage("");
      // 인증번호 성공시 true
      setIsCerCheck(true);
      alert("성공");
    } else {
      setIsCerCheck(false);
      setCertMessage("인증번호를 정확하게 다시 입력해 주세요.");
      alert("실패");
    }
  };

  const newPw = async () => {
    const user = {
      email: email,
      password: newPassword,
    };
    try {
      const rsp = await AxiosApi.findNewPw(user);
      if (rsp.data) {
        alert("수정성공!");
      } else {
        alert("수정실패");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section ref={ref}>
            <header>비밀번호 찾기</header>
            {isCerCheck ? (
              <>
                <WithMsg>
                  <Input
                    type="password"
                    placeholder="새로운 비밀번호 입력"
                    onChange={onChangePassword}
                    value={newPassword}
                  />
                  {newPassword.length > 0 && (
                    <div className={pwdValid ? "success" : "error"}>
                      {passwordError}
                    </div>
                  )}
                </WithMsg>
                <WithMsg>
                  <Input
                    type="password"
                    placeholder="비밀번호 재입력"
                    onChange={handlePwCheck}
                  />
                  {passwordCheck.length > 0 && (
                    <div className={pwdValid ? "success" : "error"}>
                      {passwordheckError}
                    </div>
                  )}
                </WithMsg>
              </>
            ) : (
              <>
                {isCollect ? (
                  <>
                    <Input
                      type="text"
                      placeholder="4자리의 인증번호를 입력해주세요"
                      onChange={(e) => handleChange(e)}
                      maxLength="4"
                    />
                  </>
                ) : (
                  <>
                    <Input
                      type="text"
                      placeholder="이름"
                      onChange={(e) => handleName(e)}
                    ></Input>
                    <Input
                      type="text"
                      placeholder="이메일"
                      onChange={(e) => handleEmail(e)}
                    ></Input>
                  </>
                )}
              </>
            )}
            {/* 확인버튼 분기 */}
            {isCerCheck ? (
              <Button onClick={() => newPw()}>확인</Button>
            ) : (
              <>
                {isCollect ? (
                  <>
                    {isClicked ? (
                      <Button
                        onClick={() => onClick()}
                        // // 4자리 입력
                        isCerCheck={isCerCheck}
                      >
                        인증번호 확인
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onClickCert()}
                        // // 4자리 입력
                        isCerCheck={isCerCheck}
                      >
                        인증번호 보내기
                      </Button>
                    )}
                  </>
                ) : (
                  <Button onClick={() => handleSearch()}>확인</Button>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </ModalStyle>
  );
});
export default FindInfo;
