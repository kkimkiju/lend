import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../../axios/AxiosApi";
import { useNavigate } from "react-router-dom";
import useModal from "../../components/customModalHook";
export default function CommentComponent({
  currentPostId,
  showDetailedPost,
  showQuestionBoard,
}) {
  const [commentList, setCommentList] = useState([]);
  const [editState, setEditState] = useState({ id: null, content: "" });
  const [nestedCommentWriteMode, setNestedCommentWriteMode] = useState({
    parentId: null,
    content: "",
  });
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
  // fetchCommentList 함수를 컴포넌트 내부에서 정의
  const fetchCommentList = async (id) => {
    try {
      const response = await AxiosApi.getComment(id);
      if (response.data && Array.isArray(response.data)) {
        const nestedComments = buildNestedComments(response.data);
        setCommentList(nestedComments);
        console.info("Fetched comments:", response.data);
      } else {
        console.warn("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error(error.response);
    }
  };
  // 댓글 갱신
  useEffect(() => {
    if (currentPostId) {
      fetchCommentList(currentPostId);
    }
  }, [currentPostId]);

  const buildNestedComments = (comments) => {
    const commentMap = {};
    const nestedComments = [];

    comments.forEach((comment) => {
      commentMap[comment.id] = { ...comment, replies: [] };
    });

    comments.forEach((comment) => {
      if (comment.parentId) {
        commentMap[comment.parentId].replies.push(commentMap[comment.id]);
      } else {
        nestedComments.push(commentMap[comment.id]);
      }
    });

    return nestedComments;
  };

  const handleEditMode = (id, content) => {
    setEditState({ id, content });
  };

  const handleSaveComment = async (id) => {
    const commentDto = {
      questionId: currentPostId,
      id: editState.id,
      content: editState.content,
      memberResDto: {
        email: myEmail,
      },
    };
    try {
      const response = await AxiosApi.modifyCommnet(commentDto);
      if (response.data) {
        openModal("댓글 수정 완료");
        setCommentList((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editState.id
              ? { ...comment, content: editState.content }
              : comment
          )
        );
        setEditState({ id: null, content: "" });
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const [contentOfComment, setContentOfComment] = useState("");
  const navigate = useNavigate(null);
  const exitPost = async () => {
    showQuestionBoard(true);
    showDetailedPost(false);
    navigate("/lend/support");
  };

  const handleSaveCommnet = async () => {
    // 입력값 유효성 검사
    if (!contentOfComment) {
      openModal("내용을 입력하세요.");
    } else {
      const commentDto = {
        questionId: currentPostId,
        content: contentOfComment,
        memberResDto: {
          email: myEmail,
        },
      };
      try {
        const response = await AxiosApi.createComment(commentDto);
        if (response.data) {
          openModal("댓글 등록 완료.");
          setContentOfComment("");
          fetchCommentList(currentPostId); // 댓글 목록을 다시 불러오기
        }
      } catch (error) {
        console.error(error.response);
      }
    }
  };

  const handleWriteNestedComment = (parentId) => {
    setNestedCommentWriteMode({ parentId, content: "" });
  };

  const handleSaveNestedComment = async () => {
    const commentDto = {
      questionId: currentPostId,
      parentId: nestedCommentWriteMode.parentId,
      content: nestedCommentWriteMode.content,
      memberResDto: {
        email: myEmail,
      },
    };
    try {
      const response = await AxiosApi.createComment(commentDto);
      if (response.data) {
        openModal("댓글 등록 완료");
        fetchCommentList(currentPostId); // 댓글 목록을 다시 불러오기
        setNestedCommentWriteMode({ parentId: null, content: "" });
      }
    } catch (error) {
      console.error(error.response);
    }
  };
  // 댓글 삭제
  const handleDeleteComment = async (id) => {
    const commentDto = {
      questionId: currentPostId,
      id: id,
      content: "삭제된 댓글 입니다",
      deletedStatus: true,
      memberResDto: {
        email: myEmail,
      },
    };
    try {
      const response = await AxiosApi.deleteComment(commentDto);
      if (response.data) {
        openModal("댓글 삭제 완료");
        setCommentList((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editState.id
              ? { ...comment, content: editState.content }
              : comment
          )
        );
        setEditState({ id: null, content: "" });
        fetchCommentList(currentPostId); // 댓글 목록을 다시 불러오기
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  // 계층형 댓글 렌더링
  const renderComments = (comments) => {
    return comments.map((comment) => {
      const isOwner = myEmail === comment.memberResDto.email;
      return (
        <CommentBox key={comment.id} parentId={comment.parentId}>
          <Name authority={comment.memberResDto.authority}>
            {comment.memberResDto.name}
          </Name>
          {comment.deletedStatus ? (
            <Content>삭제된 댓글입니다.</Content>
          ) : (
            <>
              {editState.id === comment.id ? (
                <input
                  value={editState.content}
                  onChange={(e) =>
                    setEditState({ ...editState, content: e.target.value })
                  }
                />
              ) : (
                <Content style={{ display: "block" }}>{comment.content}</Content>
              )}
              <CommentButtonBox>
                {isOwner && (
                  <>
                    {editState.id === comment.id ? (
                      <Button onClick={handleSaveComment}>저장</Button>
                    ) : (
                      <Button
                        onClick={() =>
                          handleEditMode(comment.id, comment.content)
                        }
                      >
                        수정
                      </Button>
                    )}
                    <Button onClick={() => handleDeleteComment(comment.id)}>
                      삭제
                    </Button>
                  </>
                )}
                <Button onClick={() => handleWriteNestedComment(comment.id)}>
                  댓글
                </Button>
              </CommentButtonBox>
              {nestedCommentWriteMode.parentId === comment.id && (
                <>
                  <textarea
                    value={nestedCommentWriteMode.content}
                    onChange={(e) =>
                      setNestedCommentWriteMode({
                        ...nestedCommentWriteMode,
                        content: e.target.value,
                      })
                    }
                  />
                  <CommentButtonBox>
                    <Button onClick={handleSaveNestedComment}>등록</Button>
                  </CommentButtonBox>
                </>
              )}
            </>
          )}
          {/* 자식 댓글을 항상 렌더링 */}
          {comment.replies.length > 0 && renderComments(comment.replies)}
        </CommentBox>
      );
    });
  };

  return (
    <>
      {showDetailedPost && (
        <Body>
          <Container>
            <Box>
              <Item>
                {renderComments(commentList)}
                <Box>
                  <textarea
                    type="text"
                    placeholder="댓글을 입력하세요"
                    maxlength="100"
                    value={contentOfComment}
                    onChange={(e) => setContentOfComment(e.target.value)}
                  />
                  <ButtonBox>
                    <Button onClick={exitPost}>닫기</Button>
                    <Button onClick={handleSaveCommnet}>등록</Button>
                  </ButtonBox>
                </Box>
              </Item>
            </Box>
          </Container>
          <Modal />
        </Body>
      )}
    </>
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
  border-top: 1px solid gray;
  display: flex;
  flex-direction: column;
  width: 70vw;
  @media (max-width: 500px) {
    width: 90vw;
  }
  > textarea {
    margin: 2vh 4vw;
    @media (max-width: 500px) {
      width: 82vw;
    }
  }
`;
const CommentBox = styled.div`
  margin-left: ${(props) => (props.parentId ? "2vw" : "0")};

  @media (max-width: 500px) {
    margin-left: ${(props) => (props.parentId ? "3vw" : "0")};
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-bottom: 1vw;
  :hover {
    background-color: #29c555;
  }
`;
const CommentButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 1vh 0;
  :hover {
    background-color: #29c555;
  }
`;
const Button = styled.button`
  width: 3.5vw;
  height: auto;
  border: 0;
  border-radius: 5vw;
  white-space: nowrap;
  font-size: 1vw;
  color: white;
  background-color: #ddd;
  transition: background-color 0.3s ease; /* 부드러운 호버 효과 */
  margin: 0 0.3vw;
  padding: 0.4vh 0;
  @media (max-width: 500px) {
    width: 8vw;
    height: 4vw;
    font-size: 2.3vw;
    margin: 0 1vw;
  }
`;
const Item = styled.div`
  flex-direction: column;
  margin-bottom: 10px;
  & > button:hover {
    background-color: rgb(240, 240, 240);
  }
`;

const Name = styled.div`
font-size: 1.2vw;
  border-left: ${(props) =>
    props.authority === "ROLE_ADMIN" ? ".3vw solid orange" : ".3vw solid gray"};
  margin: 1vh 0;
  padding: 0 .5vw;
  @media (max-width: 500px){
    border-left: ${(props) =>
    props.authority === "ROLE_ADMIN" ? ".7vw solid orange" : ".7vw solid gray"};
    padding: 0 1.5vw;
    font-size: 3vw;
  }
`;
const Content = styled.div`
font-size: 1vw;
@media (max-width: 500px){
  font-size: 3vw;
}
`
