import styled from "styled-components";
import forest from "../image/숲사진.jpg";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const Mainpage = () => {
  return (
    <>
      <Body>
        <Container>
          <MainImage>
            <TextOverlay>
              <h1>Always Lend</h1>
              ever land
              <br />
              ever lend
              <br />
              <TryBtn as={Link} to="/lend/login">
                Try it
              </TryBtn>
            </TextOverlay>
          </MainImage>
          <Section />
          <Footer />
        </Container>
      </Body>
    </>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  margin: 0 15vw;
  border: 3px solid rgba(41, 197, 85, 0.1);
  border-top: none;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  height: auto;
  @media (max-width: 500px) {
    width: 100dvw;
  }
`;

const MainImage = styled.div`
  margin-bottom: 200px;
  background-image: url(${forest});
  background-size: cover;
  background-position: center; /* 가운데 정렬 */
  height: 400px; /* 필요에 따라 조정 */
  display: flex;
  align-self: center;
  justify-content: center;
`;

const TextOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  text-align: center;
  justify-content: center;
  caret-color: transparent;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const TryBtn = styled.div`
  margin-top: 30px;
  display: block;
  width: 120px;
  border-radius: 100px;
  color: white;
  font-size: 25px;
  text-decoration: none;
  background-color: #29c555;

  font-weight: bold;

  &&:hover {
    background-color: white;
    color: #29c555;
  }
`;
export default Mainpage;
