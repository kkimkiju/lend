import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  // 로그인 여부
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") || ""
  );
  // 구독 여부
  const [subscribeStatus, setSubscribeStatus] = useState(
    localStorage.getItem("subscribeStatus") || ""
  );
  // 프로필 사진 변경
  const [profileChange, setProfileChange] = useState(
    localStorage.getItem("profileChange") || ""
  );
  // 비밀번호찾기 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(
    localStorage.getItem("isModalOpen") === "true" || false
  );
  // 첫번째 약관 모달 상태
  const [fisrtPrivacyModal, setFirstPrivacyModal] = useState(
    localStorage.getItem("fisrtPrivacyModal") === "true" || false
  );
  // 두번째 약관 모달 상태
  const [secondPrivacyModal, setSecondPrivacyModal] = useState(
    localStorage.getItem("secondPrivacyModal") === "true" || false
  );

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);
  useEffect(() => {
    localStorage.setItem("subscribeStatus", subscribeStatus);
  }, [subscribeStatus]);
  useEffect(() => {
    localStorage.setItem("profileChange", subscribeStatus);
  }, [profileChange]);
  useEffect(() => {
    localStorage.setItem("isModalOpen", isModalOpen);
  }, [isModalOpen]);
  useEffect(() => {
    localStorage.setItem("fisrtPrivacyModal", fisrtPrivacyModal);
  }, [fisrtPrivacyModal]);
  useEffect(() => {
    localStorage.setItem("secondPrivacyModal", secondPrivacyModal);
  }, [secondPrivacyModal]);
  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        subscribeStatus,
        setSubscribeStatus,
        profileChange,
        setProfileChange,
        isModalOpen,
        setIsModalOpen,
        fisrtPrivacyModal,
        setFirstPrivacyModal,
        secondPrivacyModal,
        setSecondPrivacyModal,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
