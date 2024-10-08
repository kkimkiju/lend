import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserStore";

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;

    /* 팝업이 열릴때 스르륵 열리는 효과 */
    /* animation: modal-bg-show 0.8s; */
  }
  section {
    display: flex;
    padding: 48px 16px;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 90%;
    height: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    border: 0.8px solid;
    background-color: white;
    overflow: hidden;
    @media only screen and (max-width: 768px) {
      width: 80%;
      padding: 16px 16px;
      font-size: 12px;
    }
    div {
      padding: 16px;
      border-bottom: 2px solid #dee2e6;
      text-align: center;
      white-space: pre-line;
      line-height: 1.4;
    }
  }
`;

export const TerCon = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 100%;
  height: 90%;
`;

export const Terbox = styled.div`
  border: 2px solid #e9ecef;
  width: 90%;
  height: 85%;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  /* Custom Scrollbar Styles */
  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #29c555; /* color of the scroll thumb */
    border-radius: 6px; /* roundness of the scroll thumb */
    border: 3px solid #f1f1f1; /* creates padding around scroll thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #149d3a; /* color of the scroll thumb when hovered */
  }
`;
export const Button = styled.div`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #29c555;
  color: #fff;
  @media only screen and (max-width: 768px) {
    width: auto;
    height: auto;
    font-size: 12px;
    padding: 8px 12px;
  }
`;
const FirstPrivacyModal = ({ open, close, header }) => {
  const context = useContext(UserContext);
  const { setFirstPrivacyModal } = context;
  const closeModal = () => {
    setFirstPrivacyModal(false);
  };
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>{header}</header>
            <TerCon>
              <Terbox>
                <h2>개인정보취급방침</h2>
                <h3>제1조 (개인정보의 수집 항목 및 수집 방법)</h3>
                <p>
                  1. 수집하는 개인정보의 항목
                  <ul>
                    <li>회원가입 시: 이름, 이메일 주소, 비밀번호, 연락처</li>
                    <li>
                      서비스 이용 시: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP
                      정보
                    </li>
                  </ul>
                </p>

                <h3>제2조 (개인정보의 수집 및 이용 목적)</h3>
                <p>
                  회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.
                  <ul>
                    <li>
                      회원 관리: 회원제 서비스 이용에 따른 본인 확인, 개인 식별,
                      불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사
                      확인
                    </li>
                    <li>
                      서비스 제공: 개발자 매칭 서비스, 프로젝트 관리, 유료
                      서비스 제공
                    </li>
                    <li>
                      마케팅 및 광고: 신규 서비스 개발 및 맞춤 서비스 제공,
                      이벤트 및 광고성 정보 제공 및 참여 기회 제공
                    </li>
                    <li>통계 분석: 서비스 이용에 대한 통계 분석 및 연구</li>
                  </ul>
                </p>

                <h3>제3조 (개인정보의 보유 및 이용 기간)</h3>
                <p>
                  1. 회원의 개인정보는 회원가입일로부터 서비스를 제공하는 기간
                  동안 보유 및 이용됩니다. 2. 회원이 탈퇴하거나 개인정보의 수집
                  및 이용 목적이 달성된 경우, 해당 정보를 지체 없이 파기합니다.
                  단, 관계 법령에 따라 보관해야 하는 경우, 해당 법령에서 정한
                  기간 동안 보관합니다.
                  <ul>
                    <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                    <li>소비자의 불만 또는 분쟁 처리에 관한 기록: 3년</li>
                    <li>
                      전자상거래 등에서의 소비자 보호에 관한 법률에 따른 거래
                      기록: 5년
                    </li>
                  </ul>
                </p>

                <h3>제4조 (개인정보의 파기 절차 및 방법)</h3>
                <p>
                  1. 파기 절차
                  <ul>
                    <li>
                      개인정보의 보유 기간이 경과했거나 처리 목적이 달성된 경우,
                      해당 정보를 파기합니다.
                    </li>
                  </ul>
                  2. 파기 방법
                  <ul>
                    <li>
                      전자적 파일 형태의 정보는 복구 및 재생할 수 없는 기술적
                      방법을 사용하여 삭제합니다.
                    </li>
                    <li>
                      종이 문서에 기록된 개인정보는 분쇄하거나 소각하여
                      파기합니다.
                    </li>
                  </ul>
                </p>

                <h3>제5조 (개인정보의 제3자 제공)</h3>
                <p>
                  회사는 회원의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                  다만, 다음의 경우에는 예외로 합니다.
                  <ul>
                    <li>회원이 사전에 동의한 경우</li>
                    <li>
                      법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진
                      절차와 방법에 따라 수사 기관의 요구가 있는 경우
                    </li>
                  </ul>
                </p>

                <h3>제6조 (개인정보 처리의 위탁)</h3>
                <p>
                  회사는 서비스 제공을 위하여 필요한 업무 중 일부를 외부 업체에
                  위탁할 수 있습니다. 이 경우, 위탁 계약을 통해 개인정보가
                  안전하게 관리될 수 있도록 필요한 사항을 규정합니다.
                </p>

                <h3>제7조 (회원의 권리와 그 행사 방법)</h3>
                <p>
                  1. 회원은 언제든지 자신의 개인정보를 조회하거나 수정할 수
                  있습니다. 2. 회원은 언제든지 개인정보 제공에 관한 동의를
                  철회할 수 있습니다. 동의 철회 시, 일부 서비스의 이용이 제한될
                  수 있습니다. 3. 개인정보의 조회, 수정, 동의 철회는 회사의
                  고객센터를 통해 가능합니다.
                </p>

                <h3>제8조 (개인정보의 안전성 확보 조치)</h3>
                <p>
                  회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
                  있습니다.
                  <ul>
                    <li>
                      기술적 조치: 개인정보의 암호화, 보안 프로그램 설치, 접근
                      통제
                    </li>
                    <li>
                      관리적 조치: 개인정보 보호를 위한 내부관리계획 수립 및
                      시행, 직원 교육
                    </li>
                    <li>물리적 조치: 전산실 및 자료 보관실 등의 접근 통제</li>
                  </ul>
                </p>

                <h3>제9조 (개인정보 보호 책임자 및 담당자)</h3>
                <p>
                  회사는 회원의 개인정보를 보호하고 개인정보와 관련된 불만을
                  처리하기 위하여 아래와 같이 개인정보 보호 책임자를 지정하고
                  있습니다.
                  <ul>
                    <li>개인정보 보호 책임자: [이름, 직위]</li>
                    <li>연락처: [전화번호, 이메일 주소]</li>
                  </ul>
                </p>

                <h3>제10조 (개인정보취급방침의 변경)</h3>
                <p>
                  회사는 본 개인정보취급방침을 변경하는 경우, 변경 내용의 시행
                  7일 전부터 서비스 초기 화면 또는 공지사항을 통하여 공지합니다.
                </p>

                <h3>부칙</h3>
                <p>1. 본 방침은 2024년 7월 5일부터 시행됩니다.</p>
              </Terbox>

              <Button onClick={closeModal}>확인</Button>
            </TerCon>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default FirstPrivacyModal;
