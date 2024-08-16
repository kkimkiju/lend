import styled from "styled-components";

const DetLi = styled.li`
  display: flex;

  align-items: center;
  border-bottom: 2px solid #ced4da;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const TiContain = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const DetTitle = styled.h3`
  flex: 1;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Detamo = styled.p`
  flex: 1;
  color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Detdate = styled.p`
  flex: 1;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
        </Detdate>
        {/* 기본값 설정 */}
      </TiContain>
      <DetTitle>{truncateTitle(loanitem._source["금융 상품명"])}</DetTitle>
      <Detamo>{loanitem._source["대출종류명"] || "No loan type"}</Detamo>{" "}
      {/* 기본값 설정 */}
    </DetLi>
  );
};

export default LoaninfoListitem;
