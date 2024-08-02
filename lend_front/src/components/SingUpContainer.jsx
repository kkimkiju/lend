import { useEffect, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
const Container = styled.div`
  width: 800px;
  height: 650px;
`;

const SignContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2rem;
  border-radius: 100px;
  border: solid 0.75px #c7c7c7;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: 0.5s ease-in-out;
  transform: ${(props) => (props.isTrue ? "scale(0)" : "scale(1)")};
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 50%;
  input:focus {
    outline: 2px solid #29c555;
  }
  /* .success {
    display: none;
  }
  .error{
    
  } */
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
const Input = styled.input`
  all: unset;
  text-align: start;
  width: 80%;
  height: 20px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
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
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86%;
  height: 47px;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  color: ${(props) => (props.isConfirmCer ? "#fff" : "#6b6a6a")};
  background-color: ${(props) => (props.isConfirmCer ? "#29c555" : "#c3cbd1")};

  cursor: pointer;
  user-select: none;
`;
const CheckBox = styled.input``;

const SingUpContainer = ({ isSignIn }) => {
  const [isTrue, setIsTrue] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [isConfirmCer, setIsConfirmCer] = useState(false);
  // 오류 메시지
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
  const [pwdValid, setPwdValid] = useState(false); // 비밀번호 유효성 검사
  const [passwordError, setPasswordError] = useState("");
  //
  const [allChecked, setAllChecked] = useState(false);
  const [date, setDate] = useState(new Date());
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
  useEffect(() => {
    setIsTrue(isSignIn);
  }, [isSignIn]);

  // const onCerClick = () => {
  //   setIsClicked(true);
  // };
  const onClickCert = async () => {
    setIsClicked(true);
    console.log("!");
    if (isId) {
      const certification = Math.floor(Math.random() * 9000) + 1000;
      setCheckCert(certification);

      const templateParams = {
        email: inputEmail,
        certification: certification,
      };
      try {
        await emailjs.send(
          "service_qx3ym3i",
          "template_vhak8ft",
          templateParams,
          "Tn-4FKW92eyP7rCTI"
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
      alert("성공");
    } else {
      setCertMessage("인증번호를 정확하게 다시 입력해 주세요.");
      alert("실패");
    }
  };

  const handleChange = (event) => {
    setInputCert(event.target.value);
    //setIsCerCheck(true);
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
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  return (
    <Container>
      {!isCerCheck ? (
        <SignContainer isTrue={isTrue}>
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
            </WithMsg>
            {isClicked && isId ? (
              <>
                <CertificationInput
                  type="text"
                  placeholder="4자리의 인증번호를 입력해주세요"
                  // onChange={(e) => setInputCert(e.target.value)}
                  onChange={(e) => handleChange(e)}
                  maxLength="4"
                />
              </>
            ) : null}

            {isClicked && isId ? (
              <Button
                onClick={onClick}
                isConfirmCer={isConfirmCer}
                // 4자리 입력
                isCerCheck={isCerCheck}
              >
                확인
              </Button>
            ) : (
              <Button
                onClick={() => onClickCert()}
                isConfirmCer={isConfirmCer}
                // 4자리 입력
                isCerCheck={isCerCheck}
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
            <WithMsg>
              <Input
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
            <Input
              type="date"
              onChange={(e) => handleDateChange(e)}
              // Convert date to 'yyyy-MM-dd' format for input
              value={date}
              min="1900-06-05"
              max={"2199-12-31"}
              placeholder="생년월일"
            />
            <label>
              <CheckBox type="checkbox" />* 개인정보 수집 및 이용 동의
            </label>
            <label>
              <CheckBox type="checkbox" />* 서비스 이용약관 동의
            </label>
            <label>
              <CheckBox type="checkbox" />
              서비스 홍보 및 마케팅 목적의 개인정보 수집 및 이용에 동의합니다.
            </label>
            <label>
              <CheckBox type="checkbox" />
              전체 동의
            </label>
            <Button>가입하기</Button>
            <Button>뒤로가기</Button>
          </InputContainer>
        </SignContainer>
      )}
    </Container>
  );
};
export default SingUpContainer;
