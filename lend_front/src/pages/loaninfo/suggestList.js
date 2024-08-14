import styled from "styled-components";
import React from "react";
import SuggestListitem from "./suggestListitem";

const LoanUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SuggestList = ({ loanitems = [], onClickde }) => {
  return (
    <LoanUl>
      {loanitems.length > 0 ? (
        loanitems.map((item) => (
          <SuggestListitem
            key={item._id}
            loanitem={item}
            onClickde={onClickde}
          />
        ))
      ) : (
        <p>No items available</p>
      )}
    </LoanUl>
  );
};

export default SuggestList;
