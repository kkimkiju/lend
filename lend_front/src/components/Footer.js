import styled from "styled-components";
import { FaGithub, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <Container>
      <Box>
        <NameSNSBOX>
          <IconContainer>
            <a
              href="https://github.com/kkimkiju/lend  "
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={40} color="#333" />
            </a>
            <a
              href="https://instagram.com/kijusomuch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={40} color="#E4405F" />
            </a>
          </IconContainer>
          <NameBox>Always Lend</NameBox>
        </NameSNSBOX>
        <InfoBox>
          <h1>Lend</h1>
          <p>Copyright lend, Inc All Right Reseved</p>
          <p>
            (주)렌드 대표이사 김김김강임 <br />
            서울특별시 강남구 역삼동 맥주창고 맛있어요
            <br />
            전화 번호 : 010-2392-2720
          </p>
        </InfoBox>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin-top: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  @media (max-width: 500px) {
    margin-top: 500px;
    width: 100vw;
    height: 10vw;
  }
`;
const Box = styled.div`
  width: 100%;
  height: 4 00px;
  background-color: rgba(41, 197, 85, 0.3);
`;

const NameSNSBOX = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 3px solid rgba(0, 0, 0, 0.3);
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: left;
  gap: 20px;
  padding: 40px;
`;

const NameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5vw;
  color: rgba(0, 0, 0, 0.7);
  padding: 40px;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  h1 {
    font-size: 30px;
  }
  p {
    font-size: 15px;
  }
`;

export default Footer;
