import { useEffect } from "react";
import styled from "styled-components";

const DetLi = styled.li`
  background-color: none;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ced4da;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  cursor: pointer;
`;

const TiContain = styled.div`
  align-items: center;
  margin: 0px 0% 9px 0%;
  text-align: center;
  @media (max-width: 500px) {
    width: 33%;
    color: black;
    margin: 0;
  }
`;

const DetTitle = styled.h3`
  width: 450px;
  color: white;
  margin: 0px 4% 0px 0%;
  @media (max-width: 500px) {
    color: black;
    font-size: 13px;
    margin: 0px 0% 0px 17%;
    width: 250px;
  }
`;

const Detdate = styled.p`
  color: white;
  font-size: 13px;
  text-align: center;
  width: 180px;
  @media (max-width: 500px) {
    color: black;
    width: 130px;
  }
`;
const Detamo = styled.p`
  color: white;
  font-size: 13px;
  text-align: center;
  @media (max-width: 500px) {
    width: 13%;
    color: black;
  }
`;

const SimilListitem = ({ loanitem, handleDetailClick, category }) => {
  if (!loanitem) {
    console.warn("Invalid loanitem structure:", loanitem);
    return null;
  }

  const truncateTitle = (title) => {
    if (!title) return "No title available";
    return title.length > 9 ? title.substring(0, 9) + "..." : title;
  };

  // Use the property directly from loanitem
  const loanTitle = loanitem["금융 상품명"];
  const loanValue = loanitem["금융회사 명"];
  const rate = loanitem["평균 금리"];
  const loanRate = loanitem["전처리 이자율"];
  const loanAmount = loanitem["전처리 대출 한도"];
  const loanPeriod = loanitem["전처리 최대 상환 기간"];

  return (
    <DetLi onClick={() => handleDetailClick(loanitem["순번"])}>
      <TiContain>
        <Detdate>
          {truncateTitle(loanValue.toString()) ||
            "최대상환기간" + truncateTitle(loanPeriod) + "년"}
        </Detdate>
      </TiContain>
      <DetTitle>{truncateTitle(loanTitle)}</DetTitle>
      <Detamo>{rate ? truncateTitle(rate) : truncateTitle(loanRate)}</Detamo>
    </DetLi>
  );
};

export default SimilListitem;
