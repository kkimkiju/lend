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
const SecondPrivacyModal = ({ open, close, header }) => {
  const context = useContext(UserContext);
  const { setSecondPrivacyModal } = context;
  const closeModal = () => {
    setSecondPrivacyModal(false);
  };
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>{header}</header>
            <TerCon>
              <Terbox>
                <h2>이용약관</h2>
                <h3>제1조 (목적)</h3>
                <p>
                  본 약관은 랜드 (이하 "회사")이 제공하는 모든 서비스(이하
                  "서비스")의 이용과 관련하여 회사와 이용자(이하 "회원") 간의
                  권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로
                  합니다.
                </p>

                <h3>제2조 (용어의 정의)</h3>
                <p>
                  본 약관에서 사용하는 주요 용어의 정의는 다음과 같습니다.
                  <ul>
                    <li>
                      "서비스"라 함은 회사가 제공하는 개발자 매칭 프로그램과
                      관련한 모든 서비스를 의미합니다.
                    </li>
                    <li>
                      "회원"이라 함은 본 약관에 따라 회사와 이용 계약을 체결하고
                      회사가 제공하는 서비스를 이용하는 자를 말합니다.
                    </li>
                    <li>
                      "개인정보"라 함은 식별되거나 식별될 수 있는 회원에 관한
                      정보로서, 이름, 이메일 주소 등을 포함합니다.
                    </li>
                  </ul>
                </p>

                <h3>제3조 (약관의 게시 및 개정)</h3>
                <p>
                  1. 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스
                  초기 화면에 게시합니다. 2. 회사는 필요하다고 인정되는 경우,
                  관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수
                  있습니다. 3. 회사가 약관을 개정할 경우에는 적용 일자 및 개정
                  사유를 명시하여 현행 약관과 함께 개정된 약관을 서비스 초기
                  화면에 그 적용일자 7일 전부터 적용일자 전일까지 공지합니다. 4.
                  회원은 개정된 약관에 동의하지 않을 권리가 있으며, 개정된
                  약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수
                  있습니다. 단, 개정된 약관의 효력 발생일 이후에도 서비스를 계속
                  이용할 경우 약관의 개정에 동의한 것으로 간주합니다.
                </p>

                <h3>제4조 (회원가입 및 이용 계약의 성립)</h3>
                <p>
                  1. 서비스 이용을 희망하는 자는 회사가 정한 절차에 따라
                  회원가입을 신청합니다. 2. 회사는 전항에 따라 회원가입을 신청한
                  자 중 다음 각 호에 해당하지 않는 한 회원으로 승인합니다.
                  <ul>
                    <li>
                      가입 신청자가 본 약관에 의하여 이전에 회원 자격을 상실한
                      적이 있는 경우
                    </li>
                    <li>
                      기타 회사가 정한 이용 신청 요건이 충족되지 않았을 경우
                    </li>
                  </ul>
                  3. 이용 계약은 회사의 회원 가입 승낙이 회원에게 도달한 시점에
                  성립합니다.
                </p>

                <h3>제5조 (서비스의 제공 및 변경)</h3>
                <p>
                  1. 회사는 회원에게 아래와 같은 서비스를 제공합니다.
                  <ul>
                    <li>개발자 매칭 서비스</li>
                    <li>프로젝트 관리 서비스</li>
                    <li>
                      기타 회사가 추가 개발하거나 다른 회사와의 제휴 계약 등을
                      통해 회원에게 제공하는 일체의 서비스
                    </li>
                  </ul>
                  2. 회사는 서비스의 내용을 변경할 수 있으며, 변경 내용은
                  회원에게 공지합니다.
                </p>

                <h3>제6조 (서비스 이용 요금)</h3>
                <p>
                  1. 회사가 제공하는 서비스는 기본적으로 무료입니다. 다만,
                  회사는 별도의 유료 서비스 및 유료 기능을 제공할 수 있으며,
                  이에 대한 요금 정책은 별도로 공지합니다. 2. 회원이 유료
                  서비스를 이용하는 경우, 회사가 정한 요금을 지불해야 합니다.
                </p>

                <h3>제7조 (회원의 의무)</h3>
                <p>
                  1. 회원은 본 약관 및 회사의 공지사항, 서비스 이용 안내 등
                  회사가 통지하는 사항을 준수하여야 하며, 기타 회사의 업무에
                  방해되는 행위를 하여서는 안 됩니다. 2. 회원은 다음 각 호의
                  행위를 하여서는 안 됩니다.
                  <ul>
                    <li>
                      서비스 이용 신청 또는 변경 시 허위 내용을 등록하는 행위
                    </li>
                    <li>타인의 정보를 도용하는 행위</li>
                    <li>회사가 게시한 정보를 변경하는 행위</li>
                    <li>
                      회사 기타 제3자의 저작권 등 지적 재산권을 침해하는 행위
                    </li>
                    <li>
                      회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
                    </li>
                    <li>
                      외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에
                      반하는 정보를 서비스에 공개 또는 게시하는 행위
                    </li>
                  </ul>
                </p>

                <h3>제8조 (개인정보 보호)</h3>
                <p>
                  1. 회사는 회원의 개인정보를 보호하기 위해 관련 법령을
                  준수합니다. 2. 회사는 회원의 개인정보를 수집, 이용, 제공하는
                  경우 관련 법령에 따라 회원의 동의를 받습니다.
                </p>

                <h3>제9조 (계약 해지 및 서비스 이용 제한)</h3>
                <p>
                  1. 회원이 서비스 이용 계약을 해지하고자 하는 때에는 언제든지
                  회원 탈퇴를 할 수 있습니다. 2. 회사는 회원이 본 약관의 의무를
                  위반하거나 서비스의 정상적인 운영을 방해한 경우, 사전 통지
                  없이 계약을 해지하거나 서비스 이용을 제한할 수 있습니다.
                </p>

                <h3>제10조 (손해배상)</h3>
                <p>
                  1. 회사는 무료로 제공하는 서비스와 관련하여 회원에게 발생한
                  어떠한 손해에 대해서도 책임을 지지 않습니다. 2. 회사는 유료
                  서비스의 경우, 회사의 고의 또는 중대한 과실로 인하여 발생한
                  손해에 대해서만 책임을 집니다.
                </p>

                <h3>제11조 (면책 조항)</h3>
                <p>
                  1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여
                  서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이
                  면제됩니다. 2. 회사는 회원의 귀책 사유로 인한 서비스 이용
                  장애에 대하여 책임을 지지 않습니다.
                </p>

                <h3>제12조 (분쟁 해결)</h3>
                <p>
                  1. 회사와 회원 간에 발생한 전자상거래 분쟁에 관한 소송은
                  서울중앙지방법원을 관할 법원으로 합니다. 2. 회사와 회원 간에
                  제기된 전자상거래 소송에는 대한민국 법을 적용합니다.
                </p>

                <h3>부칙</h3>
                <p>1. 본 약관은 2024년 7월 5일부터 적용됩니다.</p>

                {/* <Grayline />
              <Bubox>
                <Button onClick={close}>닫기</Button>
                
              </Bubox> */}
              </Terbox>
              <Button onClick={closeModal}>확인</Button>
            </TerCon>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default SecondPrivacyModal;
