import React, { useEffect, useState } from "react";
import "./App.css";
import useInput from "./hooks/useInput";
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
      <div className="text-result">{convertedText}</div>
    </div>
  );
}

export default App;
