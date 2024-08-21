//customModalComponent.js
import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes }from "styled-components";

export default function CustomModal({ onClose, message }) {
  return (
    <Body>
      <Containder onClick={onClose}>
        <MessageBox onClick={(e) => e.stopPropagation()}>
          <div>{message}</div>
          <CloseButton onClick={onClose}>확인</CloseButton>
        </MessageBox>
      </Containder>
    </Body>
  );
}

const Body = styled.div`
  width: auto;
  height: auto;
`;
// 외부 배경
const Containder = styled.div`
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 500px) {
    align-items: flex-start;
  }
`;
const slideDown = keyframes`
  from { // 애니메이션 처음 시작 위치
    margin-top: -100vh;
  }
  to { // 애니메이션 종료 후 위치
    margin-top: 5vh;
  }
`
const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 10vw;
  border-radius: 1.5vw;
  background-color: white;
  box-shadow: 0.2vw 0.5vw 0.5vw 0.5vw rgba(0, 0, 0, 0.25);
  @media (max-width: 500px) {
    width: 60vw;
    height: 30vw;
    // 아래로 서서히 내려오는 애니메이션
    animation: ${slideDown} .6s ease forwards;
  }
  > div {
    font-size: 1.5vw;
    color: gray;
    @media (max-width: 500px) {
      font-size: 5vw;
    }
  }
`;

const CloseButton = styled.button`
  width: auto;
  height: auto;
  border: 0;
  border-radius: 5vw;
  font-size: 1vw;
  color: white;
  background-color: #29c555;
  margin: 2vw 0 0 0;
  padding: 0.5vw 2vw;
  transition: background-color 0.2s ease; /* 부드러운 호버 효과 */
  &:hover {
    background-color: #bbb;
  }
  @media (max-width: 500px) {
    font-size: 4vw;
    margin: 4vw 0 0 0;
    padding: 1vw 4vw;
  }
`;
const CheckButton = styled.button`
  width: auto;
  height: auto;
  border: 0;
  border-radius: 5vw;
  font-size: 1vw;
  color: white;
  background-color: #29c555;
  margin: 2vw 0 0 0;
  padding: 0.5vw 2vw;
  transition: background-color 0.2s ease; /* 부드러운 호버 효과 */
  &:hover {
    background-color: #bbb;
  }
`;
