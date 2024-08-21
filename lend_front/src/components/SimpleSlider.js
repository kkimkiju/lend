import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import loan1 from "../image/대출광고1.png";
import loan2 from "../image/대출광고2.png";
import loan3 from "../image/대출광고3.png";
import moloan1 from "../image/모바일대출광고1.png";
import moloan2 from "../image/모바일대출광고2.jpg";
import moloan3 from "../image/모바일대출광고3.jpg";

export default function SimpleSlider() {
  const navigate = useNavigate();
  var settings = {
    dots: true, //아래 원형 버튼 여부
    infinite: true, // 슬라이드 반복 여부
    speed: 1000, // 슬라이드 속도 1초
    slidesToShow: 1, // 화면에 출력되는 화면 수
    slidesToScroll: 1, // 이동되는 화면 수
    arrows: true, // 양쪽 화살표
    autoplay: true,
    autoplaySpeed: 5000, // 슬라이드 전환 주기 5초마다
    adaptiveHeight: true,
  };
  return (
    <StyledSliderContainer>
      <Slider {...settings}>
        <SlideBox className="first"></SlideBox>
        <SlideBox className="second"></SlideBox>
        <SlideBox className="third"></SlideBox>
      </Slider>
    </StyledSliderContainer>
  );
}

const StyledSliderContainer = styled.div`
  .slick-dots {
    bottom: 0.5vh; // dots 위치를 조정
    li {
      margin: 0 2vw 2vw 0;
    }
    button {
      &::before {
        font-size: 1vw;
        color: black; // dots 색상 조정
      }
    }
    .slick-active button::before {
      color: white; // 활성화된 dots 색상 조정
    }
  }
  @media (max-width: 500px) {
    .slick-next:before {
      display: none;
    }
    .slick-arrow {
      width: 0;
      height: 0;
      display: none;
      background-color: black;
    }
  }
`;

const SlideBox = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 38vh;

  // 첫 번째 슬라이드 스타일
  &.first {
    background-image: url(${loan1});
    background-size: cover; // 이미지가 슬라이드 박스를 덮도록 설정
    background-repeat: no-repeat; // 이미지 반복 방지
    background-position: center; // 이미지 중앙 정렬
    @media (max-width: 500px) {
      background-image: url(${moloan1});
    }
  }

  // 두 번째 슬라이드 스타일
  &.second {
    background-image: url(${loan2});
    background-size: cover; // 이미지가 슬라이드 박스를 덮도록 설정
    background-repeat: no-repeat; // 이미지 반복 방지
    background-position: center; // 이미지 중앙 정렬
    @media (max-width: 500px) {
      background-image: url(${moloan2});
    }
  }

  // 세 번째 슬라이드 스타일
  &.third {
    background-image: url(${loan3});
    background-size: cover; // 이미지가 슬라이드 박스를 덮도록 설정
    background-repeat: no-repeat; // 이미지 반복 방지
    background-position: center; // 이미지 중앙 정렬
    @media (max-width: 500px) {
      background-image: url(${moloan3});
    }
  }
  @media (max-width: 500px) {
    width: 50%;
    height: 50svh;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5vw;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Img = styled.div`
  width: 100%;
  height: 100%;
`;
