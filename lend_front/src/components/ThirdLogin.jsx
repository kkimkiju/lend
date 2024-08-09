import styled, { keyframes } from "styled-components";
import KaKaoLogin from "./KaKaoLogin";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50%;
  gap: 1rem;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "1s"};
`;
const LogoImg = styled.div``;
const ThirdLogin = () => {
  return (
    <Container>
      <KaKaoLogin>
        <LogoImg>카카오</LogoImg>
      </KaKaoLogin>

      <LogoImg>네이버</LogoImg>
    </Container>
  );
};
export default ThirdLogin;
