import heIcon from "../../../assets/images/project-detail-page-icons/he.png";
import profileImageIcon from "../../../assets/images/project-detail-page-icons/profile image.png";
import React, { useEffect, useRef } from "react";
import CommentImage from "./commentImage";
import { getCommentInfo, getInitials } from "../../../helper/siteHelper";

const ChatHistory = ({ chatHistory, projectId, props }) => {
  console.log("chat history", chatHistory);
  const scrollRef = useRef(null);

  let designCount = 0;
  var designsHash = new Map();

  const getDesignCount = (chat) => {
    if (getCommentInfo(chat).userType == "designer" && chat.revisions == "0") {
      designsHash.set(chat.id, designCount + 1);
      return ++designCount;
    } else if (
      getCommentInfo(chat).userType == "designer" &&
      chat.revisions != "0"
    ) {
      return designsHash.get(chat.parent_id);
    }
  };

  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, [chatHistory]);
  return (
    <>
      <div className="message_main">
        {chatHistory.map((chat, key) => {
          return (
            <div
              key={key}
              className={`message_single ${
                getCommentInfo(chat).userType == "client" ? "iSend" : "heSend"
              }`}
            >
              <div className="sender">
                {/* <img src={profileImageIcon} alt="" /> */}
                <p data-letters={getInitials(getCommentInfo(chat).name)} />
              </div>
              <div className="message_body">
                <div className="message_head">
                  <h3 className="senderName">{getCommentInfo(chat).name}</h3>
                  <p className="senderTime">{chat.created_datetime}</p>
                </div>
                {chat.comment && (
                  <p className="msgPara">
                    {chat.comment.split(/\r\n|\n|\r/gm).map((line, key) => {
                      return (
                        <React.Fragment key={key}>
                          {line}
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </p>
                )}
                {chat.image && (
                  <CommentImage
                    imageUrl={chat.image}
                    imageName={chat.file_name}
                    commentId={chat.id}
                    revisions={chat.revisions}
                    designCount={getDesignCount(chat)}
                    projectId={projectId}
                    userType={getCommentInfo(chat).userType}
                    props={props}
                  />
                )}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef}></div>
      </div>
    </>
  );
};

export default ChatHistory;
