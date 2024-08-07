import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
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
import Loaninfo from "./pages/loaninfo/loaninfo";
import WishList from "./pages/WishList";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <ConditionalHeader />
        <SlideWrapper>
          <Routes>
            <Route path="/" element={<Navigate to="/lend" />} />
            <Route path="/lend" element={<Mainpage />} />
            <Route path="/lend/login" element={<Login />} />
          </Routes>
        </SlideWrapper>
        <Routes>
          <Route path="/lend/support" element={<Support />} />
          <Route path="/lend/chatlist" element={<ChatList />} />
          <Route path="/lend/chat/create" element={<ChatRoomCreate />} />
          <Route path="/lend/chatting" element={<Chatting />} />
          <Route path="/lend/Loaninfo" element={<Loaninfo />} />
          <Route path="/lend/wishlist" element={<WishList />} />
        </Routes>
      </Router>
    </>
  );
}

function ConditionalHeader() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/lend/login";

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
