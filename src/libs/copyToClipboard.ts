/**
 *  텍스트를 클립보드로 복사함
 * @param textToCopy 클립보드로 복사될 텍스트
 */
const copyToClipboard = (textToCopy: string) => {
  navigator.clipboard.writeText(textToCopy);
};

export default copyToClipboard;
