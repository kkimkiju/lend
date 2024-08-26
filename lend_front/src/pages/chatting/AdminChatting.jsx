import React, { useState, useEffect, useRef } from "react";
import Common from "../../utils/Common";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../axios/AxiosApi";
import Back from "../../image/backbutton.png";
import Send from "../../image/sendbutton.png";
import AdminChattingSide from "../../components/AdminChattingSide";

const AllContainer = styled.div`
  width: 100vw;
  height: 80vh;
  min-width: 400px;
  display: flex;
  flex-direction: row;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

const RightContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const ChatContainer = styled.div`
  width: 80%;
  padding: 20px;
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
  height: 400px;
  overflow-y: auto;
  border-top: 2px solid #29c555;
  border-bottom: 2px solid #29c555;
  padding: 10px;
  margin-bottom: 20px;
`;

const Contents = styled.div`
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

const Sender = styled.div`
  display: ${(props) => (props.isSender ? "none" : "block")};
  margin-bottom: -10px;
  margin-left: -10px;
`;

const MessageAndTime = styled.div`
  display: flex;
  flex-direction: row;
`;

const Message = styled.div`
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSender ? "#29c555" : "#ffffff")};
  border: ${(props) =>
    props.isSender ? "1px solid #29c555" : "1px solid #ffffff"};
  color: ${(props) => (props.isSender ? "#ffffff" : "#000000")};
  max-width: 500px;
  word-break: break-word;
  overflow-wrap: break-word;
  @media (max-width: 1024px) {
    max-width: 420px;
  }
  @media (max-width: 600px) {
    max-width: 100px;
  }
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

const AdminChatting = () => {
  const [inputMsg, setInputMsg] = useState("");
  const [sender, setSender] = useState("");
  const [messages, setMessages] = useState([]);
  const [requestMember, setRequestMember] = useState("");
  const messagesEndRef = useRef(null);
  const { roomId } = useParams();
  const ws = useRef(null);
  const navigate = useNavigate();

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
    const fetchMessages = async () => {
      try {
        const response = await AxiosApi.getChatMessages(roomId);
        const fetchedMessages = response.data.map((msg) => ({
          ...msg,
          localDateTime: new Date(msg.localDateTime),
        }));
        setMessages(fetchedMessages);
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
      ws.current.close();
      navigate("/lend/chatlist");
    }
  };

  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const rsp = await AxiosApi.chatDetail(roomId);
        setRequestMember(rsp.data.roomName);
      } catch (error) {
        console.log(error);
      }
    };
    getChatRoom();
  }, [roomId]);

  useEffect(() => {
    ws.current = new WebSocket(Common.SOCKET_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      ws.current.send(
        JSON.stringify({
          type: "ENTER",
          roomId: roomId,
          sender: sender,
        })
      );
    };

    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      if (data.type === "TALK") {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.current.close();
    };
  }, [roomId, sender]);

  return (
    <AllContainer>
      <AdminChattingSide />
      <RightContainer>
        <ChatContainer>
          <ChatHeader>
            <CloseButton onClick={onClickMsgClose} />
            <RoomName>{requestMember}와 채팅</RoomName>
          </ChatHeader>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <Contents key={index} isSender={msg.sender === sender}>
                <Sender isSender={msg.sender === sender}>{msg.sender}</Sender>
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
      </RightContainer>
    </AllContainer>
  );
};

export default AdminChatting;
