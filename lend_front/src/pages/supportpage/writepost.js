//writepost.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../axios/AxiosApi";
import { Toggle } from "./toggleComponent";
import useModal from "../../components/customModalHook";


export default function WritePost({
  writeMode,
  setWriteMode,
  showQuestionBoard,
  showFAQBoard,
}) {
  const navigate = useNavigate(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [switchState, setSwitchState] = useState(false); // 공개/비공개 상태 관리
  // 모달 커스텀훅 사용
  const { Modal, openModal, closeModal } = useModal();
  // 유저정보 갱신
  const [myEmail, setMyEmail] = useState(null);
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await AxiosApi.getMemberInfo();
        setMyEmail(response.data.email);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMemberInfo();
  }, [myEmail]);

  const exitPost = async () => {
    setWriteMode(false);
    showQuestionBoard(true);
    navigate("/lend/support");
  };
  const savePost = async () => {
    // 입력값 유효성검사
    if (!title) {
      openModal("제목을 입력하세요.");
    } else if (!content) {
      openModal("내용을 입력하세요.");
    } else {
      const questionDto = {
        title: title,
        content: content,
        isPrivate: switchState,
        memberResDto: {
          email: myEmail,
        },
      };
      try {
        const response = await AxiosApi.createQuestion(questionDto);
        if (response.data) {
          console.log(response.data);
          setWriteMode(false);
          showQuestionBoard(true);
          showFAQBoard(false);
          // 모달 닫기 후 navigate 실행되도록
          openModal("질문이 등록 되었습니다.", () =>{ 
            setTitle("");
            setContent("");
            navigate("/lend/support");
          }); 
          
        }
      } catch (error) {
        console.error(error.response);
      }
    }
  };
  
  return (
    <Body>
      <Container>
        <Box>
          {writeMode && (
            <>
              <Item>
                <input
                  className="TitleInput"
                  type="text"
                  placeholder="제목을 입력해주세요."
                  maxLength="100"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Toggle
                  switchState={switchState}
                  setSwitchState={setSwitchState}
                />
                <textarea
                  className="ContentInput"
                  type="text"
                  placeholder="500자 이내로 내용을 입력하세요."
                  maxLength="500"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <ButtonBox>
                  <Button onClick={() => exitPost()}>닫기</Button>

                  <Button onClick={() => savePost()}>등록</Button>
                </ButtonBox>
              </Item>
            </>
          )}
        </Box>
      </Container>
      <Modal/>
    </Body>
  );
}

const Body = styled.div`
  width: auto;
  height: auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const Box = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
`;
const ButtonBox = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: flex-end;
  :hover {
    background-color: #29c555;
  }
`;
const Button = styled.button`
  width: auto;
  height: auto;
  border: 0;
  border-radius: 5vw;
  white-space: nowrap;
  font-size: 20px;
  color: white;
  background-color: #ddd;
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
  padding: 5px 20px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0; /* 마지막 버튼은 margin-right 제거 */
  }
`;

const Item = styled.div`
  display: flex;

  flex-direction: column;
  height: 50vh;
  display: ${(props) =>
    props.writeMode && {
      flex: "none",
    }};
  flex-direction: column;
  .TitleInput {
    width: 50vw;
    height: 3vw;
    font-size: 3vw;
    border-radius: 0.5vw;
    margin: 2vh 0;
    padding: 0.5vw 0 0 0.5vw;
    @media (max-width : 500px){
      width: 80vw;
      height: 20vh;
      font-size: 5vw;
    }
  }
  .ContentInput {
    width: 50vw;
    height: 10vw;
    font-size: 2.5vw;
    text-align: left;
    white-space: pre-line;
    border-radius: 0.5vw;
    margin: 2vh 0;
    padding: 0.1vw;
    padding: 0 0 35vh 0.5vw;
    // 스크롤바 제거
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
    @media (max-width : 500px){
      width: 80vw;
      height: 80vw;
      font-size: 3vw;
    }
  }
  & > button:hover {
    background-color: rgb(240, 240, 240);
  }
`;
