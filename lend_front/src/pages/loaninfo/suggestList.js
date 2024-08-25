import styled from "styled-components";
import React from "react";
import SuggestListitem from "./suggestListitem";

const LoanUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SuggestList = ({
  loanitems = [],
  handleDetailClick,
  category,
  isAgeBasedRecommendation,
}) => {
  return (
    <LoanUl>
      {loanitems.length > 0 ? (
        loanitems.map((item) => (
          <SuggestListitem
            key={item._id}
            loanitem={item}
            handleDetailClick={handleDetailClick}
            category={category}
            isAgeBasedRecommendation={isAgeBasedRecommendation}
          />
        ))
      ) : (
        <p>사용자 정보를 입력해주세요</p>
      )}
    </LoanUl>
  );
};

export default SuggestList;
