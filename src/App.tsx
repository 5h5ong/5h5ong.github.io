import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import useInput from "./hooks/useInput";
import copyToClipboard from "./libs/copyToClipboard";
import korArrayToEng from "./libs/korArrayToEng";
import separateKor from "./libs/separateKor";

function App() {
  const korInput = useInput();
  const [convertedText, setConvertedText] = useState("");
  // result div의 ref(ripple effect를 위해 사용됨)
  const resultDivRef = useRef<HTMLDivElement>(null);
  // result div 클릭 좌표 저장(ripple effect를 위해 사용됨)
  const [coords, setCoords] = useState<{ x: number; y: number }>();

  // 입력된 한글 문장을 분리
  useEffect(() => {
    const converted = korArrayToEng(separateKor(korInput.value));
    setConvertedText(converted);
  }, [korInput.value]);

  // 클릭 시 만들어진 영어 텍스트를 클립보드로 복사
  const engTextOnClick = () => {
    copyToClipboard(convertedText);
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
      <div className="input-container">
        <input
          className="input"
          placeholder="변환할 문장을 입력해주세요."
          value={korInput.value}
          onChange={korInput.onChange}
        />
      </div>
      <div
        className="text-result"
        ref={resultDivRef}
        onClick={(e) => {
          engTextOnClick();
          getCoords(e);
        }}
      >
        {coords && coords.x && (
          <div
            className="test-dot"
            style={{
              left: coords.x - 50,
              top: coords.y - 50,
            }}
          />
        )}

        {convertedText}
      </div>
      <div>
        <div>click coords</div>
        <div>{coords?.x}</div>
        <div>{coords?.y}</div>
      </div>
    </div>
  );
}

export default App;
