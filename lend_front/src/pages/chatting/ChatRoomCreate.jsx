import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../axios/AxiosApi";

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; // 버튼 사이의 간격
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

function ChatRoomCreate() {
  const navigate = useNavigate();
  const email = "test";
  const handleCreateChatRoom = async () => {
    const response = await AxiosApi.chatCreate(email);
    console.log(response.data);
    navigate(`/lend/chatting/${response.data.roomId}`);
  };

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={handleCreateChatRoom}>상담원연결</Button>
      </ButtonContainer>
    </Container>
  );
}

export default ChatRoomCreate;
