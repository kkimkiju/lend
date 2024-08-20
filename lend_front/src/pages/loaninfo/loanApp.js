import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../../axios/AxiosApi";
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  height: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto; /* Add scrolling if content overflows */
`;

const CloseButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  float: right;

  &:hover {
    background: #c62828;
  }
`;

const Title = styled.h2`
  margin: 0 0 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 90%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background: #388e3c;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const LoanApp = ({ onClose, Item }) => {
  const [formData, setFormData] = useState({
    email: Item.memberId || "",
    loanName: Item.loan_name || "",
    name: "",
    phone: "",
    income: "",
    property: "",
    loanAmount: "",
    loanPeriod: "",
    usePurpose: "",
  });
  const { loan_id } = Item;

  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 비활성화
    document.body.style.overflow = "hidden";

    // 모달이 닫힐 때 body 스크롤 활성화
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 대출 신청 처리 로직 추가
    console.log("Submitted Data:", formData);
    await AxiosApi.loanApp(formData);
    alert("신청 접수가 완료되었습니다.");
    await AxiosApi.deleteShopping(loan_id);
    onClose(); // 폼 제출 후 모달 닫기
    window.location.reload();
  };

  // const Delete = async (loan_id) => {
  //   await AxiosApi.deleteShopping(loan_id);
  // };

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Title>대출 상품 신청</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="loanName">대출 상품 이름</Label>
            <Input
              type="text"
              id="loanName"
              name="loanName"
              value={formData.loanName}
              onChange={handleChange}
              placeholder="예: 주택담보대출"
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="name">이름</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">전화번호</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="income">소득 정보</Label>
            <Input
              type="text"
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              placeholder="월 소득 예: 3000000원"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="property">재산 정보</Label>
            <Input
              type="text"
              id="property"
              name="property"
              value={formData.property}
              onChange={handleChange}
              placeholder="예: 아파트 1채, 자동차 1대"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="loanAmount">대출 금액</Label>
            <Input
              type="number"
              id="loanAmount"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              placeholder="대출 금액을 끝자리까지 숫자로 적어주세요"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="loanPeriod">대출 기간</Label>
            <Input
              type="text"
              id="loanPeriod"
              name="loanPeriod"
              value={formData.loanPeriod}
              onChange={handleChange}
              placeholder="예: 1년, 5년"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="usePurpose">대출 용도</Label>
            <Textarea
              id="usePurpose"
              name="usePurpose"
              value={formData.usePurpose}
              onChange={handleChange}
              placeholder="대출을 받으려는 용도를 입력하세요"
              required
            />
          </FormGroup>
          <ButtonWrapper>
            <SubmitButton type="submit">제출</SubmitButton>
          </ButtonWrapper>
        </form>
      </ModalContainer>
    </Overlay>
  );
};

export default LoanApp;
