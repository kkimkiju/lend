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

const LastMessage = styled.div``;

const UnreadIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
`;

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
          isRead: false, // 읽음 상태 추가
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
                  lastMessageSender: data.sender, // 메시지 송신자 추가
                  isRead: false, // 새 메시지는 읽지 않은 상태로 설정
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
            <ChatDate>{Common.formatDate(room.regDate)}</ChatDate>
            <LastMessage>
              {room.lastMessage || "최근 메시지가 없습니다."}
            </LastMessage>
            {room.lastMessage &&
              room.lastMessageSender !== sender &&
              !room.isRead && <UnreadIndicator />}{" "}
            {/* 본인이 보낸 메시지가 아니고, 읽지 않은 메시지에만 빨간불 표시 */}
          </ChatRoom>
        ))}
      </ChatUl>
    </ChatListContainer>
  );
}

export default AdminChattingSide;
