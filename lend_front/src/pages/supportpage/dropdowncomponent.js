import React from "react";

export default function DropdownComponent ({ number }){
  return (
    <>
      {number === "menu1" && (
        <ul>
          <li>메뉴1</li>
          <li>메뉴2</li>
          <li>메뉴3</li>
        </ul>
      )}
      {number === "menu2" && (
        <ul>
          <li>메뉴4</li>
          <li>메뉴5</li>
          <li>메뉴6</li>
        </ul>
      )}
      {number === "menu3" && (
        <ul>
          <li>메뉴7</li>
          <li>메뉴8</li>
          <li>메뉴9</li>
        </ul>
      )}
    </>
  );
};
