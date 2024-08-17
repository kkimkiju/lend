import { useState } from "react";
import styled from "styled-components";

export const Toggle = ({ switchState, setSwitchState }) => {
  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setSwitchState(!switchState);
  };

  return (
    <Body>
      <ToggleContainer
        // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
        onClick={toggleHandler}
      >
        {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
        {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
        <div
          className={`toggle-container ${
            switchState ? "toggle--checked" : null
          }`}
        />
        <div
          className={`toggle-circle ${switchState ? "toggle--checked" : null}`}
        />
      </ToggleContainer>
      {/* Desc 컴포넌트를 활용*/}
      {/* Toggle Switch가 ON인 상태일 경우에 Desc 컴포넌트 내부의 텍스트를 'Toggle Switch ON'으로, 그렇지 않은 경우 'Toggle Switch OFF'. 조건부 렌더링을 활용. */}
      {switchState === false ? (
        <Desc>
          <div className="OFF">공개글</div>
        </Desc>
      ) : (
        <Desc>
          <div className="ON"></div>비밀글
        </Desc>
      )}
    </Body>
  );
};
const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;
const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 30px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
  }
  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0, 200, 102);

    transition: 1s;
  }
  > .toggle-circle {
    position: absolute;
    top: 4px;
    left: 5px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  }
  > .toggle--checked {
    left: 23px;
    transition: 0.5s;
  }
`;
const Desc = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px; // 필요에 따라 너비를 조정합니다.
  height: 35px; // 필요에 따라 높이를 조정합니다.

  .OFF,
  .ON {
    position: absolute;
  }

  .OFF {
    visibility: ${(props) => (props.switchState ? "hidden" : "visible")};
  }

  .ON {
    visibility: ${(props) => (props.switchState ? "visible" : "hidden")};
  }
`;
