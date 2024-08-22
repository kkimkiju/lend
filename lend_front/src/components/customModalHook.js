//customModalHook.js
import React, { useCallback, useState } from "react";
import CustomModal from "./customModalComponent";

// `useBlur` props로 모달 외부를 클릭하면 모달을 닫을지 선택하도록 했다.
const useModal = ({ useBlur = true } = {}) => {
  // 모달의 렌더링 여부를 설정할 상태 값
  const [isOpen, setIsOpen] = useState(false);
  // 메세지 관리
  const [message, setMessage] = useState("");
  // 닫힘 버튼 누른 후 작동 관리
  const [onCloseCallback, setOnCloseCallback] = useState(null);
  // 모달 열기
  const openModal = useCallback((msg, onClose) => {
    setMessage(msg);
    setOnCloseCallback(() => onClose);
    setIsOpen(true);
  }, []);

  // 모달 닫기
  const closeModal = useCallback(() => {
    setIsOpen(false);
    if (onCloseCallback) {
      onCloseCallback(); // 모달이 닫힐 때 onClose 콜백 호출
    }
    setMessage(""); // 메시지 초기화
  }, [onCloseCallback]);

  // isOpen이 true라면 Modal 컴포넌트를 반환, false라면 null을 반환
  return {
    Modal: isOpen
      ? () => <CustomModal onClose={closeModal} message={message} />
      : () => <></>,
    openModal,
    closeModal,
    isOpen,
  };
};

export default useModal;
