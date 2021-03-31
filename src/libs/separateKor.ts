import * as Hangul from "hangul-js";

/**
 * 한글 문장을 하나씩 때어 배열로 반환함
 * @param originalKor 입력된 한글 문장
 * @returns 배열로 분리된 한글 문장
 */
const separateKor = (originalKor: string) => {
  const separatedKorArray = Hangul.disassemble(originalKor);
  return separatedKorArray;
};

export default separateKor;
