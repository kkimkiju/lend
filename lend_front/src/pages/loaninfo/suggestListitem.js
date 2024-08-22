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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

const DetTitle = styled.h3`
  flex: 1;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

const Detamo = styled.p`
  flex: 1;
  color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

const Detdate = styled.p`
  flex: 1;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

const SuggestListitem = ({ loanitem, handleDetailClick, category }) => {
  if (!loanitem) {
    return <p>No loan item data available</p>;
  }

  const truncateTitle = (title) => {
    if (!title) return "No title available";
    return title.length > 7 ? title.substring(0, 7) + "..." : title;
  };

  return (
    <DetLi onClick={() => handleDetailClick(loanitem["순번"])}>
      <TiContain>
        <Detdate>
          {loanitem["금융회사 명"] ||
            "데이터를 불러오고 있습니다. 기다려주세요"}
        </Detdate>
      </TiContain>
      <DetTitle>{truncateTitle(loanitem["금융 상품명"])}</DetTitle>
      <Detamo>
        {loanitem["대출종류명"] || "데이터를 불러오고 있습니다. 기다려주세요"}
      </Detamo>
    </DetLi>
  );
};
export default SuggestListitem;
