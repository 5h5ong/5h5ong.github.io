import React, { useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const onChange = (
    // textarea도 같이 처리해주기 위해서 "React.ChangeEvent<HTMLTextAreaElement>" 부분을 추가함
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };
  return { value, onChange, setValue };
};

export type useInputReturnType = ReturnType<typeof useInput>;
export default useInput;
