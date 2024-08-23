import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SuggestList from "./suggestList";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 80%;
    height: 90%;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    position: relative;
    overflow-y: auto;
    @media (max-width: 500px) {
      width: 100%;
      height: 100%;
      max-height: 100%;
      overflow-x: hidden; /* x축 스크롤을 숨김 */
      border-radius: 0;
    }

    main {
      padding: 16px;
      border-top: 1px solid #dee2e6;
      display: flex;
      flex-direction: column;
    }
    footer {
      padding: 12px 16px;
      text-align: right;
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
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

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #4ce386;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  margin-left: 20px;
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
const Container = styled.div`
  display: flex;
  flex-wrap: wrap; /* Flex 항목이 넘칠 경우 줄 바꿈 */
  gap: 10px; /* 입력 필드 사이의 여백 */
  @media (max-width: 500px) {
    margin-bottom: 30px;
  }
`;

const CategorySelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* 부모 컨테이너에 맞게 가로폭 설정 */
  max-width: 300px; /* 최대 가로폭 설정 */
  height: 40px;
  background-color: #fff;
  box-sizing: border-box; /* padding, border를 포함한 전체 크기 계산 */
  margin-bottom: 10px; /* 아래쪽 여백 */
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Textbox = styled.div`
  flex: 1 1 300px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Textinput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  box-sizing: border-box;
`;

const Atext = styled.div`
  font-size: 12px;
  color: #666;
`;
const Graph = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    width: 100%;
    height: 350px;
  }
`;
const Colorbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Suggestmodal = (props) => {
  const { open, close } = props;
  const [category, setCategory] = useState("");
  const [cscore, setCscore] = useState("");
  const [jeonse, setJeonse] = useState("");
  const [loanam, setLoanam] = useState("");
  const [mort, setMort] = useState("");
  const [pawn, setPawn] = useState("");
  const [occup, setOccup] = useState("");
  const [region, setRegion] = useState("");
  const [age, setAge] = useState("");
  const [annincome, setAnnincome] = useState("");
  const [selectedsiLoan, setSelectedsiLoan] = useState([]);
  const [forecast, setForecast] = useState([]);

  const handleDetailClick = (loan_no) => {
    console.log(loan_no);
    const url = `/lend/Sugg/${loan_no}/${category}`;
    window.open(url, "_blank");
  };

  const modalclose = () => {
    setSelectedsiLoan("");
    setCategory("");
    setCscore("");
    setJeonse("");
    setLoanam("");
    setMort("");
    setPawn("");
    setOccup("");
    setRegion("");
    setAge("");
    setAnnincome("");
    close();
  };
  const ear = (e) => {
    setAnnincome(e.target.value);
  };

  const ag = (e) => {
    setAge(e.target.value);
  };

  const regi = (event) => {
    setRegion(event.target.value);
  };

  const occ = (event) => {
    setOccup(event.target.value);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const csco = (e) => {
    setCscore(e.target.value);
  };
  const jeons = (e) => {
    setJeonse(e.target.value);
  };
  const amount = (e) => {
    setLoanam(e.target.value);
  };
  const home = (e) => {
    setMort(e.target.value);
  };
  const paw = (event) => {
    setPawn(event.target.value);
  };

  const Rateforecast = async () => {
    if (open) {
      try {
        const response = await fetch(
          "http://192.168.10.6:5000/api/rate_forecast_endpoint",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("API 응답 데이터:", data);

          if (data.historical_data && typeof data.predicted_rate === "number") {
            const lastDate = new Date(
              data.historical_data[data.historical_data.length - 1]["연도 분기"]
            );
            const nextDate = new Date(lastDate);
            nextDate.setMonth(lastDate.getMonth() + 3);

            const forecastData = [
              ...data.historical_data,
              {
                "연도 분기": nextDate.toISOString().split("T")[0],
                기준금리: data.predicted_rate,
                isPrediction: true,
              },
            ];

            setForecast(forecastData);
          } else {
            setForecast([]);
          }
        } else {
          console.error("예측을 가져오지 못했습니다.", response.status);
        }
      } catch (error) {
        console.error("예측을 가져오는 중에 오류가 발생했습니다.", error);
      }
    }
  };

  useEffect(() => {
    Rateforecast();
  }, [open]);

  const chartData = {
    labels: forecast.map((item) => {
      const date = new Date(item["연도 분기"]);
      return `${date.getFullYear()} Q${Math.ceil((date.getMonth() + 1) / 3)}`;
    }),
    datasets: [
      {
        label: "기준금리 및 다음 분기 예측 기준금리",
        data: forecast.map((item) => item["기준금리"]),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
        pointBackgroundColor: forecast.map((item) =>
          item.isPrediction ? "red" : "rgba(75,192,192,1)"
        ),
        pointBorderColor: forecast.map((item) =>
          item.isPrediction ? "red" : "rgba(75,192,192,1)"
        ),
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const item = tooltipItems[0];
            const date = new Date(forecast[item.dataIndex]["연도 분기"]);
            const year = date.getFullYear();
            const quarter = Math.ceil((date.getMonth() + 1) / 3);
            return `연도: ${year}, ${quarter} 분기`; //
          },
          label: function (tooltipItem) {
            return `기준금리: ${tooltipItem.formattedValue}%`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "연도",
        },
        ticks: {
          maxRotation: 0, // 기울기 제거
          minRotation: 0, // 기울기 제거
          align: "center", // 텍스트 중앙 정렬
          callback: function (value, index, values) {
            const uniqueYears = [
              ...new Set(
                forecast.map((item) =>
                  new Date(item["연도 분기"]).getFullYear()
                )
              ),
            ];
            return uniqueYears.includes(parseInt(value)) ? value : "";
          },
          autoSkip: true, // 자동 생략을 통해 대략적인 연도 표시
          maxTicksLimit: 10, // 표시할 최대 틱 수 제한
        },
      },
      y: {
        title: {
          display: true,
          text: "기준금리 (%)",
        },
        ticks: {
          callback: function (value) {
            return value.toFixed(1); // 1.0, 2.0 등 소수점 한 자리로 표시
          },
        },
      },
    },
    elements: {
      point: {
        radius: 5,
      },
    },
    maintainAspectRatio: false,
  };

  const Recommexe = async () => {
    if (category === "일반신용대출") {
      if (open) {
        fetch(`http://192.168.10.6:5000/api/recommend_loan_products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credit_score: cscore,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("추천데이터123:", data);
            setSelectedsiLoan(data);
          })
          .catch((error) => {
            console.error("추천 데이터 로딩 실패:", error);
          });
      }
    } else if (category == "전세자금대출") {
      if (open) {
        fetch(`http://192.168.10.6:5000/api/jeonse_loan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rent_value: jeonse,
            loan_amount: loanam,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("서버에서 받은 데이터:", data);
            setSelectedsiLoan(data);
          })
          .catch((error) => {
            console.error("추천 데이터 로딩 실패:", error);
          });
      }
    } else if (category == "주택담보대출") {
      if (open) {
        fetch(`http://192.168.10.6:5000/api/mortgage_loan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property_value: mort,
            loan_amount: loanam,
            collateral_type: pawn,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("서버에서 받은 데이터:", data);
            setSelectedsiLoan(data);
          })
          .catch((error) => {
            console.error("추천 데이터 로딩 실패:", error);
          });
      }
    } else {
      if (open) {
        fetch(`http://192.168.10.6:5000/api/people_finloan_recommendation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            사용자_대상: occup,
            사용자_지역: region,
            사용자_연령: age,
            사용자_소득: annincome,
            사용자_신용점수: cscore,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("서버에서 받은 데이터:", data);
            setSelectedsiLoan(data);
          })
          .catch((error) => {
            console.error("추천 데이터 로딩 실패:", error);
          });
      }
    }
  };

  return (
    <>
      <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
          {open && (
            <section>
              <CloseButton onClick={modalclose}>&times;</CloseButton>
              <main>
                <Graph>
                  {forecast.length > 0 ? (
                    <Line data={chartData} options={chartOptions} />
                  ) : (
                    <p>금리 예측 데이터를 로드할 수 없습니다.</p>
                  )}
                </Graph>
                <Container>
                  <CategorySelect
                    id="category"
                    value={category}
                    onChange={handleChange}
                  >
                    <option value="">대출 종류를 선택해주세요</option>
                    <option value="일반신용대출">일반신용대출</option>
                    <option value="전세자금대출">전세자금대출</option>
                    <option value="주택담보대출">주택담보대출</option>
                    <option value="서민금융진흥원대출">
                      서민금융진흥원대출
                    </option>
                  </CategorySelect>

                  <Colorbox>
                    {category === "일반신용대출" && (
                      <Textbox>
                        <Textinput
                          placeholder="신용점수를 입력해 주세요(숫자만 입력해주세요)"
                          onChange={csco}
                        />
                        <Atext>나이스 신용점수로 입력해주세요.</Atext>
                      </Textbox>
                    )}

                    {category === "전세자금대출" && (
                      <>
                        <Textbox>
                          <Textinput
                            placeholder="전세가를 입력해주세요(숫자만 입력해주세요)"
                            onChange={jeons}
                          />
                          <Atext>예시 1억= 100000000</Atext>
                        </Textbox>
                        <Textbox>
                          <Textinput
                            placeholder="원하시는 대출 금액을 입력해주세요(숫자만 입력해주세요)"
                            onChange={amount}
                          />
                          <Atext>예시 1억= 100000000</Atext>
                        </Textbox>
                      </>
                    )}

                    {category === "주택담보대출" && (
                      <>
                        <Textbox>
                          <Textinput
                            placeholder="주택 매매가를 알려주세요(숫자만 입력해주세요)"
                            onChange={home}
                          />
                          <Atext>1억= 100000000</Atext>
                        </Textbox>
                        <Textbox>
                          <Textinput
                            placeholder="원하시는 대출 금액을 입력해주세요(숫자만 입력해주세요)"
                            onChange={amount}
                          />
                          <Atext>예시 1억= 100000000</Atext>
                        </Textbox>
                        <Textbox>
                          <CategorySelect onChange={paw}>
                            <option value="">담보 종류를 선택해주세요</option>
                            <option value="아파트">아파트</option>
                            <option value="오피스텔">오피스텔</option>
                            <option value="다세대주택">다세대주택</option>
                            <option value="빌라">빌라</option>
                            <option value="기타">기타</option>
                          </CategorySelect>
                        </Textbox>
                      </>
                    )}

                    {category === "서민금융진흥원대출" && (
                      <>
                        <Textbox>
                          <CategorySelect onChange={occ}>
                            <option value="">직업 종류를 선택해주세요</option>
                            <option value="근로자">근로자</option>
                            <option value="귀어업인(희망자포함) 및 재촌비어업인">
                              귀어업인(희망자포함) 및 재촌비어업인
                            </option>
                            <option value="대학생">대학생</option>
                            <option value="청년">청년</option>
                            <option value="사업자">사업자</option>
                            <option value="연금소득자">연금소득자</option>
                            <option value="금융취약계층">금융취약계층</option>
                            <option value="취업준비생">취업준비생</option>
                            <option value="만60세 이상 국민연금수급자 (노령,분할,유족,장애1~3급 수급자">
                              만60세 이상 국민연금수급자
                              (노령,분할,유족,장애1~3급 수급자
                            </option>
                            <option value="문화예술인">문화예술인</option>
                            <option value="농림어업인">농림어업인</option>
                            <option value="소기업">소기업</option>
                            <option value="소상공인">소상공인</option>
                            <option value="예비창업자">예비창업자</option>
                            <option value="채무조정자">채무조정자</option>
                            <option value="여성기업">여성기업</option>
                            <option value="중소기업">중소기업</option>
                            <option value="채무조정 성실상환자">
                              채무조정 성실상환자
                            </option>
                            <option value="09.2학기~12년 일반 상환학자금 대출자">
                              09.2학기~12년 일반 상환학자금 대출자
                            </option>
                            <option value="벤처기업">벤처기업</option>
                            <option value="기타">기타</option>
                          </CategorySelect>
                        </Textbox>
                        <Textbox>
                          <CategorySelect onChange={regi}>
                            <option value="">사는 지역을 입력해주세요</option>
                            <option value="경기">경기</option>
                            <option value="경남">경남</option>
                            <option value="경북">경북</option>
                            <option value="울산">울산</option>
                            <option value="광주">광주</option>
                            <option value="서울">서울</option>
                            <option value="대구">대구</option>
                            <option value="대전">대전</option>
                            <option value="부산">부산</option>
                            <option value="인천">인천</option>
                            <option value="전북">전북</option>
                            <option value="전남">전남</option>
                            <option value="제주">제주</option>
                            <option value="충북">충북</option>
                            <option value="충남">충남</option>
                            <option value="세종">세종</option>
                          </CategorySelect>
                        </Textbox>
                        <Textbox>
                          <Textinput
                            placeholder="나이를 입력해 주세요(숫자만 입력해주세요)"
                            onChange={ag}
                          />
                          <Atext>30세= 30</Atext>
                        </Textbox>
                        <Textbox>
                          <Textinput
                            placeholder="연소득을 입력해주세요(숫자만 입력해주세요)"
                            onChange={ear}
                          />
                          <Atext>1억=10000, 5천만원=5000</Atext>
                        </Textbox>
                        <Textbox>
                          <Textinput
                            placeholder="신용점수를 입력해 주세요(숫자만 입력해주세요)"
                            onChange={csco}
                          />
                          <Atext>나이스 신용점수로 입력해주세요.</Atext>
                        </Textbox>
                      </>
                    )}
                  </Colorbox>
                </Container>

                <SuggestList
                  loanitems={selectedsiLoan}
                  handleDetailClick={handleDetailClick}
                  category={category}
                />
              </main>
              <footer>
                <Button onClick={modalclose}>취소</Button>
                <Button onClick={Recommexe}>확인</Button>
              </footer>
            </section>
          )}
        </div>
      </ModalStyle>
    </>
  );
};

export default Suggestmodal;
