import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../axios/AxiosApi";

// 스타일 컴포넌트 정의

const ButtonContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid black;
`;

const SpanContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  const email = localStorage.getItem("email");
  const handleCreateChatRoom = async () => {
    const response = await AxiosApi.chatCreate(email);
    console.log(response.data);
    navigate(`/lend/chatting/${response.data.roomId}`);
  };

  return (
    <ButtonContainer>
      <SpanContainer>
        <span>사용 중 궁금한 점을 알려주시면, </span>
        <span>꼼꼼히 확인 후 해결을 도와 드리겠습니다.</span>
      </SpanContainer>

      <Button onClick={handleCreateChatRoom}>상담원연결</Button>
    </ButtonContainer>
  );
}

export default ChatRoomCreate;
