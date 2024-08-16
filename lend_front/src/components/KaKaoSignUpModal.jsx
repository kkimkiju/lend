import { useContext, useState } from "react";
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

    /* 팝업이 열릴때 스르륵 열리는 효과 */
    /* animation: modal-bg-show 0.8s; */
  }

  section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    border: 0.8px solid;
    background-color: white;
    overflow: hidden;

    div {
      padding: 16px;
      border-bottom: 2px solid #dee2e6;
      text-align: center;
      color: #333;
      white-space: pre-line;
      line-height: 1.4;
    }
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
  color: #fff;
  background-color: #29c555;
  cursor: pointer;
`;
const DateOfBirth = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 27px;
`;
const Input = styled.input`
  all: unset;
  text-align: start;
  width: 80%;
  height: 16px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const KaKaoSignUpModal = ({ open, close }) => {
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
  console.log("open", open);
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
    console.log(value, "vale");
    if (value === "" || (parseInt(value) > 0 && parseInt(value) < 5)) {
      setIdentifyNum(value);
    } else {
      alert("?");
      return;
    }
  };
  const regist = async () => {
    const user = {
      email: email,
      name: name,
      identityNumber: date + identifyNum,
      isKaKao: true,
    };
    console.log(name, "user + ", email);
    try {
      const response = await AxiosApi.extraInfo(user);
      alert("회원가입에 성공했습니다.");
      setLoginStatus(true);
      console.log(response.data);
      navigate("/");
    } catch (e) {
      console.log(e);
      alert("회원가입중 오류가 발생했습니다.");
    }
  };
  const handleSignUp = () => {
    regist();
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
            <Button onClick={() => handleSignUp()}>확인</Button>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default KaKaoSignUpModal;
