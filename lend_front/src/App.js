import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  useMatch,
} from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalStyle from "./font/GlobalStyle";
import Login from "./pages/Login";
import Support from "./pages/supportpage/support";
import ChatList from "./pages/chatting/ChatList";
import ChatRoomCreate from "./pages/chatting/ChatRoomCreate";
import Chatting from "./pages/chatting/Chatting";
import AdminChatting from "./pages/chatting/AdminChatting";
import Loaninfo from "./pages/loaninfo/loaninfo";
import WishList from "./pages/WishList";
import UserStore from "./context/UserStore";
import KaKaoLogin from "./components/KaKaoLogin";
import Mypage from "./pages/Mypage";
import Sugg from "./pages/loaninfo/sugg";

function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <ConditionalHeader />
          <SlideWrapper>
            <Routes>
              <Route path="/" element={<Navigate to="/lend" />} />
              <Route path="/lend" element={<Mainpage />} />
            </Routes>
          </SlideWrapper>
          <Routes>
            <Route path="/lend/login" element={<Login />} />
            <Route path="/lend/support" element={<Support />} />
            <Route path="/lend/chat/create" element={<ChatRoomCreate />} />
            <Route path="/lend/chatting/:roomId" element={<Chatting />} />
            <Route
              path="/lend/admin/chatting/:roomId"
              element={<AdminChatting />}
            />
            <Route path="/lend/chatlist" element={<ChatList />} />
            <Route path="/lend/Loaninfo" element={<Loaninfo />} />
            <Route path="/lend/wishlist" element={<WishList />} />
            <Route path="/lend/mypage" element={<Mypage />} />
            <Route path="/lend/kakaologin" element={<KaKaoLogin />} />
            <Route path="/lend/Sugg" element={<Sugg />} />
            <Route path="/lend/Sugg/:loan_no/:category" element={<Sugg />} />
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

function ConditionalHeader() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/lend/login";

  // 로그인 페이지와 채팅 리스트 페이지에서는 헤더를 숨김
  return <>{!isLoginPage && <Header />}</>;
}

function SlideWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    const element = document.getElementById("slide-wrapper");
    if (element) {
      element.classList.remove("slide-in");
      void element.offsetWidth; // 트리거를 위해 강제 리플로우
      element.classList.add("slide-in");
    }
  }, [location]);

  return <div id="slide-wrapper">{children}</div>;
}

export default App;
