import React, { useEffect } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import { useNavigate } from "react-router-dom";
import "@chatui/core/es/styles/index.less";
import "@chatui/core/dist/index.css";
import {
  getHistoryMessages,
  sendMessage,
  checkResponse,
  appendMessage,
  setHistory,
  createConversation,
} from "../../redux/actionCreator/ChatDataCreator";
import { connect } from "react-redux";

const convertHisToMsg = (history) => {
  if (history.length === 0) {
    return [];
  }
  return history.map((item) => {
    if (item.sender === "bot") {
      return {
        type: item.type ? item.type : "text",
        content: { text: item.message_text },
        user: {
          avatar: "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg",
        },
      };
    } else {
      // user
      return {
        type: item.type ? item.type : "text",
        content: { text: item.message_text },
        position: "right",
      };
    }
  });
};

function ChatComponent(props) {
  const {
    userInfo,
    history,
    conversationId,
    getHistoryMessages,
    sendMessage,
    checkResponse,
    appendMessage,
    setHistory,
  } = props;

  console.log(props);

  const navigate = useNavigate();

  const handleToCenter = () => {
    navigate(`/center`);
  };

  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(
    convertHisToMsg(history)
  );

  useEffect(() => {
    if (conversationId === undefined) {
      handleToCenter();
    }
  }, [conversationId]);

  // 发送回调
  function handleSend(type, val) {
    console.log(type, val);
    if (type === "text" && val.trim()) {
      // 发送请求
      sendMessage(val, conversationId).then((res) => {
        appendMsg({
          type: "text",
          content: { text: val },
          position: "right",
        });
        setTyping(true);
        // 回复
        const interval = setInterval(() => {
          checkResponse(res.request_id, conversationId).then((res) => {
            if (res.response) {
              appendMsg({
                type: "text",
                content: { text: res.response },
                user: {
                  avatar:
                    "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg",
                },
              });
              setTyping(false);
              clearInterval(interval);
            }
          });
        }, 1000);
      });
    }
  }

  function renderMessageContent(msg) {
    console.log(msg);
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      navbar={{ title: "智能医生" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserDataReducer.userInfo,
    history: state.ChatDataReducer.history,
    conversationId: state.ChatDataReducer.conversationId,
  };
};

const mapDispatchToProps = {
  getHistoryMessages,
  sendMessage,
  checkResponse,
  appendMessage,
  setHistory,
  createConversation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);
