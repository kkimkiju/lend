import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ElasticsearchAxios from "../../axios/ElasticsearchAxios";
import AxiosApi from "../../axios/AxiosApi";
import Footer from "../../components/Footer";

const Container = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  @media (max-width: 500px) {
    width: 100%;
  }
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
  height: 90px;
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
  height: 250px;
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
const Button = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #4ce386;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
  right: 10px;
  bottom: 5px;
`;

const Pbox = styled.div`
  width: 100%;
  text-align: left;
`;

const Bbox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
`;

const Sugg = () => {
  const { loan_no, category } = useParams();
  const [loanitem, setLoanitem] = useState({});
  const [useemail, setUseemail] = useState("");
  const [useage, setUseage] = useState("");
  const [age, setAge] = useState("");
  useEffect(() => {
    const userinfo = async () => {
      try {
        const rsp = await AxiosApi.getMemberInfo();
        setUseemail(rsp.data.email);
        setUseage(rsp.data.identityNumber);
        const identityNumber = rsp.data.identityNumber;
        const birthYearPrefix = identityNumber.substring(0, 2);
        const currentYear = new Date().getFullYear();
        const currentYearPrefix = Math.floor(currentYear / 100) * 100;

        // 연도 보정: 50 이상이면 1900년대, 그렇지 않으면 2000년대
        const birthYear =
          parseInt(birthYearPrefix, 10) >= 50
            ? currentYearPrefix - 100 + parseInt(birthYearPrefix, 10)
            : currentYearPrefix + parseInt(birthYearPrefix, 10);

        // 현재 나이 계산
        const currentYearFull = new Date().getFullYear();
        let calculatedAge = currentYearFull - birthYear;

        // 생일이 아직 지나지 않았으면 나이 -1
        const birthMonth = parseInt(identityNumber.substring(2, 4), 10); // 월
        const birthDay = parseInt(identityNumber.substring(4, 6), 10); // 일

        const today = new Date();
        if (
          today.getMonth() + 1 < birthMonth ||
          (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)
        ) {
          calculatedAge--;
        }

        setAge(calculatedAge);
      } catch (e) {
        console.log(e);
      }
    };
    userinfo();
  }, []);

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
  const loan_id = loanitem["순번"];
  const loan_name = loanitem["금융 상품명"];
  const loan_category = category;
  const rate = loanitem["평균 금리"] || loanitem["이자율 "] || "정보없음";
  const lim = loanitem["대출한도"] || loanitem["대출 한도"] || "정보 없음";

  const wishlistsave = async () => {
    try {
      const rsp = await AxiosApi.WishListsave(
        useemail,
        age,
        loan_id,
        loan_name,
        loan_category,
        rate,
        lim
      );
      if (rsp.data) {
        alert("장바구니에 대출 정보를 담았습니다.");
      } else {
        alert("장바구니에 못담았습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Bbox>
        <Container>
          <h2>{loanitem["금융 상품명"] || "정보 없음"}</h2>
          <Grayline />
          <Gbox>
            <Lowbox>
              <strong>이자율</strong>
              <Lowboxtext>
                {loanitem["평균 금리"] ||
                  loanitem["전처리 이자율 "] ||
                  "정보 없음"}
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
                <Lowwboxtext>
                  {loanitem["금융회사 명"] || "정보 없음"}
                </Lowwboxtext>
              </Wlowbox>
              <Wlowbox>
                <strong>대출종류명</strong>
                <Lowwboxtext>
                  {loanitem["대출종류명"] || "정보 없음"}
                </Lowwboxtext>
              </Wlowbox>
              <Wlowbox>
                <strong>가입방법</strong>
                <Lowwboxtext
                  title={loanitem["가입 방법"] || loanitem["신청 방법"]}
                >
                  {loanitem["가입 방법"] ||
                    loanitem["신청 방법"] ||
                    "정보 없음"}
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
          <Pbox>
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
          </Pbox>

          <Button onClick={wishlistsave}>장바구니 담기</Button>
        </Container>
      </Bbox>
      <Footer isCPage={true} />
    </>
  );
};

export default Sugg;
