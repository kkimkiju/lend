import styled from "styled-components";
import { useEffect } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  height: 80%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  overflow-y: auto;

  position: relative;
`;

const CloseButton = styled.button`
  background: #e53935;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #c62828;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #f5f5f5;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
  color: #333;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  color: #666;
`;

const TableRow = styled.tr``;

const Section = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

const SectionTitle = styled.h2`
  margin: 0 0 15px 0;
  font-size: 20px;
  font-weight: bold;
  color: #444;
`;

const DetailLoanApp = ({ onClose, loan }) => {
  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 비활성화
    document.body.style.overflow = "hidden";

    // 모달이 닫힐 때 body 스크롤 활성화
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h1
          style={{
            margin: "0 0 20px 0",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          대출 신청서
        </h1>
        <Section>
          <SectionTitle>신청자 정보</SectionTitle>
          <Table>
            <tbody>
              <TableRow>
                <TableCell>신청자 이름</TableCell>
                <TableCell>{loan.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>전화번호</TableCell>
                <TableCell>{loan.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>이메일</TableCell>
                <TableCell>{loan.email}</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </Section>
        <Table>
          <tbody>
            <TableRow>
              <TableHeader>항목</TableHeader>
              <TableHeader>내용</TableHeader>
            </TableRow>
            <TableRow>
              <TableCell>대출명</TableCell>
              <TableCell>{loan.loanName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>대출 금액</TableCell>
              <TableCell>{loan.loanAmount} 원</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>대출 기간</TableCell>
              <TableCell>{loan.loanPeriod}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>이자율</TableCell>
              <TableCell>{loan.rate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>담보 자산</TableCell>
              <TableCell>{loan.property}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>사용 목적</TableCell>
              <TableCell>{loan.usePurpose}</TableCell>
            </TableRow>
          </tbody>
        </Table>

        <Section>
          <SectionTitle>기타 정보</SectionTitle>
          <Table>
            <tbody>
              <TableRow>
                <TableCell>소득</TableCell>
                <TableCell>{loan.income}</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </Section>
      </ModalContainer>
    </Overlay>
  );
};

export default DetailLoanApp;
