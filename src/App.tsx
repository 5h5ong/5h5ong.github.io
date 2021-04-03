import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import PopupNotification from "./component/PopupNotification";
import useInput from "./hooks/useInput";
import copyToClipboard from "./libs/copyToClipboard";
import korArrayToEng from "./libs/korArrayToEng";
import separateKor from "./libs/separateKor";

function App() {
  const korInput = useInput();
  const [convertedText, setConvertedText] = useState("");
  // ripple effect 생성 제어
  const [isRippling, setIsRippling] = useState<boolean>(false);
  // notification 표시 제어
  const [displayNotification, setDisplayNotification] = useState<boolean>(
    false
  );
  // popup notification 표시 제어
  const [displayPopupNotification, setDisplayPopupNotification] = useState(
    false
  );
  // result div의 ref(ripple effect를 위해 사용됨)
  const resultDivRef = useRef<HTMLDivElement>(null);
  // result div 클릭 좌표 저장(ripple effect를 위해 사용됨)
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });

  // 입력된 한글 문장을 분리
  useEffect(() => {
    const converted = korArrayToEng(separateKor(korInput.value));
    setConvertedText(converted);
  }, [korInput.value]);
  // 인풋에 아무 것도 없다면 notification 표시 안함
  useEffect(() => {
    if (korInput.value) {
      setDisplayNotification(true);
    } else {
      setDisplayNotification(false);
    }
  }, [korInput.value]);
  // ripple effect 제어
  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => {
        setIsRippling(false);
      }, 1000);
    } else {
      setIsRippling(false);
    }
  }, [coords]);

  // 클릭 시 만들어진 영어 텍스트를 클립보드로 복사
  const engTextOnClick = () => {
    copyToClipboard(convertedText);

    // 복사됨을 알려주는 팝업 .5s 동안 띄움
    setDisplayPopupNotification(true);
    setTimeout(() => {
      setDisplayPopupNotification(false);
    }, 1000);
  };

  // result div의 좌표와 클릭된 좌표를 얻어 ripple effect가
  // 생길 부분을 계산
  const getCoords = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // result div의 좌표(좌측 상단)
    const rect =
      resultDivRef.current && resultDivRef.current.getBoundingClientRect();
    // ripple element가 표시될 좌표 계산
    if (rect) {
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div className="container">
      {displayPopupNotification && (
        <PopupNotification displayText="😎 복사됨!" />
      )}
      {/* input */}
      <div className="input-container">
        <input
          className="input"
          placeholder="변환할 문장을 입력해주세요."
          value={korInput.value}
          onChange={korInput.onChange}
        />
      </div>
      {/* text-result */}
      <div className="text-result-wrapper">
        <div
          className="text-result"
          ref={resultDivRef}
          onClick={(e) => {
            engTextOnClick();
            getCoords(e);
          }}
        >
          {isRippling && (
            <div
              className="test-dot"
              style={{
                // ripple effect의 원 반지름을 빼줘야 클릭된 위치에서 표시됨
                left: coords.x - 35,
                top: coords.y - 35,
              }}
            />
          )}
          {convertedText}
        </div>
        {/* notification */}
        {displayNotification && (
          <div className="notification">클릭해서 복사할 수 있어요!</div>
        )}
      </div>
    </div>
  );
}

export default App;
