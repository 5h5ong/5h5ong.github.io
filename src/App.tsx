import React, { useEffect, useState } from "react";
import "./App.css";
import useInput from "./hooks/useInput";
import copyToClipboard from "./libs/copyToClipboard";
import korArrayToEng from "./libs/korArrayToEng";
import separateKor from "./libs/separateKor";

function App() {
  const korInput = useInput();
  const [convertedText, setConvertedText] = useState("");

  // 입력된 한글 문장을 분리
  useEffect(() => {
    const converted = korArrayToEng(separateKor(korInput.value));
    setConvertedText(converted);
  }, [korInput.value]);

  // 클릭 시 만들어진 영어 텍스트를 클립보드로 복사
  const engTextOnClick = () => {
    copyToClipboard(convertedText);
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
      <div className="text-result" onClick={() => engTextOnClick()}>
        {convertedText}
      </div>
    </div>
  );
}

export default App;
