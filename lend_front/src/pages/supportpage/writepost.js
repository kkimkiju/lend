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
    // 입력값 유효성검사
    if(!title) {
      alert("제목을 입력하세요.")
    } else if(!content) {
      alert("내용을 입력하세요.")
    } else {
      const questionDto = {
        title: title,
        content: content,
        isPrivate: switchState,
        memberResDto: {
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
          setTitle("")
          setContent("")
          navigate("/lend/support");
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
                  maxlength="100"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Toggle switchState={switchState} setSwitchState={setSwitchState} />
                <textarea
                  className="ContentInput"
                  type="text"
                  placeholder="500자 이내로 내용을 입력하세요."
                  maxlength="500"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <ButtonBox>
                  <Button onClick={() => savePost()}>등록</Button>
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
  :hover{
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
  background-color: #DDD;
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
  padding: 5px 20px;
`;


const Item = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
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

