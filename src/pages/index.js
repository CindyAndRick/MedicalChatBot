import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  setHistory,
  createConversation,
  setConversationId,
  setAllConversations,
  getAllConversations,
  getHistoryMessages,
} from "../redux/actionCreator/ChatDataCreator";
import {
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import MRouter from "../router/MRouter";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Index = (props) => {
  // const [collapsed, setCollapsed] = useState(false);
  // const {
  //     token: { colorBgContainer },
  // } = theme.useToken();

  const {
    userInfo,
    conversationId,
    allConversations,
    setHistory,
    createConversation,
    setConversationId,
    setAllConversations,
    getAllConversations,
    getHistoryMessages,
  } = props;

  useEffect(() => {
    getAllConversations(userInfo.user_id).then((res) => {
      console.log(res);
      setAllConversations(res.payload);
    });
  }, [conversationId]);

  const items = useMemo(
    () => [
      // getItem('AQI地图', 'map', <PieChartOutlined />),
      // getItem('AQI数据', 'data', <DesktopOutlined />),
      getItem("用户", "center", <UserOutlined />),
      getItem("新的聊天", "chat", <DesktopOutlined />),
      getItem(
        "历史记录",
        "history",
        <CloudOutlined />,
        allConversations.map((item) => {
          return getItem(item.conversation_name, item.conversation_id);
        })
      ),
    ],
    [allConversations, conversationId]
  );

  const navigate = useNavigate();

  const onMenuClick = (e) => {
    console.log(e);
    if (e.key === "chat") {
      createConversation(userInfo.user_id).then((res) => {
        setConversationId(res.payload.conversation_id);
        getHistoryMessages(res.payload.conversation_id).then((res) => {
          setHistory(res.payload);
          navigate("/chat");
        });
      });
    } else if (e.keyPath.at(-1) === "history") {
      setConversationId(e.key);
      getHistoryMessages(e.key).then((res) => {
        setHistory(res.payload);
        navigate("/chat");
      });
    } else {
      navigate("/" + e.key);
    }
  };

  return (
    <Layout hasSider>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <Menu
            theme="dark"
            defaultSelectedKeys={["map"]}
            mode="inline"
            items={items}
            onClick={(e) => {
              onMenuClick(e);
            }}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: "200px", height: "100vh" }}
        >
          <MRouter />
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserDataReducer.userInfo,
    conversationId: state.ChatDataReducer.conversationId,
    allConversations: state.ChatDataReducer.allConversations,
  };
};

const mapDispatchToProps = {
  setHistory,
  createConversation,
  setConversationId,
  setAllConversations,
  getAllConversations,
  getHistoryMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
