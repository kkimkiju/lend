import styled from "styled-components";
import React from "react";
import LoaninfoListitem from "./loaninfoListitem";

const LoanUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const LoaninfoList = ({ loanitem, onClickde }) => {
  return (
    <ul>
      {loanitem.map((item) => (
        <LoaninfoListitem
          key={item._id}
          loanitem={item}
          onClickde={onClickde}
        />
      ))}
    </ul>
  );
};

export default LoaninfoList;
