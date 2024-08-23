import React, { useEffect, useState } from "react";
import AxiosApi from "../../axios/AxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";

const Container = styled.div`
  min-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px;
  background-color: #e5f8ea;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

const ChatListContainer = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #dcdcdc;
`;

const ChatUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ChatRoom = styled.li`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 2px solid #29c555;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;

  &:hover {
    background-color: #eafaf2;
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ChatAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #29c555;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 2em;
  font-weight: bold;
  margin-right: 20px;
`;

const ChatDetails = styled.div`
  flex: 1;
  position: relative;
`;

const ChatName = styled.p`
  font-size: 1.6em;
  color: #333;
  margin: 0 0 5px;
  font-weight: 600;
  @media (max-width: 1024px) {
    font-size: 1.4em;
  }
  @media (max-width: 400px) {
    font-size: 1.2em;
  }
`;

const ChatDate = styled.p`
  font-size: 1.1em;
  color: #999;
  margin: 0;
  text-align: right;
  @media (max-width: 1024px) {
    font-size: 1em;
  }
  @media (max-width: 400px) {
    font-size: 0.9em;
  }
`;

const HeaderText = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2em;
  font-weight: bold;
  border-bottom: 2px solid #29c555;
  padding-bottom: 10px;
`;

function ChatList() {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const rsp = await AxiosApi.chatList();
        console.log(rsp.data);
        setChatRooms(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getChatRoom();
  }, []);

  const enterChatRoom = (roomId) => {
    navigate(`/lend/admin/chatting/${roomId}`);
  };

  return (
    <Container>
      <ChatListContainer>
        <HeaderText>상담 요청 목록</HeaderText>
        <ChatUl>
          {chatRooms.map((room) => (
            <ChatRoom
              key={room.roomId}
              onClick={() => enterChatRoom(room.roomId)}
            >
              <ChatAvatar>{room.roomName.charAt(0)}</ChatAvatar>
              <ChatDetails>
                <ChatName>{room.roomName}</ChatName>
                <ChatDate>{Common.formatDate(room.regDate)}</ChatDate>
              </ChatDetails>
            </ChatRoom>
          ))}
        </ChatUl>
      </ChatListContainer>
    </Container>
  );
}

export default ChatList;
