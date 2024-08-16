import React, { useState, useEffect, useRef } from "react";
import Common from "../../utils/Common";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../axios/AxiosApi";
import Back from "../../image/backbutton.png";
import Send from "../../image/sendbutton.png";

const ChatContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(41, 197, 85, 0.4);
  border-radius: 8px;
  border: 3px solid #29c555;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatHeader = styled.div`
  color: #444;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const RoomName = styled.div`
  font-size: 1.5em;
  text-align: center;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
  border-top: 2px solid #29c555;
  border-bottom: 2px solid #29c555;
  padding: 10px;
  margin-bottom: 20px;
`;

const Contents = styled.div`
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  max-width: 60%;
  display: flex;
  flex-direction: column;
`;

const Sender = styled.div`
  display: ${(props) => (props.isSender ? "none" : "block")};
`;

const Message = styled.div`
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSender ? "#29c555" : "#ffffff")};
  border: ${(props) =>
    props.isSender ? "1px solid #29c555" : "1px solid #ffffff"};
  color: ${(props) => (props.isSender ? "#ffffff" : "#000000")};
`;

const Input = styled.input`
  padding: 10px;
  width: 90%;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: rgba(41, 197, 85, 0.05);
  background-image: url(${Send});
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
`;
const CloseButton = styled.button`
  border: none;
  background-color: rgba(41, 197, 85, 0.05);
  background-image: url(${Back});
  background-size: cover;
  background-position: center;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const Chatting = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { roomId } = useParams();
  const ws = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AxiosApi.getChatMessages(roomId); // API 호출 함수 이름 확인 필요
        const fetchedMessages = response.data.map((msg) => ({
          ...msg,
          localDateTime: new Date(msg.localDateTime),
        }));
        setMessages(fetchedMessages);
        console.log("Messages fetched:", fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();
  }, [roomId]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
  };

  const onEnterKey = (e) => {
    if (e.key === "Enter" && inputMsg.trim() !== "") {
      e.preventDefault();
      onClickMsgSend(e);
    }
  };

  const onClickMsgSend = (e) => {
    ws.current.send(
      JSON.stringify({
        type: "TALK",
        roomId: roomId,
        sender: sender,
        message: inputMsg,
      })
    );
    setInputMsg("");
  };
  const onClickMsgClose = () => {
    ws.current.send(
      JSON.stringify({
        type: "CLOSE",
        roomId: roomId,
        sender: sender,
        message: "종료 합니다.",
      })
    );
    ws.current.close();
    navigate(-1);
  };

  // useEffect(() => {
  //   // 이메일로 회원 정보 가져 오기
  //   const getMember = async () => {
  //     try {
  //       const rsp = await AxiosApi.memberGetOne(email);
  //       console.log(rsp.data.name);
  //       setSender(rsp.data.name);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getMember();
  // });
  const sender = localStorage.getItem("email");

  useEffect(() => {
    // 채팅방 정보 가져 오기
    const getChatRoom = async () => {
      try {
        await AxiosApi.chatDetail(roomId);
      } catch (error) {
        console.log(error);
      }
    };
    getChatRoom();
  });

  useEffect(() => {
    console.log("방번호 : " + roomId);
    if (!ws.current) {
      ws.current = new WebSocket(Common.SOCKET_URL);
      ws.current.onopen = () => {
        console.log("connected to " + Common.SOCKET_URL);
        setSocketConnected(true);
      };
    }
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          type: "ENTER",
          roomId: roomId,
          sender: sender,
          message: "처음으로 접속 합니다.",
        })
      );
    }
    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log(data.message);
      setMessages((prevItems) => [...prevItems, data]);
    };
  }, [socketConnected]);

  // 화면 하단으로 자동 스크롤
  // const chatContainerRef = useRef(null);

  // useEffect(() => {
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop =
  //       chatContainerRef.current.scrollHeight;
  //   }
  // }, [chatList]);

  return (
    <ChatContainer>
      <ChatHeader>
        <CloseButton onClick={onClickMsgClose} />
        <RoomName>Lend와 채팅</RoomName>
      </ChatHeader>
      <MessagesContainer ref={messagesEndRef}>
        {messages.map((msg, index) => (
          <Contents key={index} isSender={msg.sender === sender}>
            {msg.sender !== sender && <Sender>{`${msg.sender}`}</Sender>}
            <Message
              isSender={msg.sender === sender}
            >{`${msg.message}`}</Message>
          </Contents>
        ))}
      </MessagesContainer>
      <div>
        <Input
          placeholder="문자 전송"
          value={inputMsg}
          onChange={onChangMsg}
          onKeyUp={onEnterKey}
        />
        <SendButton onClick={onClickMsgSend} />
      </div>
    </ChatContainer>
  );
};

export default Chatting;
