import React, { useState, useEffect, useRef } from "react";
import Common from "../../utils/Common";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../axios/AxiosApi";
import Back from "../../image/backbutton.png";
import Send from "../../image/sendbutton.png";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  justify-content: center;
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 80%;
  padding: 20px;
  max-width: 60%;
  margin: 0 auto;
  background-color: rgba(41, 197, 85, 0.4);
  border-radius: 8px;
  border: 3px solid #29c555;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const ChatHeader = styled.div`
  color: #444;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const RoomName = styled.div`
  font-size: 1.5em;
  @media (max-width: 1024px) {
    font-size: 1.3em;
  }
  @media (max-width: 400px) {
    font-size: 1.2em;
  }
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
  overflow-y: auto;
  border-top: 2px solid #29c555;
  border-bottom: 2px solid #29c555;
  padding: 10px;
  margin-bottom: 20px;
`;

const Contents = styled.div`
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  max-width: 480px;
  display: flex;
  flex-direction: column;
`;

const Sender = styled.div`
  display: ${(props) => (props.isSender ? "none" : "block")};
  margin-bottom: -10px;
  margin-left: -10px;
`;

const Message = styled.div`
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSender ? "#29c555" : "#ffffff")};
  border: ${(props) =>
    props.isSender ? "1px solid #29c555" : "1px solid #ffffff"};
  color: ${(props) => (props.isSender ? "#ffffff" : "#000000")};
`;
const MessageAndTime = styled.div`
  display: flex;
  flex-direction: row;
`;
const SendTime1 = styled.div`
  display: ${(props) => (props.isSender ? "block" : "none")};
  align-self: flex-end;
  margin-bottom: 10px;
  margin-right: 2px;
  white-space: nowrap;
`;
const SendTime2 = styled.div`
  display: ${(props) => (props.isSender ? "none" : "block")};
  align-self: flex-end;
  margin-bottom: 10px;
  margin-left: 2px;
  white-space: nowrap;
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding-right: 50px;
`;

const SendButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 15px;
  border: none;
  background-color: rgba(41, 197, 85, 0.05);
  background-image: url(${Send});
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 4px;
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
  const [sender, setSender] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { roomId } = useParams();
  const ws = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await AxiosApi.getMemberInfo();
        console.log(rsp.data);
        setSender(rsp.data.email);
      } catch (error) {
        console.log(error);
      }
    };
    getMember();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AxiosApi.getChatMessages(roomId);
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
      onClickMsgSend();
    }
  };

  const onClickMsgSend = () => {
    if (ws.current && inputMsg.trim() !== "") {
      const currentTime = new Date().toISOString();
      ws.current.send(
        JSON.stringify({
          type: "TALK",
          roomId: roomId,
          sender: sender,
          message: inputMsg,
          localDateTime: currentTime,
        })
      );
      setInputMsg("");
    }
  };

  const onClickMsgClose = () => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: "CLOSE",
          roomId: roomId,
          sender: sender,
          message: "종료 합니다.",
        })
      );
      ws.current.close();
    }
    navigate(-1);
  };

  useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket(Common.SOCKET_URL);

      ws.current.onopen = () => {
        console.log("connected to " + Common.SOCKET_URL);
        setSocketConnected(true);
      };

      ws.current.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        console.log("Received message: ", data.message);
        setMessages((prevItems) => [...prevItems, data]);
      };

      ws.current.onclose = () => {
        console.log("WebSocket closed, attempting to reconnect...");
        setSocketConnected(false);
        setTimeout(() => {
          connectWebSocket(); // 일정 시간 후 재연결 시도
        }, 5000);
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error: ", error);
        ws.current.close();
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socketConnected && sender) {
      ws.current.send(
        JSON.stringify({
          type: "ENTER",
          roomId: roomId,
          sender: sender,
          message: "처음으로 접속 합니다.",
        })
      );
    }
  }, [socketConnected, sender]);

  return (
    <Container>
      <ChatContainer>
        <ChatHeader>
          <CloseButton onClick={onClickMsgClose} />
          <RoomName>Lend와 채팅</RoomName>
        </ChatHeader>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <Contents key={index} isSender={msg.sender === sender}>
              {msg.sender !== sender && <Sender>Lend 상담원</Sender>}
              <MessageAndTime>
                <SendTime1 isSender={msg.sender === sender}>
                  {new Date(msg.localDateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </SendTime1>
                <Message isSender={msg.sender === sender}>
                  {msg.message}
                </Message>
                <SendTime2 isSender={msg.sender === sender}>
                  {new Date(msg.localDateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </SendTime2>
              </MessageAndTime>
            </Contents>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        <InputContainer>
          <Input
            placeholder="문자 전송"
            value={inputMsg}
            onChange={onChangMsg}
            onKeyUp={onEnterKey}
          />
          <SendButton onClick={onClickMsgSend} />
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

export default Chatting;
