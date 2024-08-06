import styled from "styled-components";
import React from "react";
import LoaninfoListitem from "./loaninfoListitem";

const LoanUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const LoaninfoList = ({ loanitem }) => {
  return (
    <LoanUl>
      {loanitem &&
        loanitem.map((item, index) => (
          <LoaninfoListitem key={index} loanitem={item} />
        ))}
    </LoanUl>
  );
};
export default LoaninfoList;
