//support/js
import { useEffect, useState, useId } from "react";
import styled, {keyframes} from "styled-components";
import DropdownComponent from "./dropdowncomponent";
import ChatRoomCreate from "../chatting/ChatRoomCreate";
import AxiosApi from "../../axios/AxiosApi";
import WritePost from "./writepost";
import CommentComponent from "./commentComponent";
import { Toggle } from "./toggleComponent";
import useModal from "../../components/customModalHook";

export default function Support() {
  const [questionBoard, showQuestionBoard] = useState(true);
  const [FAQBoard, showFAQBoard] = useState(false);
  const [writeMode, setWriteMode] = useState(false);
  const [commentMode, setCommentMode] = useState(false);
  const [answerState, setAnswerState] = useState(false); //관리자 답변 여부 관리
  const [switchState, setSwitchState] = useState(false); // 공개/비공개 상태 관리
  // 모달 커스텀훅 사용
  const { Modal, openModal, closeModal } = useModal();
  // 유저정보 갱신
  const [myEmail, setMyEmail] = useState(null);
  const [authority, setAuthority] = useState(null);
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await AxiosApi.getMemberInfo();
        setMyEmail(response.data.email);
        setAuthority(response.data.authority);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMemberInfo();
  }, [myEmail]);
  const BoardHandler = (number) => () => {
    if (number === 1) {
      showQuestionBoard(true);
      showDetailedPost(false);
      showFAQBoard(false);
      setEditMode(false);
      setWriteMode(false);
    } else if (number === 2) {
      showQuestionBoard(false);
      showDetailedPost(false);
      showFAQBoard(true);
      setEditMode(false);
      setWriteMode(false);
    }
    console.log(questionBoard, FAQBoard);
  };
  const [dropDown, setDropDown] = useState(null);
  const DropDownHandler = (number) => () => {
    setDropDown(dropDown === number ? null : number);
  };
  // 페이지 관련
  const [questionList, setQuestionList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 초기값 1페이지
  const pageSize = 10; // 페이지당 글 수

  const fetchQuestionList = async (page) => {
    try {
      const response = await AxiosApi.getQuestionList(page - 1); // 백엔드로 요청할 때는 page-1을 보냄
      if (response.data && Array.isArray(response.data.boards)) {
        setQuestionList(response.data.boards);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("Unexpected response format", response.data);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchQuestionList(currentPage);
  }, [currentPage, writeMode]);
  const handlePageChange = (page) => {
    console.log("questioninfo:", questionList);
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  // 페이지 번호 버튼 생성
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 5; // 표시할 버튼 수

    // 현재 페이지가 중앙에 오도록 계산
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;

    // 페이지 범위를 벗어나면 조정
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // 5개의 버튼을 기본으로 생성
    for (let i = 0; i < maxButtons; i++) {
      const pageNumber = startPage + i;
      const isOutOfRange = pageNumber < 1 || pageNumber > totalPages;

      buttons.push(
        <PageButton
          key={i}
          onClick={() => handlePageChange(pageNumber)}
          active={!isOutOfRange && pageNumber === currentPage}
          disabled={isOutOfRange} // 페이지 범위 밖의 버튼 비활성화
        >
          {isOutOfRange ? "" : pageNumber}
        </PageButton>
      );
    }

    return buttons;
  };
  // 세부 게시글 조회 코드
  const [detailedPost, showDetailedPost] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);
  const handleOpenPost = async (id) => {
    // 권한 확인
    try {
      const response = await AxiosApi.getDetailedPost(id);
      if (response.data) {
        //비밀글인지 확인
        if(response.data.isPrivate) {
          // 작성자이거나 authority가 ROLL_ADMIN 인지 확인
          if(response.data.memberResDto.email === myEmail
            || authority === "ROLE_ADMIN") {
              showDetailedPost(true);
              showQuestionBoard(false);
              setCurrentPost(response.data);
              setCurrentPostId(id);
              console.log(response.data);
          } else { // 비밀글인데 작성자가 아닐 때
            openModal("비밀글 입니다.")
            showDetailedPost(false);
          }
        } else { // 비밀글이 아닐때
          showDetailedPost(true);
          showQuestionBoard(false);
          setCurrentPost(response.data);
          setCurrentPostId(id);
          console.log(response.data);
        }
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  //글 작성 컴포넌트 활성화
  const handleWriteMode = () => {
    setWriteMode(true);
    showQuestionBoard(false);
  };
  // 글 수정 & 저장
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  // 수정 모드
  const handleEditPost = () => {
    if (currentPost) {
      setEditedTitle(currentPost.title);
      setEditedContent(currentPost.content);
      setEditMode(true);
    }
  };
  // 저장 요청
  const handleSavePost = async () => {
    if (!currentPost) return;
    const questionDto = {
      id: currentPost.id,
      title: editedTitle,
      content: editedContent,
      isPrivate: switchState,
      memberResDto: {
        email: myEmail,
      },
    };
    // 입력값 유효성검사
    if (!editedTitle) {
      openModal("제목을 입력하세요");
    } else if (!editedContent) {
      openModal("내용을 입력하세요.");
    } else {
      try {
        const response = await AxiosApi.modifyQuestion(questionDto);
        if (response.data) {
          console.log(response.data);
          setEditMode(false);
          // 현재 게시글을 갱신
          setCurrentPost({
            ...currentPost,
            title: editedTitle,
            content: editedContent,
            modifyTime: response.data.modifyTime,
          });
          // 게시글 목록 갱신
          fetchQuestionList(currentPage);
        }
      } catch (error) {
        console.error(error.response);
      }
    }
  };

  // 글 삭제
  const handleDeletePost = async () => {
    if (!currentPost) return;
    try {
      const response = await AxiosApi.deleteQuestion(currentPost.id);

      if (response.data) {
        openModal("게시글이 삭제되었습니다.");
        // 삭제 후 게시판 목록으로 돌아가기
        showDetailedPost(false);
        showQuestionBoard(true);
        // 게시글 목록 갱신
        fetchQuestionList(currentPage);
      }
    } catch (error) {
      console.log(currentPost.id);
      console.error(error.response);
    }
  };
  // 현재 로그인된 사용자의 이메일과 글 작성자의 이메일 비교  + 관리자 계정인지 확인 기능 추가 필요
  const isOwner = myEmail === currentPost?.memberResDto?.email;
  return (
    <Body>
      <Container>
        {/* <SearchBox> 검색기능 일단 보류<SearchInput /></SearchBox> */}
        <ChatRoomCreate />
        <ButtonBox>
          <Button onClick={BoardHandler(1)}>질문 게시판</Button>
          <Button onClick={BoardHandler(2)}>자주 묻는 질문</Button>
        </ButtonBox>
        <WritePost
          writeMode={writeMode}
          setWriteMode={setWriteMode}
          showQuestionBoard={showQuestionBoard}
          showFAQBoard={showFAQBoard}
        />
        {questionBoard && (
          <>
            <ButtonBox>
              <Button className="writepost" onClick={handleWriteMode}>
                ✒️ 질문하기
              </Button>
            </ButtonBox>
            <Box>
              <Item>
                <TitleOfPost>
                  <div>번호</div>
                  <div>제목</div>
                  <div>{"댓글"}</div>
                  <div>작성자</div>
                  <div>작성일</div>
                  <div>답변상태</div>
                </TitleOfPost>
                {questionList.map((question, index) => (
                  <div key={question.id}>
                    <ListOfPost
                      className="boardArea"
                      onClick={() => handleOpenPost(question.id)}
                    >
                      <div>{(currentPage - 1) * pageSize + (index + 1)}</div>
                      <div>
                        {question.title}
                        {question.isPrivate ? " 🔒" : ""}
                      </div>
                      <div>
                        {question.commentList == 0
                          ? ""
                          : "(+" + question.commentList.length + ")"}
                      </div>
                      <div>{question.memberResDto.name}</div>
                      <div>{question.createTime.slice(0, 11)}</div>
                      {/* 관리자 계정 답변이 하나라도 있으면 완료처리 */}
                      <div>
                        {question.commentList &&
                        question.commentList.some(
                          (comment) =>
                            comment?.memberResDto?.authority === "ROLE_ADMIN"
                        )
                          ? "완료"
                          : "미처리"}
                      </div>
                    </ListOfPost>
                  </div>
                ))}
              </Item>
            </Box>
            <PageButtonBox>
              <PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </PageButton>
              {renderPageButtons()}
              <PageButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </PageButton>
              </PageButtonBox>
          </>
        )}
        {detailedPost && (
          <Box>
            <Item>
              {editMode ? (
                <input
                  className="title"
                  type="text"
                  placeholder="제목을 입력해주세요."
                  maxlength="100"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <div className="title">{currentPost.title}</div>
              )}
              <PostInfoBox>
                <span>작성자</span>
                <span>{currentPost.memberResDto.name}</span>
                <span>작성일</span>
                <span>{currentPost.createTime}</span>
                {/* 수정일이 없거나 작성일과 동일하면 표시하지 않음 */}
                {currentPost.createTime === currentPost.modifyTime || currentPost.modifyTime === null 
                ? "" 
                : <><span>수정일</span><span>{currentPost.modifyTime}</span></> }
              </PostInfoBox>
              {editMode ? ( <Toggle switchState={switchState} setSwitchState={setSwitchState}/> ) : ""}
              {editMode ? (
                <textarea
                  className="content"
                  placeholder="500자 이내로 내용을 입력하세요."
                  maxlength="500"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              ) : (
                <div className="content">{currentPost.content}</div>
              )}
              {isOwner && (
                <ButtonBox className="editpost">
                  {editMode ? (
                    <EditPostButton
                      className="editpost"
                      onClick={handleSavePost}
                      disabled={!editMode}
                    >
                      저장
                    </EditPostButton>
                  ) : (
                    <EditPostButton
                      className="editpost"
                      onClick={handleEditPost}
                    >
                      수정
                    </EditPostButton>
                  )}
                  <EditPostButton
                    className="editpost"
                    onClick={handleDeletePost}
                  >
                    삭제
                  </EditPostButton>
                </ButtonBox>
              )}
              <CommentComponent
                currentPostId={currentPostId}
                showQuestionBoard={showQuestionBoard}
                showDetailedPost={showDetailedPost}
              />
            </Item>
          </Box>
        )}
        {FAQBoard && (
          <FAQBox>
            <FAQItem>
              <DropDownButton onClick={DropDownHandler("menu1")}>
                대출
              </DropDownButton>
              <DropDownButton onClick={DropDownHandler("menu2")}>
                회원관리
              </DropDownButton>
              <DropDownButton onClick={DropDownHandler("menu3")}>
                기타오류
              </DropDownButton>
            </FAQItem>
            <Item>
            <ListItem>
              {dropDown && <DropdownComponent number={dropDown} />}
            </ListItem>
            </Item>
            

          </FAQBox>
        )}
      </Container>
      <Modal/>
    </Body>
  );
}
const FadeIn = keyframes`
  from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`
const Body = styled.div`
  width: auto;
  height: auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100dvw;
  height: 75dvh;
`;
const Box = styled.div`
  width: 60vw;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2vh;
  
  @media (max-width: 500px){
    width: 95vw;
    animation: ${FadeIn} 0.5s ease; /* 페이드인 애니메이션 적용 */
  }
`;
const SearchBox = styled.div`
  justify-content: flex-start;
`;
const SearchInput = styled.input`
  width: 100dvw;
  height: 30dvw;
  background-color: blue;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: auto;
  height: auto;
  :hover {
    background-color: #ddd;
    color: black;
  }
  @media (max-width:500px){
    width: 95vw;
    margin-top: 1vh;
  }
  > .writepost {
    // 질문하기 글작성 버튼
    float: right;
    white-space: nowrap;
    margin-left: 58vw;
    padding: 0 1vw;
    @media (max-width:500px){
      width: 25vw;
      height: 3vh;
      margin-left: 70vw;
    }
  }
  > .editpost {
    // 글 수정 관련 버튼
    justify-content: flex-end;
    margin-bottom: 1.5vh;
  }
`;
const Button = styled.button`
  width: auto;
  height: auto;
  border: 0;
  border-radius: 1vw;
  white-space: nowrap;
  font-size: 1.5vw;
  color: white;
  background-color: #29c555;
  margin: .5vw 8vw;
  padding: .5vw 1vw;
  @media (max-width:500px){
    width: 30vw;
    height: 4vh;
    border-radius: 2vw;
    font-size: 3vw;
    margin: .5vh 3vw;
  }
`;
const EditPostButton = styled.button`
  width: auto;
  height: auto;
  border: 0;
  border-radius: 1vw;
  white-space: nowrap;
  font-size: 1.5vw;
  background-color: white;
  margin: 0 5px;
  padding: 2px 20px;
  @media (max-width:500px){
    font-size: 3vw;
    margin: 0 2vw;
    padding: .2vh 1vw;
  }
`;
const PageButtonBox = styled.div`
display: flex;
justify-content: center;
`;
const PageButton = styled(Button)`
  border-radius: 10vw;
  background-color: ${(props) => (props.active ? "#29c555" : "#fff")};
  color: ${(props) =>
    props.active ? "#fff" : props.disabled ? "#000" : "#29c555"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  margin: 0 .2vw;
  padding: .3vw .5vw;
  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e9ecef")};
  }
  @media(max-width: 500px){
    width: 8vw;
    font-size: 5vw;
    margin: 0vh 1vw;
    padding: .1vw .1vw;
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  
  @media(max-width: 500px){
    align-items: flex-start;
    width: 95vw;
  }
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  height: 30vw;
  @media (max-width : 500px){
    height: 60vh;
  }
  & > button:hover {
    background-color: rgb(240, 240, 240);
  }
  .title {
    font-size: 2.5vw;
    border-left: 5px solid #29c555;
    margin: 1vh 0;
    padding: 0 15px;
    @media (max-width : 500px){
      font-size: 7vw;
      margin: 1vh 3vw;
    }
  }
  .content {
    font-size: 1.5vw;
    min-height: 39vh;
    white-space: pre-wrap; //textArea에서 엔터친부분이 줄바꿈되도록 설정
    @media (max-width : 500px){
      min-height: 48vh;
      font-size: 4vw;
      margin: 1vh 3vw;

    }
  }
  .boardArea:hover {
    background-color: rgba(50, 250, 100, 0.1);
  }
  .editpost {
    justify-content: flex-end;
  }
`;


const PostInfoBox = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: gray;
  margin: .5vw 0;
  @media (max-width : 500px){
    margin: 1vh 3vw;
  }
  & span {
    font-size: 1vw;
    
    @media (max-width : 500px){
      font-size: 2.3vw;
      margin: 0 .6vw;
    }
  }
  & span:nth-child(odd) {
    color: white;
    border-radius: 5vw;
    background-color: #29c555;
    padding: .3vw .5vw;
    @media (max-width : 500px){
      padding: .5vw 1vw;
    }
  }
`;
const TitleOfPost = styled.div`
  width: 60vw;
  height: 3vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  border-bottom: 0.15vw solid;
  margin: 1vh 0;
  padding: 1vw 0 ;
  @media (max-width : 500px){
    width: 95vw;
    border-bottom: .4vw solid;
    padding: 2vw 0 ;
    }
  & div {
    width: 10vw;
    font-size: 1.2vw;
    @media (max-width:500px){
      width: 20vw;
    font-size: 4vw;
  }
  }
  & div:nth-child(1) {
    // 게시글리스트 번호부분 모바일 안보이게
    width: 5vw;
    @media (max-width:500px){
      display: none;
    }
  }
  & div:nth-child(2) {
    // 게시글리스트 제목부분
    width: 20vw;
    @media (max-width:500px){
      width: 50vw;
    }
  }
  & div:nth-child(3) {
    // 댓글수 부분
    width: 2vw;
    @media (max-width:500px){
      display: none;
    }
  }
  & div:nth-child(5) {
    // 작성일 부분
    @media (max-width:500px){
      display: none;
    }
  }
`;
const ListOfPost = styled.div`
  width: 60vw;
  height: 2.5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  @media (max-width:500px) {
      width: 95vw;
      margin: 2vh 0;
    }
  & div {
    width: 10vw;
    height: auto;
    font-size: 1.2vw;
    @media (max-width:500px){
      width: 20vw;
    font-size: 4vw;
  }
  }
  & div:nth-child(1) {
    // 게시글리스트 번호부분
    width: 5vw;
    @media (max-width:500px){
      display: none;
    }
  }
  & div:nth-child(2) {
    // 게시글리스트 제목부분
    width: 20vw;
    //텍스트 줄이기 세트
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    @media (max-width:500px){
      width: 50vw;
    }
  }
  & div:nth-child(3) {
    // 댓글수 부분
    width: 2vw;
    text-align: left;
    @media (max-width:500px){
      display: none;
    }
  }
  & div:nth-child(5){
    // 작성일 부분
    @media (max-width:500px){
      display: none;
    }
  }
`;
const FAQBox =styled.div`
width: 70vw;
display: flex;
@media (max-width:500px){
  width: 95vw;
  flex-direction: column;
}
`
const FAQItem = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  & > button:hover {
    background-color: rgb(240, 240, 240);
  }
  @media (max-width:500px){
  height: 5vh;
  flex-direction: row;
  justify-content: center;
}
`
const DropDownButton = styled.button`
  width: 10vw;
  height: 5vw;
  font-size: 1.5vw;
  border: 0;
  background-color: transparent;
  padding: 2vw; /* 여백 추가 */
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
  @media (max-width:500px){
    width: 20vw;
    height: 10vw;
      font-size: 4vw;
      margin: 2vh 0;
    }
`;