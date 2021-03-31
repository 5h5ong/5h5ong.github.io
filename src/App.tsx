import React from "react";
import useInput from "./hooks/useInput";

function App() {
  const korInput = useInput();
  return (
    <div>
      <input
        placeholder="변환할 문장을 입력해주세요."
        value={korInput.value}
        onChange={korInput.onChange}
      />
      <div>{korInput.value}</div>
    </div>
  );
}

export default App;
