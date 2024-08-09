import React from "react";

export default function InfoComponent ({ infoInput }){
  return (
    <>
      {infoInput === "info1" && (
        <ul>
          <li>하위메뉴1</li>
          <li>하위메뉴2</li>
          <li>하위메뉴3</li>
        </ul>
      )}
      {infoInput === "info2" && (
        <ul>
          <li>하위메뉴4</li>
          <li>하위메뉴5</li>
          <li>하위메뉴6</li>
        </ul>
      )}
      {infoInput === "info3" && (
        <ul>
          <li>하위메뉴7</li>
          <li>하위메뉴8</li>
          <li>하위메뉴9</li>
        </ul>
      )}
    </>
  );
};
