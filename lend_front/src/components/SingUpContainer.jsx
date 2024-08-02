import { useEffect, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
const Container = styled.div`
  width: 850px;
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
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86%;
  height: 47px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SingUpContainer = ({ isSignIn }) => {
  const [isTrue, setIsTrue] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [isPhiltrum, setIsPhiltrum] = useState(false);
  // 오류 메시지
  const [idMessage, setIdMessage] = useState("");
  //
  const [checkCert, setCheckCert] = useState("");
  const [inputCert, setInputCert] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [certMessage, setCertMessage] = useState("");
  // 유효성 검사
  const [isId, setIsId] = useState("");

  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");
      setIsId(false);
    } else {
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    }
  };
  useEffect(() => {
    setIsTrue(isSignIn);
  }, [isSignIn]);

  const onClick = () => {
    setIsPhiltrum(true);
    onClickCert();
  };
  const onClickCert = async () => {
    console.log("!");
    if (isId) {
      const certification = Math.floor(Math.random() * 900000) + 100000;
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
  const onBlurCert = () => {
    if (inputCert == checkCert) {
      setCertMessage("");
    } else {
      setCertMessage("인증번호를 정확하게 다시 입력해 주세요.");
    }
  };

  return (
    <Container>
      <SignContainer isTrue={isTrue}>
        <InputContainer>
          <Input placeholder="Email" onChange={(e) => onChangeEmail(e)}></Input>
          {inputEmail.length > 0 && (
            <div className={`${isId ? "success" : "error"}`}>{idMessage}</div>
          )}
          {isPhiltrum && isId ? (
            <Input
              type="text"
              placeholder="인증번호"
              onBlur={onBlurCert}
              onChange={(e) => setInputCert(e.target.value)}
            />
          ) : null}
          <Button onClick={() => onClick()}>인증</Button>
        </InputContainer>
      </SignContainer>
    </Container>
  );
};
export default SingUpContainer;
