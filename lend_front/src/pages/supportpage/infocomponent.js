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
      {infoInput === "info4" && (
        <ul>
          <li>하위메뉴10</li>
          <li>하위메뉴11</li>
          <li>하위메뉴12</li>
        </ul>
      )}
      {infoInput === "info5" && (
        <ul>
          <li>하위메뉴13</li>
          <li>하위메뉴14</li>
          <li>하위메뉴15</li>
        </ul>
      )}
      {infoInput === "info6" && (
        <ul>
          <li>하위메뉴16</li>
          <li>하위메뉴17</li>
          <li>하위메뉴18</li>
        </ul>
      )}
      {infoInput === "info7" && (
        <ul>
          <li>하위메뉴19</li>
          <li>하위메뉴20</li>
          <li>하위메뉴21</li>
        </ul>
      )}
      {infoInput === "info8" && (
        <ul>
          <li>하위메뉴22</li>
          <li>하위메뉴23</li>
          <li>하위메뉴24</li>
        </ul>
      )}
      {infoInput === "info9" && (
        <ul>
          <li>하위메뉴25</li>
          <li>하위메뉴26</li>
          <li>하위메뉴27</li>
        </ul>
      )}
    </>
  );
};
