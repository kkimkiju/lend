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

function App() {
  return (
    <>
      <GlobalStyle />

      <Router>
        <ConditionalHeader />
        <Routes>
          <Route path="/" element={<Navigate to="/lend" />} />
          <Route path="/lend" element={<Mainpage />} />
          <Route path="/lend/login" element={<Login />} />
          <Route path="/lend/support" element={<Support />} />
          <Route path="/lend/chatlist" element={<ChatList />} />
          <Route path="/lend/chat/create" element={<ChatRoomCreate />} />
          <Route path="/lend/chatting" element={<Chatting />} />
          <Route path="/lend/Loaninfo" element={<Loaninfo />} />
        </Routes>
      </Router>
    </>
  );
}

function ConditionalHeader() {
  const location = useLocation();

  // Check if the current location is the login page
  const isLoginPage = location.pathname === "/lend/login";

  return <>{!isLoginPage && <Header />}</>;
}

export default App;
