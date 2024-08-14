import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../axios/AxiosApi";
import { Toggle } from "./toggleComponent";


export default function WritePost({ writeMode, setWriteMode, showQuestionBoard, showFAQBoard}) {
  const navigate = useNavigate(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [switchState, setSwitchState] = useState(false); // 공개/비공개 상태 관리

  const savePost = async () => {
    const questionDto = {
      title: title,
      content: content,
      isPrivate: switchState,
      memberReqDto: {
        email: localStorage.getItem("email"),
      },
    };
    try {
      const response = await AxiosApi.createQuestion(questionDto);
      if (response.data) {
        console.log(response.data);
        setWriteMode(false);
        showQuestionBoard(true);
        showFAQBoard(false);
        alert("질문이 등록 되었습니다.");
        navigate("/lend/support");
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <Body>
      <Container>
        <Box>
          {writeMode && (
            <>
              <Item>
              <Toggle switchState={switchState} setSwitchState={setSwitchState} />
                <input
                  className="TitleInput"
                  type="text"
                  placeholder="제목을 입력해주세요."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="ContentInput"
                  type="text"
                  maxlength="10"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <ButtonBox>
                  <button onClick={() => savePost()}>등록</button>
                </ButtonBox>
              </Item>
            </>
          )}
        </Box>
      </Container>
    </Body>
  );
}

const Body = styled.div`
  width: auto;
  height: auto;
  margin-top: 10vh;
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
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
`;


const Item = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  background-color: blueviolet;
  display: ${(props)=> props.writeMode && {
    flex : "none"
  }};
  flex-direction: column;
  .TitleInput{
    width: 50vw;
    height: 3vw;
    font-size: 30px;
    border-radius: .5vw;
    margin: 2vh 0;
    padding: .1vw 0 0 .5vw;
  }
  .ContentInput{
    width: 50vw;
    height: 10vw;
    font-size: 20px;
    text-align: left;
    white-space: pre-line;
    border-radius: .5vw;
    margin: 2vh 0;
    padding: .1vw;
    padding: 0 0 35vh .5vw;
    // 스크롤바 제거
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
    }
  }
  & > button:hover {
    background-color: rgb(240, 240, 240);
  }
`;

