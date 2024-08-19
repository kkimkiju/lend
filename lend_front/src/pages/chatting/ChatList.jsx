import React, { useEffect, useState } from "react";
import AxiosApi from "../../axios/AxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";
import AdminHeader from "../../components/AdminHeader";
import Header from "../../components/Header";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ChatListContainer = styled.div`
  width: 60%;
  padding: 30px;
  background-color: rgba(41, 197, 85, 0.4);
  border: 3px solid #29c555;
  border-radius: 8px;
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
  }
`;
const HeaderText = styled.h1`
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
    navigate(`/lend/admin/chatting/${roomId}`);
  };

  return (
    <>
      <Header />
      <Container>
        <ChatListContainer>
          <HeaderText>상담 요청 목록</HeaderText>
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
      </Container>
    </>
  );
}

export default ChatList;
