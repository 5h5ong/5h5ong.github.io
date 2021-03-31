import React, { useEffect, useState } from "react";
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
    <div>
      <input
        placeholder="변환할 문장을 입력해주세요."
        value={korInput.value}
        onChange={korInput.onChange}
      />
      <div>{convertedText}</div>
    </div>
  );
}

export default App;
