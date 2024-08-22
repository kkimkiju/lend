import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../axios/AxiosApi";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router-dom";
import DetailLoanApp from "./loaninfo/detailLoanApp";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to right, #f9f9f9, #e0e0e0);

  @media (max-width: 500px) {
    flex-direction: column;
    height: 100%;
  }
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
  margin-top: 100px;

  @media (max-width: 500px) {
    margin-top: 0px;
  }
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
  width: 60%;

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
  @media (max-width: 500px) {
    width: 100%;
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
  width: 40%;
  max-width: 600px;
  margin-top: 20px;
  position: relative;

  @media (max-width: 500px) {
    width: 60%;
    padding: 15px 20px;
    border-radius: 8px;
  }
`;
const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: 18px;
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
  justify-content: center;
  align-items: center;
`;
const DeleteBtn = styled.div`
  display: flex;
  align-self: flex-end;
  font-size: 13px;
  color: #999999;

  cursor: pointer;
`;

const Button = styled.button`
  cursor: pointer;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #29c555;
  color: #fff;
  font-weight: bold;
`;

const LoanItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  background-color: #fff;
  margin: 30px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 500px) {
    width: 50vw;
  }
`;

const LoanItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LoanName = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #29c555;
`;

const LoanInfo = styled.p`
  margin: 0;
  color: #555;
`;

const NoLoansMessage = styled.div`
  color: #999;
  font-size: 1.2rem;
  text-align: center;
`;

const LoanStatus = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: ${(props) => {
    switch (props.status) {
      case "운영자 확인 중":
        return "#29c555"; // 초록색
      case "신청 완료":
        return "#1100ff"; // 노란색
      case "신청 반려":
        return "#d0021b"; // 빨간색
      default:
        return "#555"; // 기본 색상
    }
  }};
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
  const [isSocial, setIsSocial] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;
  const [loans, setLoans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
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
    if (loginStatus) {
      getInfo();
      getLoan();
    } else {
      return null;
    }
  }, []);
  const getInfo = async () => {
    const rsp = await AxiosApi.getMemberInfo();
    setName(rsp.data.name);
    setLoginEmail(rsp.data.email);
    setIsSocial(rsp.data.isSocial);
    setIdentityNumber(rsp.data.identityNumber);
  };

  const getLoan = async () => {
    try {
      const rsp = await AxiosApi.getMyLoan();
      console.log(rsp.data);
      const loansData = rsp.data.map((loan) => ({
        id: loan.id,
        loanName: loan.loanName,
        loanAmount: loan.loanAmount,
        loanPeriod: loan.loanPeriod,
        rate: loan.rate,
        income: loan.income,
        phone: loan.phone,
        property: loan.property,
        email: loan.email,
        usePurpose: loan.usePurpose,
        name: loan.name,
        status: loan.status,
      }));
      setLoans(loansData);
    } catch (error) {
      console.error(error);
    }
  };

  const modify = async () => {
    const user = {
      email: loginEmail,
      password: newPassword,
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

  const openModal = (loan) => {
    console.log("Opening modal with item:", loan);
    setIsModalOpen(true);
    setSelectedLoan(loan);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          {isSocial ? (
            <span className="kakaolog">
              소셜 로그인 상태에선 비밀번호 수정이 불가능합니다.
            </span>
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
            {isSocial ? null : <Button onClick={() => modify()}>수정</Button>}
          </ButtonContainer>
          <DeleteBtn className="delete" onClick={() => deleteMember()}>
            회원탈퇴 &gt;
          </DeleteBtn>
        </InputContainer>
      </Layout>
      <Layout>
        <Header>
          <Title>나의 대출 신청 목록</Title>
        </Header>
        <InputContainer>
          {loans.length > 0 ? (
            loans.map((loan) => (
              <LoanItemContainer key={loan.id}>
                <LoanItem>
                  <LoanName>{loan.loanName}</LoanName>
                  <LoanInfo>대출 금액: {loan.loanAmount}</LoanInfo>
                  <LoanInfo>대출 기간: {loan.loanPeriod}</LoanInfo>
                  <LoanInfo>대출 금리: {loan.rate}</LoanInfo>
                </LoanItem>
                <LoanStatus status={loan.status}>{loan.status}</LoanStatus>
                <ButtonContainer>
                  <Button onClick={() => openModal(loan)}>자세히보기</Button>
                </ButtonContainer>
              </LoanItemContainer>
            ))
          ) : (
            <NoLoansMessage>신청하신 대출이 없습니다.</NoLoansMessage>
          )}
        </InputContainer>
      </Layout>
      {isModalOpen && (
        <DetailLoanApp loan={selectedLoan} onClose={closeModal} />
      )}
    </Container>
  );
};
export default Mypage;
