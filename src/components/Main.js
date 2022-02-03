import React, { Component } from "react";
import {
  Layout,
  Menu,
  message,
  Row,
  Col,
  Dropdown,
  Button,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DownOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "../App.css";
import "antd/dist/antd.css";
import favicon from "../assets/favicon.png";
import Users from "../pages/Users";

const { Header, Sider, Content, Footer } = Layout;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      date: "",
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("DD-MM-YYYY") : "None"}`
    );
    this.setState({ date: value });
  };

  handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  render() {
    const menu = (
      <Menu
        onClick={(e) => {
          this.handleMenuClick(e);
        }}
      >
        <Menu.Item key="1" icon={<EditOutlined />}>
          Change Password
        </Menu.Item>
        <Menu.Item key="2" icon={<LogoutOutlined />}>
          Log Out
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img
              className={
                this.state.collapsed ? "small_logo_img" : "large_logo_img"
              }
              src={favicon}
            />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              All Users
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Free Users
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Paid Users
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
              <Col xs={12}>
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger_icon",
                    onClick: this.toggle,
                  }
                )}
              </Col>
              <Col xs={12} align="right" className="trigger_icon">
                <Dropdown overlay={menu}>
                  <Button>
                    Action <DownOutlined />
                  </Button>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content className="content-layout-background">
            <Users />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default Main;
