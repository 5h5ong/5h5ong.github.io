import React from "react";
import "./PopupNotification.css";

interface PopupNotificationProps {
  displayText: string;
}

/**
 * 짠하고 나오는 안내
 * @param displayText 보여줄 텍스트
 */
const PopupNotification = ({ displayText }: PopupNotificationProps) => {
  return <div className="popup-notification">{displayText}</div>;
};

export default PopupNotification;
