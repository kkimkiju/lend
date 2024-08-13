import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../axios/AxiosApi";
export default function WritePost({ writeMode, setWriteMode, showQuestionBoard, showFAQBoard }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(null);
  const savePost = async () => {
    const questionDto = {
      title: title,
      content: content,
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
        navigate("/");
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
                <input
                  type="text"
                  placeholder="제목을 입력해주세요."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Item>
              <Item>
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
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
`;
const Item = styled.div`
  display: ${(props)=> props.writeMode && {
    flex : "none"
  }};
  flex-direction: column;
  & > button:hover {
    background-color: rgb(240, 240, 240);
  }
`;
