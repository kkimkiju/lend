import styled, { keyframes } from "styled-components";
import Phone from "../image/아이폰.jpg";
import Grow from "../image/새싹.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

// 애니메이션 정의
const tiltAnimation = keyframes`
  0% {
    transform: rotate(0deg);

  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
  }
  75% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const Section = () => {
  return (
    <Body>
      <Container>
        <ImageBox>
          <Img src={Phone} />
        </ImageBox>
        <LeftArrow />
        <Box>
          <Item>
            <div>
              내가 신청할 수 있는
              <br /> <span style={{ color: "#29c555" }}> 최고의 대출 상품</span>
              을
              <br /> 비교해 줄게요
            </div>
          </Item>
        </Box>
      </Container>
      <Container>
        <Box>
          <Item>
            <div>
              렌드에서는
              <br /> 그 자리에서
              <br />
              <span style={{ color: "#29c555" }}>쉽고</span>,
              <span style={{ color: "#29c555" }}> 빠르게</span>!
            </div>
          </Item>
        </Box>
        <RightArrow />
        <ImageBox>
          <Img src={Phone} />
        </ImageBox>
      </Container>
      <Container>
        <TreeContent>
          <h1>지금 렌드에서는</h1>
          <h1>
            <span style={{ color: "#29c555" }}>12345 </span>그루의
          </h1>
          <h1>나무를 심었습니다!</h1>
          <br />
          <br />
          <p>렌드에서 대출 신청을 했을 때</p>
          <p>매 신청마다 1그루의 나무를 심고 있습니다.</p>
          <br />
          <br />
          <p>내 통장도 지키고,</p>
          <p>우리 자연도 지키고</p>
          <ImageBox>
            <GrowImg src={Grow} />
          </ImageBox>
        </TreeContent>
      </Container>
    </Body>
  );
};

export default Section;

const Body = styled.div`
  width: auto;
  @media (max-width: 500px) {
    height: auto;
    padding: 5vh 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  margin-bottom: -20vh;
  @media (max-width: 500px) {
    flex-direction: column;
    height: 20vh;
    margin-bottom: 20vh;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  width: 40%;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: white;
  @media (max-width: 500px) {
    order: 2;
    margin: 0 0;
  }
`;

const Img = styled.img`
  width: 60%;
  height: 60%;
  object-fit: fill;
  animation: ${tiltAnimation} 3s ease-in-out infinite;
`;

const GrowImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: fill;
`;

const Item = styled.div`
  font-size: 2.5vw;
  color: black;
  margin-bottom: 20px;
  & > div {
    word-wrap: break-word;
  }
`;

const LeftArrow = styled(FaArrowLeft)`
  font-size: 3rem;
  color: #29c555;
`;

const RightArrow = styled(FaArrowRight)`
  font-size: 3rem;
  color: #29c555;
`;

const TreeContent = styled.div`
  display: flex;
  margin-top: 40vh;
  flex-direction: column;
  text-align: center;
  h1 {
    margin: 0.2em 0; /* Adjust the margin as needed */
  }
  p {
    margin: 0.2em 0; /* Adjust the margin as needed */
  }
`;
