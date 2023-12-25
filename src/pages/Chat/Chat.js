import React from "react";
import { useNavigate } from "react-router-dom";
import {
  setToken,
  setIsLogin,
  setUserInfo,
} from "../../redux/actionCreator/UserDataCreator";
import { getFavourCity } from "../../redux/actionCreator/CityDataCreator";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { UserAPI } from "../../utils/api.js";
import { Form, Button, Input, Checkbox, message, Layout, theme } from "antd";
const { Header, Content, Footer } = Layout;

function Chat(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let { setIsLogin, setToken, setUserInfo, getFavourCity } = props;

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleToRegister = () => {
    navigate(`/register`);
  };

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
          <div></div>
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
    token: state.UserDataReducer.token,
    isLogin: state.UserDataReducer.isLogin,
  };
};

const mapDispatchToProps = {
  setToken,
  setIsLogin,
  setUserInfo,
  getFavourCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
