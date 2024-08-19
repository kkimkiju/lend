import React from "react";
import styled from "styled-components";

export default function InfoComponent ({ infoInput }){
  return (
    <Body>
      {infoInput === "info1" && (
        <ul>
          <li>상단 메뉴 "대출 상품" 버튼 클릭 후</li>
          <li>일반 신용대출, 전세자금 대출, 주택 담보 대출,</li>
          <li>서민금융 진흥원대출 리스트를 확인 가능 합니다.</li>
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
          <li>주말, 공휴일 제외 영업일 기준 2~3일 소요 됩니다.</li>
        </ul>
      )}
      {infoInput === "info4" && (
        <ul>
          <li>질문게시판 또는 상담원 채팅을 통해 문의 바랍니다.</li>
        </ul>
      )}
      {infoInput === "info5" && (
        <ul>
          <li>메인페이지에서 "Try it" 버튼 클릭 후 여기서 회원가입 버튼을 눌러</li>
          <li> 회원가입이 가능합니다. (카카오톡 로그인 필요)</li>
        </ul>
      )}
      {infoInput === "info6" && (
        <ul>
          <li>로그인 페이지에서 카카오톡 아이콘을 통해 간편로그인이 가능합니다.</li>
        </ul>
      )}
      {infoInput === "info7" && (
        <ul>
          <li>로그인 후 우측 상단 "메인페이지" 버튼 클릭 후 </li>
          <li>프로필 수정 페이지에서 회원정보를 수정 할 수 있습니다.</li>
          
        </ul>
      )}
      {infoInput === "info8" && (
        <ul>
          <li>마이페이지에서 회원 탈퇴 버튼 클릭 후 회원 탈퇴가 가능합니다.</li>
          <li>(회원 탈퇴 후 복구 불가)</li>
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
          <li>발생 오류 내용을 질문게시판 또는 상담사 채팅을 통해</li>
          <li>전달해주시면 빠른 시일내 해결 해 드리겠습니다.</li>
        </ul>
      )}
    </Body>
  );
};

const Body =styled.div`
ul{
  padding-left: 2vw;
  @media (max-width:500px){
    padding-left: 3vw;
  }
}
li{
  font-size: 1.2vw;
  white-space: nowrap;
  @media (max-width:500px){
    font-size: 2.8vw;
  }
}
`