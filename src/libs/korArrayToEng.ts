import { korToEngDictionary } from "./korToEngDictionary";

/**
 * 한글이 들어있는 배열을 영어로 바꿈 ㅁ -> a
 * @param korArray 분리된 한글이 들어있는 배열
 * @return 변경된 영어 문장
 */
const korArrayToEng = (korArray: string[]) => {
  // 한글 배열을 영어 배열로 변경
  // 만약, 딕셔너리에 값이 존재하지 않으면 한글 배열에 들어있던 값 그대로 사용
  const engArray = korArray.map(
    (korElement) => korToEngDictionary[korElement] ?? korElement
  );

  // 영어 배열을 공백없이 문자열로 이어붙임
  return engArray.join("");
};

export default korArrayToEng;
