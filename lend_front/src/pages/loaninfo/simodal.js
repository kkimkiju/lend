import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SimilList from "./similList";

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 70;
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
const Sugbox = styled.div`
  width: 450px;
  height: 50%;
  margin-right: 10%;
`;
const Sugtextbox = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 17px;
  color: white;
`;
const Simodal = ({ open, close, loan, categorybu }) => {
  const [similarLoans, setSimilarLoans] = useState([]);
  const [selectedsiLoan, setSelectedsiLoan] = useState(null);
  const [siOpen, setSiOpen] = useState(false);
  const onClickde = (loan) => {
    setSelectedsiLoan(loan);
    setSiOpen(true);
  };

  useEffect(() => {
    if (categorybu == "일반신용대출") {
      if (open && loan) {
        fetch(`http://localhost:5000/api/recommendations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number: loan._source?.["순번"],
            category: categorybu,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("서버에서 받은 데이터:", data);
            setSimilarLoans(data);
          })
          .catch((error) => {
            console.error("추천 데이터 로딩 실패:", error);
          });
      }
    } else if (categorybu == "전세자금대출") {
      if (open && loan) {
        fetch(`http://localhost:5000/api/loan_recommendations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number: loan._source?.["순번"],
            category: categorybu,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("서버에서 받은 데이터:", data);
            setSimilarLoans(data);
          })
          .catch((error) => {
            console.error("추천 데이터 로딩 실패:", error);
          });
      }
    } else if (categorybu == "주택담보대출") {
      if (open && loan) {
        fetch(`http://localhost:5000/api/loan_similarity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loan_number: loan._source?.["순번"],
            category: categorybu,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("서버에서 받은 데이터:", data);
            setSimilarLoans(data);
          })
          .catch((error) => {
            console.error("추천 데이터 로딩 실패:", error);
          });
      }
    } else {
      if (open && loan) {
        fetch(`http://localhost:5000/api/recommend_loans`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loan_number: loan._source?.["순번"],
            category: categorybu, // 이 부분은 서버에서 사용하는지 확인해야 합니다.
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("서버에서 받은 데이터:", data);
            setSimilarLoans(data); // 데이터가 예상한 구조인지 확인한 후 이 부분을 업데이트하세요.
          })
          .catch((error) => {
            console.error("추천 데이터 로딩 실패:", error);
          });

        console.log("보내는 loan_number:", loan._source?.["순번"]);
      }
    }
  }, [open, loan, categorybu]);

  const truncateTitle = (title) => {
    if (!title) return "No title available";
    return title.length > 25 ? title.substring(0, 25) + "..." : title;
  };
  const getDisplayValue = (loan) => {
    if (loan._source["공시 시작일"]) {
      return loan._source["공시 시작일"];
    } else if (loan._source["대상"]) {
      return loan._source["대상"];
    }
    return "정보 없음";
  };

  const getLabel = (loan) => {
    // "가입 방법"이 존재하면 "가입 방법", 없으면 "대상"을 반환
    return loan._source["공시 시작일"] ? "공시 시작일" : "대상";
  };

  if (!open) return null;

  if (!loan || !loan._source) return null;
  const de = (categorybu) => {
    if (categorybu == "서민금융진흥원대출") {
      return "연락처";
    } else {
      return "공시 종료일";
    }
  };
  const def = (categorybu, loan) => {
    if (categorybu == "서민금융진흥원대출") {
      return loan._source["연락처"];
    } else {
      return loan._source["공시 종료일"] || "정보 없음";
    }
  };
  const are = (categorybu) => {
    if (categorybu == "서민금융진흥원대출") {
      return "지역";
    } else {
      return "대출 조건";
    }
  };
  const are1 = (categorybu, loan) => {
    if (categorybu == "서민금융진흥원대출") {
      return loan._source["지역"];
    } else {
      return loan._source["대출조건"] || "정보 없음";
    }
  };
  const agee = (categorybu) => {
    if (categorybu == "서민금융진흥원대출") {
      return "연령제한";
    } else {
      return "대출 만기 경과 건 연체이자율";
    }
  };
  const agee1 = (categorybu, loan) => {
    if (categorybu == "서민금융진흥원대출") {
      return loan._source["연령 제한"];
    } else {
      return loan._source["대출 만기 경과 건 연체이자율"] || "정보 없음";
    }
  };
  const qq = (categorybu) => {
    if (categorybu == "서민금융진흥원대출") {
      return "상환 방법";
    } else {
      return "중도상환 수수료";
    }
  };
  const qq1 = (categorybu, loan) => {
    if (categorybu == "서민금융진흥원대출") {
      return loan._source["상환 방법"];
    } else {
      return loan._source["중도상환 수수료"] || "정보 없음";
    }
  };
  const ww = (categorybu) => {
    if (categorybu == "서민금융진흥원대출") {
      return "상품 기간";
    } else {
      return "보증기관";
    }
  };
  const ww1 = (categorybu, loan) => {
    if (categorybu == "서민금융진흥원대출") {
      return loan._source["상품 기간"];
    } else {
      return loan._source["보증기관"] || "정보 없음";
    }
  };
  return (
    <>
      <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
          {open && (
            <section>
              <CloseButton onClick={close}>&times;</CloseButton>
              <main>
                <h2>{loan._source["금융 상품명"] || "정보 없음"}</h2>
                <Grayline />
                <Gbox>
                  <Lowbox>
                    <strong>이자율</strong>
                    <Lowboxtext>
                      {loan._source["평균 금리"] ||
                        loan._source["이자율 "] ||
                        "정보없음"}
                    </Lowboxtext>
                  </Lowbox>
                  <Grayline2 />
                  <Lowbox>
                    <strong>대출 한도</strong>
                    <Lowboxtext title={loan._source["대출한도"]}>
                      {loan._source["대출한도"] ||
                        loan._source["대출 한도"] ||
                        "정보 없음"}
                    </Lowboxtext>
                  </Lowbox>
                </Gbox>
                <Wbox>
                  <Wwbox>
                    <Wlowbox>
                      <strong>은행명</strong>
                      <Lowwboxtext>
                        {loan._source["금융회사 명"] || "정보 없음"}
                      </Lowwboxtext>
                    </Wlowbox>
                    <Wlowbox>
                      <strong>대출종류명</strong>
                      <Lowwboxtext>
                        {loan._source["대출종류명"] || "정보 없음"}
                      </Lowwboxtext>
                    </Wlowbox>
                    <Wlowbox>
                      <strong>가입방법</strong>
                      <Lowwboxtext
                        title={
                          loan._source["가입 방법"] || loan._source["신청 방법"]
                        }
                      >
                        {loan._source["가입 방법"] || loan._source["신청 방법"]}
                      </Lowwboxtext>
                    </Wlowbox>
                  </Wwbox>
                  <Grayline />
                  <Wwbox>
                    <Hwlowbox>
                      <strong>{getLabel(loan)}</strong>
                      <Lowwboxtext>{getDisplayValue(loan)}</Lowwboxtext>
                    </Hwlowbox>
                    <Hwlowbox>
                      <strong>{de(categorybu)}</strong>
                      <Lowwboxtext>{def(categorybu, loan)}</Lowwboxtext>
                    </Hwlowbox>
                  </Wwbox>
                </Wbox>
                <p>
                  <strong>{are(categorybu)}:</strong>
                  {are1(categorybu, loan)}
                </p>
                <p>
                  <strong>{agee(categorybu)}:</strong> {agee1(categorybu, loan)}
                </p>
                <p>
                  <strong>{qq(categorybu)}:</strong>
                  {qq1(categorybu, loan)}
                </p>
                <p>
                  <strong>보증기관:</strong>
                  {ww1(categorybu, loan)}
                </p>
              </main>
              <footer>
                <Button onClick={close}>취소</Button>
              </footer>
            </section>
          )}
          <Sugbox>
            <Sugtextbox>비슷한 대출 상품</Sugtextbox>
            <SimilList loanitems={similarLoans} onClickde={onClickde} />
          </Sugbox>
        </div>
      </ModalStyle>
    </>
  );
};

export default Simodal;
