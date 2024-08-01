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
          <Route path="/lend/support" element={<Support/>}/>
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
