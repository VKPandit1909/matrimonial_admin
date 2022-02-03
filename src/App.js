import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  withRouter,
} from "react-router-dom";
import {
  Breadcrumb,
  Layout,
  Menu,
  Row,
  Col,
  Dropdown,
  Button,
  message,
} from "antd";
import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import favicon from "./assets/favicon.png";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  DownOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Users from "./pages/Users";
import FreeUsers from "./pages/FreeUsers";
import PaidUsers from "./pages/PaidUsers";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import ChangeAddress from "./components/ChangeAddress";

const breadcrumbNameMap = {
  "/": "All Users",
  "/free-users": "Free Users",
  "/paid-users": "Paid Users",
  "/change-password": "Change Password",
};

const { Header, Sider, Content, Footer } = Layout;
const Home = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">All Users</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  const handleChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("DD-MM-YYYY") : "None"}`
    );
  };

  const handleMenuClick = (e) => {
    console.log("click", e);
    if (e.key == "3") {
      message.info("Signing out...");
      logOut();
    }
  };

  const [collapsed, setCollapsed] = useState(false);

  const logOut = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };
  const menu = (
    <Menu
      onClick={(e) => {
        handleMenuClick(e);
      }}
    >
      <Menu.Item key="1" icon={<EditOutlined />}>
        <Link to="/change-password">Change Password</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<EditOutlined />}>
        <Link to="/change-address">Change Address</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img
            className={collapsed ? "small_logo_img" : "large_logo_img"}
            src={favicon}
          />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">All Users</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserAddOutlined />}>
            <Link to="/free-users">Free Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserSwitchOutlined />}>
            <Link to="/paid-users">Paid Users</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col xs={12}>
              {collapsed ? (
                <MenuUnfoldOutlined
                  id="mob_trigger"
                  className="trigger_icon"
                  onClick={() => setCollapsed(!collapsed)}
                />
              ) : (
                <MenuFoldOutlined
                  className="trigger_icon"
                  onClick={() => setCollapsed(!collapsed)}
                />
              )}
            </Col>
            <Col xs={12} align="right" className="trigger_icon">
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button>
                  Action <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content className="content-layout-background">
          {/* <Breadcrumb>{breadcrumbItems}</Breadcrumb> */}
          <Switch>
            <Route path="/free-users" component={FreeUsers} />
            <Route path="/paid-users" component={PaidUsers} />
            <Route path="/change-password" component={ChangePassword} />
            <Route path="/change-address" component={ChangeAddress} />
            <Route path="/" component={Users} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          GANESHKONGUMATRIMONY ©2021 Created By VINVINCIBLES
        </Footer>
      </Layout>
    </Layout>
  );
});

const App = () => {
  const bool = window.localStorage.getItem("isLoggedIn");
  return <Router>{bool ? <Home /> : <Login />}</Router>;
};
export default App;
