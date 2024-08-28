import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../axios/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
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
    input:focus {
      outline: 2px solid #29c555;
    }
    div {
      text-align: center;
      color: #000;
    }
    @media (max-width: 500px) {
      padding: 32px 12px;
      width: 80%;
    }
  }
  .confirm {
    color: #fff;
    width: auto;
    height: 16px;
    min-width: auto;
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
const DateOfBirth = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 0 32px;
  @media (max-width: 500px) {
    width: 98%;
    padding: 0;
    gap: 2px;
  }
`;
const Input = styled.input`
  text-align: start;
  width: 80%;
  height: 16px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 500px) {
    width: 90%;
  }
`;
const KaKaoSignUpModal = ({ open, login, pw }) => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [identifyNum, setIdentifyNum] = useState("");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setLoginStatus } = context;
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDateChange = (e) => {
    const value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setDate(value);
  };
  // 주민번호 뒷자리
  const handleIDNumChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "" || (parseInt(value) > 0 && parseInt(value) < 5)) {
      setIdentifyNum(value);
    } else {
      alert("?");
      return;
    }
  };
  // 회원가입시 추가정보(이름, 생년월일) 기입
  const regist = async () => {
    const user = {
      email: email,
      name: name,
      identityNumber: date + identifyNum,
      isSocial: true,
    };
    try {
      const response = await AxiosApi.extraInfo(user);
      if (response.data) {
        login(email, pw);
        alert("회원가입에 성공했습니다.");
        setLoginStatus(true);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      alert("회원가입중 오류가 발생했습니다.");
    }
  };
  const handleSignUp = () => {
    if (name === "" || date.length < 6 || identifyNum.length < 1) {
      alert("회원정보는 전부 작성해주셔야 합니다.");
      return;
    } else {
      regist();
    }
  };
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>추가 입력</header>
            <Input
              type="text"
              placeholder="이름"
              onChange={(e) => handleName(e)}
            ></Input>
            <DateOfBirth>
              <Input
                onChange={(e) => handleDateChange(e)}
                maxLength="6"
                placeholder="생년월일"
                value={date}
              />
              -
              <Input
                maxLength="1"
                style={{ width: "10%" }}
                onChange={(e) => handleIDNumChange(e)}
                value={identifyNum}
              />{" "}
              ●●●●●●
            </DateOfBirth>
            <Button onClick={() => handleSignUp()} className="confirm">
              확인
            </Button>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default KaKaoSignUpModal;
