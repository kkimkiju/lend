import styled from "styled-components";
import SimpleSlider from "../../components/SimpleSlider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Adbox = styled.div`
  width: 100%;
`;
const Sett = styled.div`
  margin: 10px;
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

const Loaninfo = () => {
  return (
    <Container>
      <Adbox>
        <SimpleSlider />
      </Adbox>
      <Sett>
        <CategorySelect>
          <option value="대출상품 종류">대출상품 종류</option>
          <option value="마이너스 한도 대출">마이너스 한도 대출</option>
          <option value="서민대출">서민대출</option>
          <option value="신용대출(일반)">신용대출(일반)</option>
          <option value="오토론">오토론</option>
          <option value="장기카드대출">장기카드대출</option>
          <option value="전세자금대출">전세자금대출</option>
          <option value="주택담보대출">주택담보대출</option>
          <option value="환승론">환승론</option>
        </CategorySelect>
        <Textinput placeholder="연봉을 입력해주세요" />
      </Sett>
      <Loanbox>
        <Loantit>
          <Title style={{ flex: 1 }}>은행명</Title>
          <Title style={{ flex: 1 }}>대출 상품명</Title>
          <Title style={{ flex: 1 }}>자본 목적</Title>
        </Loantit>
      </Loanbox>
    </Container>
  );
};
export default Loaninfo;
