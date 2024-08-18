// StyledComponents.js
import styled, { css, createGlobalStyle, keyframes } from "styled-components";

export const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: auto;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300vw;
    transform: translate(35%, 0);
    background-image: linear-gradient(
      -45deg,
      var(--primary-color) 0%,
      var(--secondary-color) 100%
    );
    transition: 1s ease-in-out;
    z-index: 6;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-bottom-right-radius: max(50vw, 50vh);
    border-top-left-radius: max(50vw, 50vh);
  }
  ${(props) =>
    props.isSignIn
      ? css`
          &::before {
            transform: translate(0, 0);
            right: 50%;
          }
        `
      : css`
          &::before {
            transform: translate(100%, 0);
            right: 50%;
          `}
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
`;

export const Col = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  ${(props) =>
    props.isSignIn &&
    css`
      transform: translateX(0);
    `}

  @media only screen and (max-width: 425px) {
    width: 100%;
    position: absolute;
    padding: 2rem;
    background-color: var(--white);
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    transform: translateY(100%);
    transition: 1s ease-in-out;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 28rem;
`;

export const Form = styled.div`
  padding: 1rem;
  background-color: var(--white);
  border-radius: 1.5rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(0);
  transition: 0.5s ease-in-out;

  ${(props) =>
    props.active &&
    css`
      transform: scale(1);
    `}
`;

export const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin: 1rem 0;

  i {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 1.4rem;
    color: var(--gray-2);
  }

  input {
    width: 100%;
    padding: 1rem 3rem;
    font-size: 1rem;
    background-color: var(--gray);
    border-radius: 0.5rem;
    border: 0.125rem solid var(--white);
    outline: none;

    &:focus {
      border: 0.125rem solid var(--primary-color);
    }
  }
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 0.6rem 0;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--primary-color);
  color: var(--white);
  font-size: 1.2rem;
  outline: none;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const TextAnimation = styled.div`
  animation: ${fadeIn} 0.8s ease-in-out forwards;
`;
export const Text = styled.div`
  margin: 4rem;
  color: var(--white);
  .sign-in h2 {
    transform: ${(props) =>
      props.isSignIn ? "translateX(0)" : "translateX(-250%)"};
  }
  .sign-up h2 {
    transform: ${(props) =>
      props.isSignIn ? "translateX(250%)" : "translateX(0)"};
  }

  h2 {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 2rem 0;
    transition: transform 1s ease-in-out;

    @media only screen and (max-width: 1024px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-weight: 600;
    transition: opacity 1s ease-in-out;
    transition-delay: 0.2s;
  }
  text {
    transition: 1s ease-in-out;
  }
  @media only screen and (max-width: 425px) {
    margin: 0;

    p {
      display: none;
    }

    h2 {
      margin: 0.5rem;
      font-size: 2rem;
    }
  }
`;

export const Img = styled.div`
  img {
    width: 30vw;
    transition: 1s ease-in-out;
    transition-delay: 0.4s;
  }

  @media only screen and (max-width: 425px) {
    display: none;
  }
`;

export const PointerBox = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "0.5s"};
  transform: ${(props) => (props.isSignIn ? "scale(1)" : "scale(0)")};
  transition: 0.5s ease-in-out;
`;
export const Pointer = styled.b`
  cursor: pointer;
`;

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #29c555;
    --secondary-color: #29c555;
    --black: #000000;
    --white: #ffffff;
    --gray: #efefef;
    --gray-2: #757575;

    --facebook-color: #4267b2;
    --google-color: #db4437;
    --twitter-color: #1da1f2;
    --insta-color: #e1306c;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100vh;
    overflow: auto;
  }

  .flex-col {
    flex-direction: column;
  }

  .pointer {
    cursor: pointer;
  }


  .content-row {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 6;
    width: 100%;
  }

`;
