import styled from "styled-components";
import React from "react";
import SimilListitem from "./similListitem";

const SimilUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SimilList = ({ loanitems = [], handleDetailClick, category }) => {
  return (
    <SimilUl>
      {loanitems.length > 0 ? (
        loanitems.map((item, index) => (
          <SimilListitem
            key={index} // 데이터의 고유 ID가 있다면 그 값을 사용하는 것이 좋습니다.
            loanitem={item}
            handleDetailClick={handleDetailClick}
            category={category}
          />
        ))
      ) : (
        <li>No loan items available</li>
      )}
    </SimilUl>
  );
};

export default SimilList;
