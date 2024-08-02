import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50%;
  gap: 1rem;
`;
const LogoImg = styled.div``;
const ThirdLogin = () => {
  return (
    <Container>
      <LogoImg>카카오</LogoImg>
      <LogoImg>네이버</LogoImg>
    </Container>
  );
};
export default ThirdLogin;
