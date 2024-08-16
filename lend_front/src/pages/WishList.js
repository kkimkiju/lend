import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import AxiosApi from "../axios/AxiosApi";
import Paging from "./loaninfo/paging";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// styled-components 사용하여 스타일 정의
const Container = styled.div`
  padding: 20px;
  background: linear-gradient(to right, #f9f9f9, #e0e0e0);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  background: #29c555;
  color: #fff;
  padding: 20px 30px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  position: relative;

  @media (max-width: 500px) {
    padding: 15px 20px;
    border-radius: 8px;
  }
`;

const Title1 = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

const List = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 600px;

  @media (max-width: 500px) {
    margin-top: 30px;
  }
`;

const Item = styled.div`
  background-color: #fff;
  padding: 25px;
  margin: 20px 0;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 500px) {
    padding: 20px;
    margin: 15px 0;
    border-radius: 8px;
  }
`;

const ItemTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 22px;
  color: #333;
  font-weight: 600;

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const ItemDescription = styled.p`
  margin: 0;
  font-size: 18px;
  color: #555;

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  margin-top: 40px;
  font-size: 20px;

  @media (max-width: 500px) {
    margin-top: 30px;
    font-size: 18px;
  }
`;

const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 1000px;
  margin-top: 40px;
`;

const WishList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [totalItems, setTotalItems] = useState(0);
  const [wishList, setWishList] = useState([]);
  const [useemail, setUseemail] = useState("");

  useEffect(() => {
    const userinfo = async () => {
      try {
        const rsp = await AxiosApi.getMemberInfo();
        setUseemail(rsp.data.email);
      } catch (e) {
        console.log(e);
      }
    };
    userinfo();
  }, []);

  // 금리 데이터를 위한 차트 설정
  const rateData = {
    labels: wishList.map((item) => item.title),
    datasets: [
      {
        label: "금리 (%)",
        data: wishList.map((item) => item.rate),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 한도 데이터를 위한 차트 설정
  const limitData = {
    labels: wishList.map((item) => item.title),
    datasets: [
      {
        label: "한도 (만원)",
        data: wishList.map((item) => item.limit),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "대출 상품 비교",
        font: {
          size: 20,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw} ${
              context.dataset.label === "금리 (%)" ? "%" : "만원"
            }`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    try {
      let response = await AxiosApi.Wishlistget(
        useemail,
        currentPage - 1,
        pageSize
      );
      console.log("장바구니데이터 : ", response);
      setTotalItems(response.data.totalItems); // totalItems 설정
      setWishList(response.data.items); // wishList에 실제 데이터 설정
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  useEffect(() => {
    if (useemail) {
      fetchData();
    }
  }, [useemail, currentPage]);

  return (
    <Container>
      <Header>
        <Title1>찜목록</Title1>
      </Header>
      <List>
        {wishList.length === 0 ? (
          <EmptyMessage>찜한 대출 상품이 없습니다.</EmptyMessage>
        ) : (
          wishList.map((item, index) => (
            <Item key={index}>
              <ItemTitle>{item.loan_name || "정보 없음"}</ItemTitle>
              <ItemDescription>
                금리: {item.rate || "정보 없음"}%, 한도:{" "}
                {item.limit || "정보 없음"}만원
              </ItemDescription>
            </Item>
          ))
        )}
        <Paging
          page={currentPage}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalItems}
          onPageChange={handlePageChange}
        />
      </List>
      {wishList.length > 1 && (
        <>
          <GraphContainer>
            <Bar
              data={rateData}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: { display: true, text: "금리 비교 (%)" },
                },
              }}
            />
          </GraphContainer>
          <GraphContainer>
            <Bar
              data={limitData}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: { display: true, text: "한도 비교 (만원)" },
                },
              }}
            />
          </GraphContainer>
        </>
      )}
    </Container>
  );
};

export default WishList;
