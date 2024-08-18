import React, { useState, useCallback } from "react";
import styled from "styled-components";
import InfoComponent from "./infocomponent";

export default function DropdownComponent({ number }) {
  const [infoNumber, setInfoNumber] = useState(null);
  const InfoButtonHandler = useCallback(
    (infoInput) => {
      setInfoNumber(infoNumber === infoInput ? null : infoInput);
    },
    [infoNumber]
  );
  return (
    <>
      {number === "menu1" && (
        <List>
          <ul><span>대출관련 문의</span> 
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info1")}>
              대출정보는 어디서 확인 가능 한가요?
            </InfoButton>
            {infoNumber === "info1" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info2")}>
              대출은 어떻게 신청 할 수 있나요?
            </InfoButton>
            {infoNumber === "info2" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info3")}>
              대출 신청 후 대출 신청 후 대출 승인까지 얼마나 걸리나요?
            </InfoButton>
            {infoNumber === "info3" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info4")}>
              대출 승인되었으나 대출금이 입금되지 않아요.
            </InfoButton>
            {infoNumber === "info4" && <InfoComponent infoInput={infoNumber} />}
          </li>
        </ul>
        </List>
        
      )}
      {number === "menu2" && (
        <List>
          <ul><span>회원관련 문의</span>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info5")}>
              회원가입은 어디서 할 수 있나요?
            </InfoButton>
            {infoNumber === "info5" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info6")}>
              다른 사이트 아이디로 간편로그인 할 수 있나요? 
            </InfoButton>
            {infoNumber === "info6" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info7")}>
              회원정보를 수정하고 싶어요.
            </InfoButton>
            {infoNumber === "info7" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info8")}>
              회원 탈퇴하고 싶어요.
            </InfoButton>
            {infoNumber === "info8" && <InfoComponent infoInput={infoNumber} />}
          </li>
        </ul>
        </List>
        
      )}
      {number === "menu3" && (
        <List>
          <ul><span>사용 오류 문의</span> 
            <li>
              <InfoButton onClick={() => InfoButtonHandler("info8")}>
                대출정보가 나오지 않아요
              </InfoButton>
              {infoNumber === "info8" && <InfoComponent infoInput={infoNumber} />}
            </li>
            <li>
              <InfoButton onClick={() => InfoButtonHandler("info9")}>
                대출 신청 중 오류가 발생했어요.
              </InfoButton>
              {infoNumber === "info9" && <InfoComponent infoInput={infoNumber} />}
            </li>
            <li>
              <InfoButton onClick={() => InfoButtonHandler("info10")}>
                채팅 응답이 오지 않아요
              </InfoButton>
              {infoNumber === "info10" && <InfoComponent infoInput={infoNumber} />}
            </li>
            <li>
              <InfoButton onClick={() => InfoButtonHandler("info11")}>
                기타 오류 문의
              </InfoButton>
              {infoNumber === "info11" && <InfoComponent infoInput={infoNumber} />}
            </li>
          </ul>
        </List>
        
      )}
    </>
  );
}
const List = styled.div`
width: 59vw;
& ul{
  font-size: 2vw;
  list-style: none;
  @media (max-width:500px){
      font-size: 4vw;
    }
}
li> button:hover {
    background-color: rgba(50, 250, 100, 0.1);
  }
span{
  padding: 0 1vw;
  border-left: .4vw solid #29c555;
}
`
const InfoButton = styled.button`
  width: 55vw;
  border: 0;
  font-size: 1.3vw;
  text-align: left;
  background-color: transparent;
  padding: 1.5vw; /* 여백 추가 */
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
  @media (max-width:500px){
      font-size: 3vw;
    }
`;
