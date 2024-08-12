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
    margin-right: 5%;
    width: 16%;
  }
  @media (max-width: 429px) {
    margin: 0;
    width: 33%;
  }
`;

const DetTitle = styled.h3`
  width: 450px;
  color: white;
  margin: 0px 4% 0px 0%;
`;

const Detdate = styled.p`
  color: white;
  font-size: 13px;
  text-align: center;
  width: 180px;
  @media (max-width: 429px) {
    font-size: 11px;
  }
`;
const Detamo = styled.p`
  color: white;
  font-size: 13px;
  text-align: center;
  @media (max-width: 429px) {
    width: 13%;
  }
`;

const SimilListitem = ({ loanitem, onClickde }) => {
  if (!loanitem) {
    console.warn("Invalid loanitem structure:", loanitem);
    return null;
  }

  const truncateTitle = (title) => {
    if (!title) return "No title available";
    return title.length > 25 ? title.substring(0, 25) + "..." : title;
  };

  // Use the property directly from loanitem
  const loanTitle = loanitem["금융 상품명"];
  const loanValue = loanitem["금융회사 명"];
  const rate = loanitem["평균 금리"];

  return (
    <DetLi onClick={() => onClickde(loanitem)}>
      <TiContain>
        <Detdate>
          {loanValue
            ? truncateTitle(loanValue.toString())
            : "No data available"}
        </Detdate>
      </TiContain>
      <DetTitle>{truncateTitle(loanTitle)}</DetTitle>
      <Detamo>{truncateTitle(rate)}</Detamo>
    </DetLi>
  );
};

export default SimilListitem;
