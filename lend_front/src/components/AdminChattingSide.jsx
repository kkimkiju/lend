import React, { useEffect, useState, useRef } from "react";
import AxiosApi from "../axios/AxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Common from "../utils/Common";

const ChatListContainer = styled.div`
  width: 20%;
  padding: 30px;
  border-right: 3px solid #29c555;
  @media (max-width: 1024px) {
    font-size: 1.3em;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

const ChatUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ChatRoom = styled.li`
  border: 3px solid #29c555;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(41, 197, 85, 0.4);
  }
`;

const HeaderText = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  white-space: nowrap;
  @media (max-width: 1024px) {
    font-size: 1.3em;
  }
  @media (max-width: 700px) {
    font-size: 1em;
  }
`;

const ChatName = styled.p`
  font-size: 1.5em;
  margin: 0 0 10px 0;
  color: #444;
  @media (max-width: 1024px) {
    font-size: 1.2em;
  }
  @media (max-width: 400px) {
    font-size: 1.2em;
  }
`;

const ChatDate = styled.p`
  font-size: 1em;
  color: #666;
  margin: 0;
  text-align: right;
  @media (max-width: 1024px) {
    font-size: 0.8em;
  }
  @media (max-width: 400px) {
    font-size: 0.7em;
  }
`;

function AdminChattingSide() {
  const [chatRooms, setChatRooms] = useState([]);
  const wsConnections = useRef({}); // 각 방의 웹소켓 연결을 저장할 객체
  const navigate = useNavigate();

  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const rsp = await AxiosApi.chatList();
        setChatRooms(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getChatRoom();
  }, []);

  useEffect(() => {
    chatRooms.forEach((room) => {
      const ws = new WebSocket(Common.SOCKET_URL);

      ws.onopen = () => {
        console.log(`WebSocket connected for room ${room.roomId}`);
        ws.send(JSON.stringify({ type: "ENTER", roomId: room.roomId }));
      };

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(`Received message in room ${room.roomId}: `, data.message);
        // 필요한 메시지 처리 로직 추가
      };

      ws.onclose = () => {
        console.log(`WebSocket closed for room ${room.roomId}`);
      };

      wsConnections.current[room.roomId] = ws;
    });

    return () => {
      // 컴포넌트가 언마운트될 때 모든 웹소켓 연결 닫기
      Object.values(wsConnections.current).forEach((ws) => ws.close());
    };
  }, [chatRooms]);

  const enterChatRoom = (roomId) => {
    navigate(`/lend/admin/chatting/${roomId}`);
  };

  return (
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
  );
}

export default AdminChattingSide;
