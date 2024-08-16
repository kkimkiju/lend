import styled from "styled-components";
import React from "react";
import LoaninfoListitem from "./loaninfoListitem";

const LoanUl = styled.ul`
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const LoaninfoList = ({ loanitem, onClickde }) => {
  return (
    <LoanUl>
      {loanitem.map((item) => (
        <LoaninfoListitem
          key={item._id}
          loanitem={item}
          onClickde={onClickde}
        />
      ))}
    </LoanUl>
  );
};

export default LoaninfoList;
