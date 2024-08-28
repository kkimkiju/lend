import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import AxiosApi from "../axios/AxiosApi";
import LogoImg from "../image/로고.png";
import { useNavigate } from "react-router-dom";
import FirstPrivacyModal from "./member/FirstPrivacyModal";
import SecondPrivacyModal from "./member/SecondPrivacyModal";
import { UserContext } from "../context/UserStore";
const Container = styled.div`
  width: 80%;
  @media only screen and (max-width: 1024px) {
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
    border-radius: 50px;
  }
  .error {
    @media only screen and (max-width: 500px) {
      font-size: 8px;
      width: auto;
    }
  }
`;

const SignContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.isTrue ? "0" : "1")};

  transition: 0.5s ease-in-out;
  transform: ${(props) => (props.isTrue ? "scale(0)" : "scale(1)")};
  padding: 100px 0;
  height: 100%;
  @media only screen and (max-width: 1024px) {
    font-size: 12px;
    padding: 70px 0;
  }
  @media only screen and (max-width: 500px) {
    transition: none;
    transform: none;
    height: 97%;
    padding: 16px 0;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 70%;
  input:focus {
    outline: 2px solid #29c555;
  }

  @media only screen and (max-width: 500px) {
    gap: 0.5rem;
  }
`;
const Input = styled.input`
  all: unset;
  text-align: start;
  width: 80%;
  height: 16px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  @media only screen and (max-width: 500px) {
    font-size: 8px;
    padding: 7px;
    width: 45%;
  }
`;
const InfoInput = styled.input`
  all: unset;
  text-align: start;
  width: 80%;
  height: 16px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  @media only screen and (max-width: 768px) {
    height: 12px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 8px;
    padding: 7px;
    width: 75%;
    height: 8px;
    font-size: 8px;
  }
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
    @media only screen and (max-width: 500px) {
      width: auto;
    }
  }
`;
const DateOfBirth = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 27px;
  span {
    @media only screen and (max-width: 768px) {
      display: none;
    }
  }
  span {
    @media only screen and (max-width: 1024px) {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 1024px) {
    padding: 0 10px;
    gap: 0.1rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 8px;
    gap: 0.1rem;
    padding: 0;
    width: 80%;
  }
`;
const CertificationInput = styled.input`
  all: unset;
  text-align: start;
  width: 80%;
  height: 20px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  text {
    border-bottom: 2px solid #000;
  }
  @media only screen and (max-width: 500px) {
    font-size: 8px;
    padding: 7px;
    width: 45%;
  }
`;
// 가입하기 버튼 복사해야되면 하기
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86%;
  height: 47px;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  color: ${(props) =>
    props.isConfirmCer && props.emailExist ? "#fff" : "#6b6a6a"};
  background-color: ${(props) =>
    props.isConfirmCer && props.emailExist ? "#29c555" : "#c3cbd1"};
  // 조건 맞지 않을때 버튼 클릭 비활성화
  pointer-events: ${(props) =>
    props.isConfirmCer && props.emailExist ? "auto" : "none"};
  cursor: pointer;
  /* user-select: none; */
  @media only screen and (max-width: 768px) {
    font-size: 12px;
    padding: 0px;
    width: 70%;
    height: 32px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 8px;
    width: auto;
    height: auto;
    padding: 5px;
  }
`;
const ConfirmButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86%;
  height: 47px;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #29c555;
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    font-size: 12px;
    width: auto;
    height: auto;
    padding: 5px;
  }
`;
const BackButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86%;
  height: 47px;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #29c555;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    width: 80%;
    height: 40px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 8px;
    width: auto;
    height: auto;
    padding: 5px;
  }
`;
const CompelteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86%;
  height: 47px;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  color: ${(props) => (props.isComplete ? "#fff" : "#6b6a6a")};
  background-color: ${(props) => (props.isComplete ? "#29c555" : "#c3cbd1")};
  cursor: pointer;
  user-select: none;
  @media only screen and (max-width: 768px) {
    width: 80%;
    height: 40px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 8px;
    width: auto;
    height: auto;
    padding: 5px;
  }
`;
const AgreementContainer = styled.div`
  display: flex;
  flex-direction: column;

  text-align: start;
  padding: 0 24px;
  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    @media only screen and (max-width: 500px) {
      font-size: 6px;
      display: flex;
    }
  }
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;
const CheckBox = styled.input``;
const PrivacyBtt = styled.div``;
const Logo = styled.img`
  width: 180px;
  height: 110px;
  object-fit: fill;
  cursor: pointer;
  margin-bottom: 32px;
  @media only screen and (max-width: 1024px) {
    width: 120px;
    height: 80px;
  }
  @media only screen and (max-width: 500px) {
    width: 70px;
    height: 50px;
    margin-bottom: 16px;
  }
`;
const SingUpContainer = ({ isSignIn }) => {
  // 회원가입 컨테이너의 상태관리(표시,비표시)
  const [isTrue, setIsTrue] = useState(true);
  // 입력한 이메일
  const [inputEmail, setInputEmail] = useState("");
  // 이메일 형식이 올바른지 체크
  const [isConfirmCer, setIsConfirmCer] = useState(false);
  // 이메일 형식 틀릴 경우오류 메시지
  const [idMessage, setIdMessage] = useState("");
  // 인증번호 성공시 true
  const [isCerCheck, setIsCerCheck] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  //
  const [checkCert, setCheckCert] = useState("");
  const [inputCert, setInputCert] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [certMessage, setCertMessage] = useState("");
  // 유효성 검사
  const [isId, setIsId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [pwdValid, setPwdValid] = useState(false); // 비밀번호 유효성 검사
  const [passwordError, setPasswordError] = useState("");
  const [passwordheckError, setPasswordCheckError] = useState("");

  // 생년월일
  const [date, setDate] = useState("");
  const [identifyNum, setIdentifyNum] = useState("");
  const [name, setName] = useState("");
  // 이메일 중복 여부
  const [emailError, setEmailError] = useState("");
  const [emailExist, setEmailExist] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  // 약관 체크여부
  const [privacyIsChecked, setPrivacyIsChecked] = useState(false);
  const [privacyIsChecked2, setPrivacyIsChecked2] = useState(false);
  const [privacyIsChecked3, setPrivacyIsChecked3] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");
      setIsConfirmCer(false);
      setIsId(false);
    } else {
      setIsConfirmCer(true);
      setIsId(true);
    }
  };
  // 회원정보 중복체크
  useEffect(() => {
    if (isId) {
      const checkMem = async (email) => {
        try {
          const rsp = await AxiosApi.userCheck(email);
          if (rsp.data === false) {
            setEmailError("가입 가능한 아이디입니다.");
            setEmailExist(true);
          } else if (rsp.data === true) {
            setEmailError("중복된 이메일 입니다.");
            setEmailExist(false);
          }
        } catch (e) {}
      };
      checkMem(inputEmail);
    }
  }, [emailError, emailExist, inputEmail, isId]);
  // 회원가입 컨테이너 띄우기
  useEffect(() => {
    setIsTrue(isSignIn);
  }, [isSignIn]);
  // 인증번호 이메일 보내는 함수
  const onClickCert = async () => {
    setIsClicked(true);
    if (isId) {
      const certification = Math.floor(Math.random() * 9000) + 1000;
      setCheckCert(certification);
      const templateParams = {
        email: inputEmail,
        certification: certification,
      };
      try {
        await emailjs.send(
          "service_fu65d2x",
          "template_ubt738r",
          templateParams,
          "HuDGKNw851eq0DIbU"
        );

        setCheckEmail(inputEmail);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const onClick = () => {
    if (inputCert == checkCert) {
      setCertMessage("");
      // 인증번호 성공시 true
      setIsCerCheck(true);
    } else {
      setIsCerCheck(false);
      setCertMessage("인증번호를 정확하게 다시 입력해 주세요.");
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
  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword); // 비밀번호 상태 업데이트

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;',.?/\\-]).{8,}$/; // 수정된 정규식

    if (!passwordRegex.test(newPassword)) {
      setPasswordError("숫자,영어 소문자,특수문자 포함 8자 이상");
      setPwdValid(false);
    } else {
      setPasswordError("");
      setPwdValid(true);
    }
  };
  // 비번 중복 체크
  useEffect(() => {
    if (passwordCheck.length > 0) {
      if (password !== passwordCheck) {
        setPasswordCheckError("비밀번호가 다릅니다.");
        setPwdValid(false);
      } else {
        setPasswordCheckError("");
        setPwdValid(true);
      }
    }
  }, [password, passwordCheck]);

  const handlePwCheck = (e) => {
    setPasswordCheck(e.target.value);
  };
  // 주민번호 앞자리

  const handleDateChange = (e) => {
    const value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setDate(value);
  };
  // 주민번호 뒷자리
  const handleIDNumChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    // .replace(/(\..*)\./g, "$1");
    if (value === "" || (parseInt(value) > 0 && parseInt(value) < 5)) {
      setIdentifyNum(value);
    } else {
      alert("?");
      return;
    }
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  useEffect(() => {}, [date, identifyNum]);

  // 약관 체크
  const handlePrivacyAllCheckboxChange = (e) => {
    const { checked } = e.target;

    setAllChecked(checked);
    setPrivacyIsChecked(checked);
    setPrivacyIsChecked2(checked);
    setPrivacyIsChecked3(checked);
  };
  const handlePrivacyCheckboxChange = (e) => {
    setPrivacyIsChecked(e.target.checked);
  };
  const handlePrivacyCheckboxChange2 = (e) => {
    setPrivacyIsChecked2(e.target.checked);
  };
  const handlePrivacyCheckboxChange3 = (e) => {
    setPrivacyIsChecked3(e.target.checked);
  };
  useEffect(() => {
    if (
      privacyIsChecked &&
      privacyIsChecked2 &&
      password.length > 0 &&
      pwdValid === true &&
      date
    ) {
      setIsComplete(true);
    } else if (
      !privacyIsChecked ||
      !privacyIsChecked2 ||
      pwdValid === false ||
      !date
    ) {
      setIsComplete(false);
    }
  }, [
    date.length,
    password.length,
    privacyIsChecked,
    privacyIsChecked2,
    isComplete,
    pwdValid,
    date,
  ]);
  // 회원가입 버튼 클릭시
  const regist = async () => {
    const user = {
      email: inputEmail,
      password: password,
      identityNumber: date + identifyNum,
      name: name,
      isSocial: false,
    };
    try {
      const response = await AxiosApi.signup(user);
      if (response.data) {
        alert("회원가입에 성공했습니다.");
        window.location.reload();
        // navigate("/apueda/login");
      } else {
        alert("비밀번호, 주민번호, 이름, 스킬 필수 입력");
      }
    } catch (e) {
      console.log(e);
      alert("비밀번호, 주민번호, 이름, 스킬 필수 입력");
    }
  };

  const handleSignUp = () => {
    if (isComplete) {
      regist();
    }
  };
  const BackBtt = () => {
    const confirmMessage =
      "뒤로 가면 변경 사항이 저장되지 않습니다. 계속 하시겠습니까?";
    if (window.confirm(confirmMessage)) {
      window.location.reload();
    } else {
    }
  };
  const context = useContext(UserContext);
  const {
    //fisrtPrivacyModal,
    setFirstPrivacyModal,
    // secondPrivacyModal,
    setSecondPrivacyModal,
  } = context;
  const handlePrivacyModal1 = () => {
    setFirstPrivacyModal(true);
  };
  const handlePrivacyModal2 = () => {
    setSecondPrivacyModal(true);
  };
  return (
    <Container>
      {isCerCheck === false ? (
        <SignContainer isTrue={isTrue}>
          <Logo src={LogoImg} onClick={() => navigate("/lend")}></Logo>
          <InputContainer>
            <WithMsg>
              <Input
                placeholder="Email"
                onChange={(e) => onChangeEmail(e)}
              ></Input>
              {inputEmail.length > 0 && (
                <div className={`${isId ? "success" : "error"}`}>
                  {idMessage}
                </div>
              )}
              {emailExist === false ? (
                <div className={`${emailExist ? "success" : "error"}`}>
                  {emailError}
                </div>
              ) : null}
            </WithMsg>

            {isClicked && isId ? (
              <>
                <CertificationInput
                  type="text"
                  placeholder="4자리의 인증번호를 입력해주세요"
                  onChange={(e) => handleChange(e)}
                  maxLength="4"
                />
                {isCerCheck ? null : (
                  <div style={{ color: "red" }}>{certMessage}</div>
                )}
              </>
            ) : null}

            {isClicked && isId ? (
              <ConfirmButton
                onClick={onClick}
                isConfirmCer={isConfirmCer}
                // 4자리 입력
                isCerCheck={isCerCheck}
              >
                확인
              </ConfirmButton>
            ) : (
              <Button
                onClick={() => onClickCert()}
                isConfirmCer={isConfirmCer}
                // 4자리 입력
                isCerCheck={isCerCheck}
                emailExist={emailExist}
              >
                인증번호 보내기
              </Button>
            )}

            {/* {checkCert ? <div>{certMessage}</div> : null} */}
          </InputContainer>
        </SignContainer>
      ) : (
        <SignContainer isTrue={isTrue}>
          <InputContainer>
            <InfoInput
              type="text"
              placeholder="이름"
              onChange={(e) => handleName(e)}
            ></InfoInput>

            <WithMsg>
              <InfoInput
                type="password"
                placeholder="비밀번호"
                onChange={onChangePassword}
                value={password}
              />
              {password.length > 0 && (
                <div className={pwdValid ? "success" : "error"}>
                  {passwordError}
                </div>
              )}
            </WithMsg>
            <WithMsg>
              <InfoInput
                type="password"
                placeholder="비밀번호 확인 "
                onChange={handlePwCheck}
              ></InfoInput>
              {passwordCheck.length > 0 && (
                <div className={pwdValid ? "success" : "error"}>
                  {passwordheckError}
                </div>
              )}
            </WithMsg>
            <WithMsg>
              <DateOfBirth>
                <InfoInput
                  onChange={(e) => handleDateChange(e)}
                  maxLength="6"
                  placeholder="생년월일"
                  value={date}
                />
                -
                <InfoInput
                  maxLength="1"
                  style={{ width: "10%", textAlign: "center" }}
                  onChange={(e) => handleIDNumChange(e)}
                  value={identifyNum}
                />
                <span>●●●●●●</span>
              </DateOfBirth>
              {!date && date.length > 0 ? (
                <div className={date ? "success" : "error"}>
                  생년월일을 입력해주세요.
                </div>
              ) : null}
            </WithMsg>
            <AgreementContainer>
              <label>
                <CheckBox
                  type="checkbox"
                  onClick={handlePrivacyAllCheckboxChange}
                  checked={allChecked}
                />
                전체 동의
              </label>
              <label>
                <CheckBox
                  type="checkbox"
                  onClick={handlePrivacyCheckboxChange}
                  checked={privacyIsChecked}
                />
                *
                <PrivacyBtt onClick={() => handlePrivacyModal1()}>
                  개인정보 수집
                </PrivacyBtt>
                및 이용 동의
              </label>
              <label>
                <CheckBox
                  type="checkbox"
                  onClick={handlePrivacyCheckboxChange2}
                  checked={privacyIsChecked2}
                />
                *
                <PrivacyBtt onClick={() => handlePrivacyModal2()}>
                  서비스 이용약관
                </PrivacyBtt>
                &nbsp;동의
              </label>
              <label>
                <CheckBox
                  type="checkbox"
                  onClick={handlePrivacyCheckboxChange3}
                  checked={privacyIsChecked3}
                />
                서비스 홍보 및 마케팅 목적의 개인정보 수집 및 이용에 동의합니다.
              </label>
            </AgreementContainer>
            <CompelteButton
              isComplete={isComplete}
              onClick={() => handleSignUp()}
            >
              가입하기
            </CompelteButton>
            <BackButton onClick={() => BackBtt()}>뒤로가기</BackButton>
          </InputContainer>
        </SignContainer>
      )}
      {/* <FirstPrivacyModal
        open={fisrtPrivacyModal}
        close={fisrtPrivacyClose}
      ></FirstPrivacyModal> */}
      {/* <SecondPrivacyModal
        open={secondPrivacyModal}
        close={secondPrivacyClose}
      ></SecondPrivacyModal> */}
    </Container>
  );
};
export default SingUpContainer;
