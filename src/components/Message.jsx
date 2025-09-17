import React from "react";

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender}`}>
      <div className="text">{text}</div>
    </div>
  );
};



export default Message;


