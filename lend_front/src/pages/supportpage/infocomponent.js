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
          <li>메인페이지에서 "Try it" 버튼 클릭 후 여기서 회원가입 버튼을 눌러 회원가입이 가능합니다. </li>
          <li>하위메뉴11</li>
          <li>하위메뉴12</li>
        </ul>
      )}
      {infoInput === "info5" && (
        <ul>
          <li>로그인 페이지에서 카카오톡 아이콘을 통해 간편로그인이 가능합니다.(카카오톡 로그인 필요)</li>
          <li>하위메뉴14</li>
          <li>하위메뉴15</li>
        </ul>
      )}
      {infoInput === "info6" && (
        <ul>
          <li>로그인 후 우측 상단 "메인페이지" 버튼 클릭 후 프로필 수정 페이지에서 회원정보를 수정 할 수 있습니다.</li>
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
      {infoInput === "info10" && (
        <ul>
          <li>하위메뉴25</li>
          <li>하위메뉴26</li>
          <li>하위메뉴27</li>
        </ul>
      )}
      {infoInput === "info11" && (
        <ul>
          <li>하위메뉴25</li>
          <li>하위메뉴26</li>
          <li>하위메뉴27</li>
        </ul>
      )}
    </>
  );
};
