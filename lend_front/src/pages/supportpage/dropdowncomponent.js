import React, { useState, useCallback } from "react";
import styled from "styled-components";
import InfoComponent from "./infocomponent";

export default function DropdownComponent({ number }) {
  const [infoNumber, setInfoNumber] = useState(null);
  const InfoButtonHandler = useCallback(
    (infoInput) => {
      setInfoNumber(infoNumber === infoInput ? null : infoInput);
    },
    [infoNumber]
  );
  return (
    <>
      {number === "menu1" && (
        <ul>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info1")}>
              정보
            </InfoButton>
            {infoNumber === "info1" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info2")}>
              정보
            </InfoButton>
            {infoNumber === "info2" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info3")}>
              정보
            </InfoButton>
            {infoNumber === "info3" && <InfoComponent infoInput={infoNumber} />}
          </li>
        </ul>
      )}
      {number === "menu2" && (
        <ul>22222
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info4")}>
              정보
            </InfoButton>
            {infoNumber === "info4" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info5")}>
              정보
            </InfoButton>
            {infoNumber === "info5" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info6")}>
              정보
            </InfoButton>
            {infoNumber === "info6" && <InfoComponent infoInput={infoNumber} />}
          </li>
        </ul>
      )}
      {number === "menu3" && (
        <ul>33333
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info7")}>
              정보
            </InfoButton>
            {infoNumber === "info7" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info8")}>
              정보
            </InfoButton>
            {infoNumber === "info8" && <InfoComponent infoInput={infoNumber} />}
          </li>
          <li>
            <InfoButton onClick={() => InfoButtonHandler("info9")}>
              정보
            </InfoButton>
            {infoNumber === "info9" && <InfoComponent infoInput={infoNumber} />}
          </li>
        </ul>
      )}
    </>
  );
}
const InfoButton = styled.button`
  border-radius: 2vw;
  background-color: transparent;
`;
