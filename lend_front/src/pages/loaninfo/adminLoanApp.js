import { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../axios/AxiosApi";
import DetailLoanApp from "./detailLoanApp";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  height: auto;
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
  width: 100%;
  height: 100%;
  margin-top: 50px;

  @media (max-width: 500px) {
    margin-top: 20px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-start;
  width: 60%;
  margin: 50px 0;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #29c555;
  border-radius: 10px;
  padding: 32px;

  @media (max-width: 500px) {
    width: 90%;
    padding: 16px;
    margin: 20px 0;
  }
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
  position: relative;

  @media (max-width: 500px) {
    width: 90%;
    padding: 15px 20px;
    border-radius: 8px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: 22px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const BaseButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 45px;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ApproveButton = styled(BaseButton)`
  background-color: #f4c542;
  &:hover {
    background-color: gray;
  }
`;

const RejectButton = styled(BaseButton)`
  background-color: #d0021b;

  &:hover {
    background-color: gray;
  }
`;

const RegisterButton = styled(BaseButton)`
  background-color: #29c555;
  &:hover {
    background-color: gray;
  }
`;

const LoanItemContainer = styled.div`
  flex: 1 1 calc(50% - 1rem); /* 두 열로 나누기 위해 설정 */
  min-height: 120px;
  background-color: #fff;
  margin: 0.5rem 0; /* 열 사이 간격 */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  @media (max-width: 500px) {
    flex: 1 1 100%; /* 한 열로 표시 */
    margin: 10px 0; /* 열 사이 간격 */
    padding: 16px;
  }

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const LoanItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LoanName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: bold;
  color: #29c555;
`;

const LoanInfo = styled.p`
  margin: 0;
  margin-bottom: 10px;
  color: #555;
  font-size: 14px;
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
        return "#1100ff"; // 파란색
      case "신청 반려":
        return "#d0021b"; // 빨간색
      default:
        return "#555"; // 기본 색상
    }
  }};
`;

const AdminLoanApp = () => {
  const [loans, setLoans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const rsp = await AxiosApi.getAllLoan();
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
          appDate: loan.appDate,
        }));
        setLoans(loansData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const openModal = (loan) => {
    console.log("Opening modal with item:", loan);
    setIsModalOpen(true);
    setSelectedLoan(loan);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const appSuccess = async (loanid) => {
    const applyconfirm = window.confirm("해당 신청을 등록하시겠습니까?");
    if (applyconfirm) {
      await AxiosApi.approvalsubmit(loanid);
      alert("등록 완료");
      window.location.reload();
    }
  };
  const appReject = async (loanid) => {
    const applyconfirm = window.confirm("해당 신청을 반려하시겠습니까?");
    if (applyconfirm) {
      await AxiosApi.rejectsubmit(loanid);
      alert("반려 완료");
      window.location.reload();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Layout>
        <Header>
          <Title>대출 신청 목록</Title>
        </Header>
        <InputContainer>
          {loans.length > 0 ? (
            loans.map((loan) => (
              <LoanItemContainer key={loan.id}>
                <LoanItem>
                  <LoanName>신청자 : {loan.email}</LoanName>
                  <LoanInfo>대출 이름: {loan.loanName}</LoanInfo>
                  <LoanInfo>신청일: {loan.appDate}</LoanInfo>
                  <LoanStatus status={loan.status}>
                    상태: {loan.status}
                  </LoanStatus>
                </LoanItem>
                <ButtonContainer>
                  <ApproveButton onClick={() => openModal(loan)}>
                    자세히보기
                  </ApproveButton>

                  <RegisterButton onClick={() => appSuccess(loan.id)}>
                    신청 등록
                  </RegisterButton>

                  <RejectButton onClick={() => appReject(loan.id)}>
                    신청 반려
                  </RejectButton>
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

export default AdminLoanApp;
