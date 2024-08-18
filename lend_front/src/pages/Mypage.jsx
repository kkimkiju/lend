import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../axios/AxiosApi";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to right, #f9f9f9, #e0e0e0);
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 100%;
  margin: 20px 20%;
`;
const MyinfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
  & span:first-child {
    font-size: 2rem;
    font-weight: bold;
    color: black;
  }
  & span {
    color: #a1a1a1;
    font-size: 0.8rem;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 50%;
  margin: 50px 0;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #29c555;
  border-radius: 10px;
  padding: 32px;
  input:focus {
    outline: 2px solid #29c555;
  }
  .kakaolog {
    padding: 16px;
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
`;
const Header = styled.div`
  background: #29c555;
  color: #fff;
  padding: 20px 30px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  position: relative;

  @media (max-width: 500px) {
    padding: 15px 20px;
    border-radius: 8px;
  }
`;
const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: 24px;
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
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  .delete {
    width: 100%;
    font-size: 12px;
    color: #999999;
  }
`;
const Button = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #29c555;
  color: #fff;
  font-weight: bold;
`;
const Mypage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [pwdValid, setPwdValid] = useState(false); // 비밀번호 유효성 검사
  const [passwordError, setPasswordError] = useState("");
  const [passwordheckError, setPasswordCheckError] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [isKaKao, setIsKaKao] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;

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
  useEffect(() => {
    //getInfo();
  }, []);
  const getInfo = async () => {
    const rsp = await AxiosApi.getMemberInfo();
    console.log(rsp.data, "data");
    setName(rsp.data.name);
    setLoginEmail(rsp.data.email);
    setIsKaKao(rsp.data.isKaKao);
    setIdentityNumber(rsp.data.identityNumber);
  };
  if (loginStatus) {
    getInfo();
  } else {
    return null;
  }
  const modify = async () => {
    const user = {
      email: loginEmail,
      password: newPassword,
      // identityNumber: identityNumber,
      // name: name,
      // isKaKao: false,
    };
    if (pwdValid) {
      try {
        const response = await AxiosApi.modifyMyinfo(user);

        if (response.data) {
          alert("수정에 성공했습니다.");

          console.log(response.data);
          navigate("/");
        }
      } catch (e) {
        console.log(e);
        alert("수정에 실패했습니다.");
      }
    } else {
      alert("유효하지 않은 비밀번호입니다.");
    }
  };
  // 회원탈퇴
  const { setLoginStatus } = context;
  const deleteMember = async () => {
    const userConfirmed = window.confirm("정말 회원 탈퇴 하시겠습니까?");
    if (userConfirmed) {
      try {
        const rsp = await AxiosApi.deleteMember();
        if (rsp.data) {
          alert("회원탈퇴가 완료되었습니다.");
          setLoginStatus(false);
          localStorage.clear();
          navigate("/");
        }
      } catch (e) {
        alert("회원탈퇴중 오류가 발생하였습니다.");
        console.error(e);
      }
    }
  };

  return (
    <Container>
      <Layout>
        <Header>
          <Title>프로필</Title>
        </Header>
        <InputContainer>
          <MyinfoContainer>
            <span>{name}</span>
            <span>{loginEmail}</span>
          </MyinfoContainer>
          {isKaKao ? (
            <span className="kakaolog">카카오 로그인 상태입니다</span>
          ) : (
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
          )}
          <ButtonContainer>
            {isKaKao ? null : <Button onClick={() => modify()}>수정</Button>}

            <div className="delete" onClick={() => deleteMember()}>
              회원탈퇴 &gt;
            </div>
          </ButtonContainer>
        </InputContainer>
      </Layout>
    </Container>
  );
};
export default Mypage;
