import styled from "styled-components";
import SimpleSlider from "../../components/SimpleSlider";
import { useCallback, useEffect, useState } from "react";
import ElasticsearchAxios from "../../axios/ElasticsearchAxios";
import LoaninfoList from "./loaninfoList";
import Paging from "./paging";
import Detail from "./loanDetail";
import Suggestmodal from "./suggestmodal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Adbox = styled.div`
  width: 100%;
`;
const Sett = styled.div`
  margin: 10px;
  display: flex;
  position: relative;
`;
const CategorySelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 15%;
  height: 40px;
  background-color: #fff;
`;
const Textinput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 15%;
  height: 21px;
  background-color: #fff;
  margin-left: 10px;
`;

const Loanbox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
`;
const Loantit = styled.div`
  display: flex;
  background-color: #94b9f3;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 720px) {
    display: none;
  }
`;
const Title = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
`;
const Loan = styled.div`
  width: 100%;
  height: 550px;
`;
const Categbut = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
`;
const Sububox = styled.div`
  position: absolute;
  right: 1px;
`;

const Loaninfo = () => {
  const [loanitem, setLoanitem] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const itemsCountPerPage = 10;
  const [deOpen, setDeOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [categorybu, setCategorybu] = useState("일반신용대출");
  const [suggestopen, setSuggestopen] = useState(false);

  const sugopen = (e) => {
    setSuggestopen(true);
  };
  const sugclose = () => {
    setSuggestopen(false);
  };

  const onClickde = (loan) => {
    setSelectedLoan(loan);
    setDeOpen(true);
  };

  const closeDe = () => {
    setDeOpen(false);
    setSelectedLoan(null); // 선택된 대출 상품 초기화
  };

  const fetchData = async (page) => {
    try {
      let response;
      if (categorybu === "일반신용대출") {
        response = await ElasticsearchAxios.Getcredit_loan(
          page,
          itemsCountPerPage
        );
      } else if (categorybu === "전세자금대출") {
        response = await ElasticsearchAxios.Getjeonse_loan(
          page,
          itemsCountPerPage
        );
      } else if (categorybu === "주택담보대출") {
        response = await ElasticsearchAxios.Getmortgage_loan(
          page,
          itemsCountPerPage
        );
      } else {
        response = await ElasticsearchAxios.Getpeoplefinloan(
          page,
          itemsCountPerPage
        );
      }
      console.log("대출상품리스트", response.data);
      const { hits } = response.data.hits;
      setLoanitem(hits);
      setTotalItemsCount(response.data.hits.total.value);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    fetchData(page);
  }, [page, categorybu]);

  const handleCategoryChange = (category) => {
    setCategorybu(category);
    setPage(1);
    console.log(categorybu);
  };

  return (
    <Container>
      <Adbox>
        <SimpleSlider />
      </Adbox>
      <Sett>
        <Categbut
          onClick={() => handleCategoryChange("일반신용대출")}
          active={categorybu === "일반신용대출"}
        >
          일반신용대출
        </Categbut>
        <Categbut
          onClick={() => handleCategoryChange("전세자금대출")}
          active={categorybu === "전세자금대출"}
        >
          전세자금대출
        </Categbut>
        <Categbut
          onClick={() => handleCategoryChange("주택담보대출")}
          active={categorybu === "주택담보대출"}
        >
          주택담보대출
        </Categbut>
        <Categbut
          onClick={() => handleCategoryChange("서민금융진흥원대출")}
          active={categorybu === "서민금융진흥원대출"}
        >
          서민금융진흥원대출
        </Categbut>
        <Sububox>
          <Categbut onClick={sugopen}>내게 맞는 대출 상품 추천 받기</Categbut>
        </Sububox>
      </Sett>
      <Loanbox>
        <Loantit>
          <Title style={{ flex: 1 }}>은행명</Title>
          <Title style={{ flex: 1 }}>대출 상품명</Title>
          <Title style={{ flex: 1 }}>자본 목적</Title>
        </Loantit>
        <Loan>
          <LoaninfoList loanitem={loanitem} onClickde={onClickde} />
        </Loan>
        <Paging
          page={page}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          onPageChange={handlePageChange}
        />
      </Loanbox>
      <Detail
        open={deOpen}
        close={closeDe}
        loan={selectedLoan}
        categorybu={categorybu}
      />
      <Suggestmodal open={suggestopen} close={sugclose} />
    </Container>
  );
};

export default Loaninfo;
