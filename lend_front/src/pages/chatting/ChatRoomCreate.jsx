import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../axios/AxiosApi";

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
  font-size: 1.5vw;
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const Button = styled.button`
  width: auto;
  height: auto;
  margin: 0.5vw 8vw;
  padding: 0.5vw 1vw;
  border: none;
  border-radius: 1vw;
  white-space: nowrap;
  background-color: #29c555;
  color: white;
  font-size: 1.5vw;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 30vw;
    height: 4vh;
    border-radius: 2vw;
    font-size: 3vw;
    margin: 0.5vh 3vw;
  }
`;

function ChatRoomCreate() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleCreateChatRoom = async () => {
    const response = await AxiosApi.getChatroomName(email);
    if (response.data === null) {
      const rsp = await AxiosApi.chatCreate(email);
      console.log(rsp.data.roomId);
      navigate(`/lend/chatting/${rsp.data.roomId}`);
    } else if (response.data !== null) {
      console.log(response.data);
      navigate(`/lend/chatting/${response.data}`);
    }
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
