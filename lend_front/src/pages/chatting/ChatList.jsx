import React, { useEffect, useState } from "react";
import AxiosApi from "../../axios/AxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";

const ChatListContainer = styled.div`
  padding: 30px;
  position: relative;
  margin: 40px;
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ChatRoom = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e9e9e9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;
const Header = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const ChatName = styled.p`
  font-size: 1.5em;
  margin: 0 0 10px 0;
  color: #444;
`;
const ChatDate = styled.p`
  font-size: 1em;
  color: #666;
  margin: 0;
  text-align: right;
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
    navigate(`/lend/chatting/${roomId}`);
  };

  return (
    <ChatListContainer>
      <Header>채팅방 목록</Header>
      <ChatUl>
        {chatRooms.map((room) => (
          <ChatRoom
            key={room.roomId}
            onClick={() => enterChatRoom(room.roomId)}
          >
            <ChatName>{room.roomName}</ChatName>
            <ChatDate>{Common.formatDate(room.regDate)}</ChatDate>
          </ChatRoom>
        ))}
      </ChatUl>
    </ChatListContainer>
  );
}

export default ChatList;
