import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ElasticsearchAxios from "../../axios/ElasticsearchAxios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Test1 = styled.div`
  width: 100%;
  height: 35%;
  background-color: red;
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

const Sugg = () => {
  const { loan_no, category } = useParams();
  const [loanitem, setLoanitem] = useState({}); // 처음엔 null로 초기화

  useEffect(() => {
    const getConta = async () => {
      try {
        let response;
        if (category === "일반신용대출") {
          response = await ElasticsearchAxios.Getcredit_loan_ser(loan_no);
        } else if (category === "전세자금대출") {
          response = await ElasticsearchAxios.Getjeonse_loan_ser(loan_no);
        } else if (category === "주택담보대출") {
          response = await ElasticsearchAxios.Getmortgage_loan_ser(loan_no);
        } else {
          response = await ElasticsearchAxios.Getpeoplefinloan_ser(loan_no);
        }
        const { hits } = response.data.hits;
        if (hits.length > 0) {
          setLoanitem(hits[0]._source); // 첫 번째 항목의 _source를 설정
          console.log("받아옴", loanitem);
        }
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    };

    getConta();
  }, [loan_no, category]);

  if (!loanitem) {
    return <p>Loading...</p>; // 데이터를 로드할 때 로딩 메시지
  }
  const getDisplayValue = (loanitem) => {
    if (loanitem["공시 시작일"]) {
      return loanitem["공시 시작일"];
    } else if (loanitem["대상"]) {
      return loanitem["대상"];
    }
    return "정보 없음";
  };

  const getLabel = (loanitem) => {
    return loanitem["공시 시작일"] ? "공시 시작일" : "대상";
  };
  const de = (category) => {
    if (category == "서민금융진흥원대출") {
      return "연락처";
    } else {
      return "공시 종료일";
    }
  };
  const def = (category, loanitem) => {
    if (category == "서민금융진흥원대출") {
      return loanitem["연락처"];
    } else {
      return loanitem["공시 종료일"] || "정보 없음";
    }
  };
  const are = (category) => {
    if (category == "서민금융진흥원대출") {
      return "지역";
    } else {
      return "대출 조건";
    }
  };
  const are1 = (category, loanitem) => {
    if (category == "서민금융진흥원대출") {
      return loanitem["지역"];
    } else {
      return loanitem["대출조건"] || "정보 없음";
    }
  };
  const agee = (category) => {
    if (category == "서민금융진흥원대출") {
      return "연령제한";
    } else {
      return "대출 만기 경과 건 연체이자율";
    }
  };
  const agee1 = (category, loanitem) => {
    if (category == "서민금융진흥원대출") {
      return loanitem["연령 제한"];
    } else {
      return loanitem["대출 만기 경과 건 연체이자율"] || "정보 없음";
    }
  };
  const qq = (category) => {
    if (category == "서민금융진흥원대출") {
      return "상환 방법";
    } else {
      return "중도상환 수수료";
    }
  };
  const qq1 = (category, loanitem) => {
    if (category == "서민금융진흥원대출") {
      return loanitem["상환 방법"];
    } else {
      return loanitem["중도상환 수수료"] || "정보 없음";
    }
  };
  const ww = (category) => {
    if (category == "서민금융진흥원대출") {
      return "상품 기간";
    } else {
      return "보증기관";
    }
  };
  const ww1 = (category, loanitem) => {
    if (category == "서민금융진흥원대출") {
      return loanitem["상품 기간"];
    } else {
      return loanitem["보증기관"] || "정보 없음";
    }
  };

  return (
    <Container>
      <Test1 />
      <h2>{loanitem["금융 상품명"] || "정보 없음"}</h2>
      <Grayline />
      <Gbox>
        <Lowbox>
          <strong>이자율</strong>
          <Lowboxtext>
            {loanitem["평균 금리"] || loanitem["전처리 이자율 "] || "정보 없음"}
          </Lowboxtext>
        </Lowbox>
        <Grayline2 />
        <Lowbox>
          <strong>대출 한도</strong>
          <Lowboxtext>
            {loanitem["대출 한도"] || loanitem["대출한도"] || "정보 없음"}
          </Lowboxtext>
        </Lowbox>
      </Gbox>
      <Wbox>
        <Wwbox>
          <Wlowbox>
            <strong>은행명</strong>
            <Lowwboxtext>{loanitem["금융회사 명"] || "정보 없음"}</Lowwboxtext>
          </Wlowbox>
          <Wlowbox>
            <strong>대출종류명</strong>
            <Lowwboxtext>{loanitem["대출종류명"] || "정보 없음"}</Lowwboxtext>
          </Wlowbox>
          <Wlowbox>
            <strong>가입방법</strong>
            <Lowwboxtext title={loanitem["가입 방법"] || loanitem["신청 방법"]}>
              {loanitem["가입 방법"] || loanitem["신청 방법"] || "정보 없음"}
            </Lowwboxtext>
          </Wlowbox>
        </Wwbox>
        <Grayline />
        <Wwbox>
          <Hwlowbox>
            <strong>{getLabel(loanitem)}</strong>
            <Lowwboxtext>{getDisplayValue(loanitem)}</Lowwboxtext>
          </Hwlowbox>
          <Hwlowbox>
            <strong>{de(category)}</strong>
            <Lowwboxtext>{getDisplayValue(loanitem)}</Lowwboxtext>
          </Hwlowbox>
        </Wwbox>
      </Wbox>
      <p>
        <strong>{are(category)}:</strong>
        {are1(category, loanitem)}
      </p>
      <p>
        <strong>{agee(category)}:</strong> {agee1(category, loanitem)}
      </p>
      <p>
        <strong>{qq(category)}:</strong>
        {qq1(category, loanitem)}
      </p>
      <p>
        <strong>보증기관:</strong>
        {ww1(category, loanitem)}
      </p>
    </Container>
  );
};

export default Sugg;
