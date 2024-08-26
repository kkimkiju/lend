import React, { useEffect, useState, useRef } from "react";
import AxiosApi from "../axios/AxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Common from "../utils/Common";

// 스타일 컴포넌트 정의
const ChatListContainer = styled.div`
  width: 20%;
  padding: 30px;
  border-right: 3px solid #29c555;

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
  min-width: 100px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;

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

const LastMessage = styled.div`
  margin-left: 5px;
`;

const UnreadIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #29c555;
`;

const truncateMessage = (message, maxLength) => {
  if (message.length > maxLength) {
    return message.substring(0, maxLength) + "...";
  }
  return message;
};

function AdminChattingSide() {
  const [chatRooms, setChatRooms] = useState([]);
  const wsConnections = useRef({});
  const navigate = useNavigate();
  const [sender, setSender] = useState("");

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await AxiosApi.getMemberInfo();
        setSender(rsp.data.email);
      } catch (error) {
        console.log(error);
      }
    };
    getMember();
  }, []);

  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const rsp = await AxiosApi.chatList();
        const roomsWithMessages = rsp.data.map((room) => ({
          ...room,
          lastMessage: null,
          lastMessageSender: null,
          isRead: false,
        }));
        setChatRooms(roomsWithMessages);
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

        // 해당 채팅방의 마지막 메시지를 업데이트
        setChatRooms((prevRooms) =>
          prevRooms.map((r) =>
            r.roomId === room.roomId
              ? {
                  ...r,
                  lastMessage: data.message,
                  lastMessageSender: data.sender,
                  isRead: false,
                }
              : r
          )
        );
      };

      ws.onclose = () => {
        console.log(`WebSocket closed for room ${room.roomId}`);
      };

      wsConnections.current[room.roomId] = ws;
    });

    return () => {
      Object.values(wsConnections.current).forEach((ws) => ws.close());
    };
  }, [chatRooms]);

  const enterChatRoom = async (roomId) => {
    // 메시지를 읽음으로 처리
    await AxiosApi.markMessagesAsRead(roomId);

    setChatRooms((prevRooms) =>
      prevRooms.map((r) => (r.roomId === roomId ? { ...r, isRead: true } : r))
    );

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
            <LastMessage>
              {truncateMessage(room.lastMessage || "", 8)}
            </LastMessage>
            {room.lastMessage &&
              room.lastMessageSender !== sender &&
              !room.isRead && <UnreadIndicator />}{" "}
          </ChatRoom>
        ))}
      </ChatUl>
    </ChatListContainer>
  );
}

export default AdminChattingSide;
