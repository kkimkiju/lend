import styled from "styled-components";

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 40%;
    max-height: 85%; /* Limit the height */
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  main {
    padding: 16px;
    border-top: 1px solid #dee2e6;
    overflow-y: auto; /* Enable vertical scrolling */
    flex-grow: 1; /* Allow main to grow and take available space */
    overflow-x: hidden;
  }

  footer {
    padding: 12px 16px;
    text-align: right;
    border-top: 1px solid #dee2e6; /* Add top border for separation */
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      transform: translateY(-50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Custom scrollbar styles */
  main::-webkit-scrollbar {
    width: 8px; /* Make the scrollbar thinner */
  }

  main::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }

  main::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #e74c3c;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #4ce386;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

const Grayline = styled.div`
  width: 100%;
  height: 2px;
  background-color: #dee2e6;
`;

const Grayline2 = styled.div`
  width: 3px;
  height: 100%;
  background-color: #dee2e6;
`;

const Gbox = styled.div`
  background-color: #58faac;
  width: 100%;
  height: 150px;
  display: flex;
`;

const Lowbox = styled.div`
  background-color: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const Lowboxtext = styled.div`
  width: 90%;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`;

const Wbox = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  margin-top: 20px;
  border: 1px solid #dee2e6;
  flex-direction: column;
`;

const Wlowbox = styled.div`
  background-color: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  margin-top: 20px;
`;

const Hwlowbox = styled.div`
  background-color: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin-top: 20px;
`;

const Lowwboxtext = styled.div`
  width: 90%;
  font-size: 12px;
  text-align: center;
  margin-top: 20px;
`;

const Wwbox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
`;

const Simodal = ({ open, close, loan1 }) => {
  console.log(loan1);
  console.log(open);
  const truncateTitle = (title) => {
    if (!title) return "No title available";
    return title.length > 25 ? title.substring(0, 25) + "..." : title;
  };

  if (!open) return null;

  if (!loan1 || !loan1._source) return null;

  return (
    <>
      <ModalStyle>
        <div style={{ display: open ? "flex" : "none" }} className="modal">
          {open && (
            <section>
              <CloseButton onClick={close}>&times;</CloseButton>
              <main>
                <h2>{loan1["금융 상품명"] || "정보 없음"}</h2>
                <Grayline />
                <Gbox>
                  <Lowbox>
                    <strong>이자율</strong>
                    <Lowboxtext>{loan1["평균 금리"] || "정보 없음"}</Lowboxtext>
                  </Lowbox>
                  <Grayline2 />
                  <Lowbox>
                    <strong>대출 한도</strong>
                    <Lowboxtext title={loan1["대출한도"]}>
                      {loan1["대출한도"] || "정보 없음"}
                    </Lowboxtext>
                  </Lowbox>
                </Gbox>
                <Wbox>
                  <Wwbox>
                    <Wlowbox>
                      <strong>은행명</strong>
                      <Lowwboxtext>
                        {loan1["금융회사 명"] || "정보 없음"}
                      </Lowwboxtext>
                    </Wlowbox>
                    <Wlowbox>
                      <strong>대출종류명</strong>
                      <Lowwboxtext>
                        {loan1["대출종류명"] || "정보 없음"}
                      </Lowwboxtext>
                    </Wlowbox>
                    <Wlowbox>
                      <strong>가입 방법</strong>
                      <Lowwboxtext title={loan1["가입 방법"]}>
                        {truncateTitle(loan1["가입 방법"]) || "정보 없음"}
                      </Lowwboxtext>
                    </Wlowbox>
                  </Wwbox>
                  <Grayline />
                  <Wwbox>
                    <Hwlowbox>
                      <strong>공시 시작일</strong>
                      <Lowwboxtext>
                        {loan1["공시 시작일"] || "정보 없음"}
                      </Lowwboxtext>
                    </Hwlowbox>
                    <Hwlowbox>
                      <strong>공시 종료일</strong>
                      <Lowwboxtext>
                        {loan1["공시 종료일"] || "정보 없음"}
                      </Lowwboxtext>
                    </Hwlowbox>
                  </Wwbox>
                </Wbox>
                <p>
                  <strong>대출조건:</strong> {loan1["대출조건"] || "정보 없음"}
                </p>
                <p>
                  <strong>대출 만기 경과 건 연체이자율:</strong>{" "}
                  {loan1["대출 만기 경과 건 연체이자율"] || "정보 없음"}
                </p>
                <p>
                  <strong>중도상환 수수료:</strong>
                  {loan1["중도상환 수수료"] || "정보 없음"}
                </p>
                <p>
                  <strong>보증기관:</strong>
                  {loan1["보증기관"] || "정보 없음"}
                </p>
              </main>
              <footer>
                <Button onClick={close}>취소</Button>
              </footer>
            </section>
          )}
        </div>
      </ModalStyle>
    </>
  );
};

export default Simodal;
