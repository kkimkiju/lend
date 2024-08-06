import React from "react";
import styled from "styled-components";

// styled-components 사용하여 스타일 정의
const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  background-color: #29c555;
  color: #fff;
  padding: 15px 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;

  @media (max-width: 500px) {
    padding: 10px 15px;
    border-radius: 5px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const List = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 500px;

  @media (max-width: 500px) {
    margin-top: 20px;
  }
`;

const Item = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 15px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 500px) {
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
  }
`;

const ItemTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 20px;
  color: #333;

  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const ItemDescription = styled.p`
  margin: 0;
  font-size: 16px;
  color: #666;

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  margin-top: 30px;
  font-size: 18px;

  @media (max-width: 500px) {
    margin-top: 20px;
    font-size: 16px;
  }
`;

const WishList = () => {
  // 찜목록 데이터
  const wishList = [];

  return (
    <Container>
      <Header>
        <Title>찜목록</Title>
      </Header>
      <List>
        {wishList.length === 0 ? (
          <EmptyMessage>찜한 대출 상품이 없습니다.</EmptyMessage>
        ) : (
          wishList.map((item, index) => (
            <Item key={index}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </Item>
          ))
        )}
      </List>
    </Container>
  );
};

export default WishList;
