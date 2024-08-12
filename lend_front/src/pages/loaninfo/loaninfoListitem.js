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
  margin: 0px 22% 9px 12%;
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
  color: black;
  margin: 0px 4% 0px 0%;
  @media (max-width: 500px) {
    margin-right: 17%;
  }
  @media (max-width: 429px) {
    margin-right: 14%;
    font-size: 17px;
  }
`;

const Detamo = styled.p`
  color: #444;
  font-size: 13px;
  text-align: center;
  @media (max-width: 429px) {
    width: 13%;
  }
`;

const Detdate = styled.p`
  color: #777;
  font-size: 13px;
  text-align: center;
  width: 180px;
  @media (max-width: 429px) {
    font-size: 11px;
  }
`;

const LoaninfoListitem = ({ loanitem, onClickde }) => {
  // title이 undefined일 경우 처리
  const truncateTitle = (title) => {
    if (!title) return "No title available"; // 기본값을 설정하거나 빈 문자열 반환
    return title.length > 25 ? title.substring(0, 25) + "..." : title;
  };

  return (
    <DetLi onClick={() => onClickde(loanitem)}>
      <TiContain>
        <Detdate>
          {loanitem._source["금융회사 명"] || "No company name"}
        </Detdate>{" "}
        {/* 기본값 설정 */}
      </TiContain>
      <DetTitle>{truncateTitle(loanitem._source["금융 상품명"])}</DetTitle>
      <Detamo>{loanitem._source["대출종류명"] || "No loan type"}</Detamo>{" "}
      {/* 기본값 설정 */}
    </DetLi>
  );
};

export default LoaninfoListitem;
