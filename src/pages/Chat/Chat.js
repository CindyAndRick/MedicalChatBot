import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getHistoryMessages,
  sendMessage,
  checkResponse,
  appendMessage,
  setHistory,
} from "../../redux/actionCreator/ChatDataCreator";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { ChatAPI } from "../../utils/api.js";
import { message, Layout, theme } from "antd";
import ChatComponent from "./ChatComponent";

const { Header, Content, Footer } = Layout;

function Chat(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let {
    isLogin,
    token,
    userInfo,
    history,
    conversationId,
    getHistoryMessages,
    sendMessage,
    checkResponse,
    appendMessage,
    setHistory,
  } = props;

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleToLogin = () => {
    navigate(`/login`);
  };

  useEffect(() => {
    if (!isLogin) {
      messageApi.error("请先登录");
      handleToLogin();
    }
  }, []);

  return (
    <Layout>
      {contextHolder}
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      />
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}
        >
          <ChatComponent></ChatComponent>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Medical Chatbot ©2023 Created by Rick
      </Footer>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserDataReducer.userInfo,
    token: state.UserDataReducer.token,
    isLogin: state.UserDataReducer.isLogin,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
