import styled from "styled-components";
const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    /* background-color: rgba(0, 0, 0, 0.6); */
  }

  .openModal {
    display: flex;
    align-items: center;

    /* 팝업이 열릴때 스르륵 열리는 효과 */
    /* animation: modal-bg-show 0.8s; */
  }

  section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    border: 0.8px solid;
    background-color: white;
    overflow: hidden;

    div {
      padding: 16px;
      border-bottom: 2px solid #dee2e6;
      text-align: center;
      color: #333;
      white-space: pre-line;
      line-height: 1.4;
    }
  }
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  border: 0;
  width: 60px;
`;
const Input = styled.input`
  all: unset;
  text-align: start;
  width: 80%;
  height: 16px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const KaKaoSignUpModal = ({ open, close }) => {
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>추가 입력</header>
            <Input maxLength="6" placeholder="생년월일" />
            zz
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default KaKaoSignUpModal;
