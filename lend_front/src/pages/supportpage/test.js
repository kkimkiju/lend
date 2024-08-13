import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../../axios/AxiosApi";

export default function CommentComponent({ currentPostId }) {
  const [commentList, setCommentList] = useState([]);
  const [editState, setEditState] = useState({ id: null, content: "" });
  const [nestedCommentWriteMode, setNestedCommentWriteMode] = useState({ parentId: null, content: "" });

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
      memberReqDto: {
        email: localStorage.getItem("email"),
      },
    };
    try {
      const response = await AxiosApi.modifyCommnet(commentDto);
      if (response.data) {
        alert("댓글 수정 완료.");
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

  const handleSaveCommnet = async () => {
    const commentDto = {
      questionId: currentPostId,
      content: contentOfComment,
      memberReqDto: {
        email: localStorage.getItem("email"),
      },
    };
    try {
      const response = await AxiosApi.createComment(commentDto);
      if (response.data) {
        alert("댓글등록완료.");
        setContentOfComment("");
        fetchCommentList(currentPostId); // 댓글 목록을 다시 불러오기
      }
    } catch (error) {
      console.error(error.response);
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
      memberReqDto: {
        email: localStorage.getItem("email"),
      },
    };
    try {
      const response = await AxiosApi.createComment(commentDto);
      if (response.data) {
        alert("대댓글 등록 완료.");
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
      content: "삭제된 댓글 입니다.",
      deletedStatus: true,
      memberReqDto: {
        email: localStorage.getItem("email"),
      },
    };
    try {
      const response = await AxiosApi.deleteComment(commentDto);
      if(response.data){
        alert("댓글 삭제 완료.");
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
    } catch(error){
      console.error(error.response);
    }
  }

  // 계층형 댓글 렌더링
  const renderComments = (comments) => {
    return comments.map((comment) => {
      const isOwner = localStorage.getItem("email") === comment.memberReqDto.email;
      if (comment.deletedStatus) {
        return (
          <div key={comment.id} style={{ marginLeft: comment.parentId ? "20px" : "0" }}>
            <div>{comment.memberReqDto.name}</div>
            <div>삭제된 댓글입니다.</div>
          </div>
        );
      }
      return (
        <div key={comment.id} style={{ marginLeft: comment.parentId ? "20px" : "0" }}>
          <div>{comment.memberReqDto.name}</div>
          {editState.id === comment.id ? (
            <input
              value={editState.content}
              onChange={(e) => setEditState({ ...editState, content: e.target.value })}
            />
          ) : (
            <div>{comment.content}</div>
          )}
          {isOwner && (
            <>
              {editState.id === comment.id ? (
                <Button onClick={handleSaveComment}>저장</Button>
              ) : (
                <Button onClick={() => handleEditMode(comment.id, comment.content)}>수정</Button>
              )}
              <Button onClick={() => handleDeleteComment(comment.id)}>삭제</Button>
            </>
          )}
          <Button onClick={() => handleWriteNestedComment(comment.id)}>대댓글</Button>
          {nestedCommentWriteMode.parentId === comment.id && (
            <>
              <input
                value={nestedCommentWriteMode.content}
                onChange={(e) => setNestedCommentWriteMode({ ...nestedCommentWriteMode, content: e.target.value })}
              />
              <Button onClick={handleSaveNestedComment}>대댓글 저장</Button>
            </>
          )}
          {comment.replies.length > 0 && renderComments(comment.replies)}
        </div>
      );
    });
  };

  return (
    <>
      <Body>
        <Container>
          <Box>
            <Item>
              {renderComments(commentList)}
              <Box>
                <input
                  type="text"
                  placeholder="댓글을 입력하세요."
                  value={contentOfComment}
                  onChange={(e) => setContentOfComment(e.target.value)}
                />
                <Button onClick={handleSaveCommnet}>등록</Button>
              </Box>
            </Item>
          </Box>
        </Container>
      </Body>
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
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Button = styled.button`
  transition: background-color 0.3s ease;
`;
const Item = styled.div`
  flex-direction: column;
  margin-bottom: 10px;
  & > button:hover {
    background-color: rgb(240, 240, 240);
  }
`;
