import "antd/dist/antd.css";
import React from "react";
import "../style/Layout.css";
import { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdStarHalf } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { BiMovie } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ADVERTISEMENT, LOGIN, MOVIE, MOVIE_MODIFY, USER } from "../config/path";
import Logo from "../asset/Logo-main.png";
import axios from "axios";
import { API_LOGOUT } from "../config/endpointapi";
import { useHistory } from "react-router-dom";

const PrivateLayout = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const history = useHistory();
  const [slidebar, setSlidebar] = useState(false);
  const onCollapsed = () => {
    setSlidebar(!slidebar);
  };

  const onLogout = async () => {
    await axios
      .post(API_LOGOUT)
      .then((res) => {
        alert(res?.data?.message);
        history.push(LOGIN);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="layout">
      <Layout style={{ minHeight: "100vh", textAlign: "center" }}>
        <Sider collapsible onCollapse={slidebar}>
          <div className="logo">
            <img style={{ width: "100%" }} className="img" src={Logo} />
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<AiOutlineHome />}>
              Trang chủ
            </Menu.Item>
            <Menu.Item key="2" icon={<IoMdStarHalf />}>
              Đánh giá
            </Menu.Item>
            <Menu.Item key="3" icon={<BiMovie />}>
              <Link to={MOVIE}>Phim</Link>{" "}
            </Menu.Item>
            <Menu.Item key="4" icon={<IoMdStarHalf />}>
              <Link to={ADVERTISEMENT}>

              Quảng cáo
              </Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
              <Link to={USER}>Người dùng</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 10 }}>
            <div style={{ float: "right", fontSize: 24 }} onClick={onLogout}>
              Thoát
              <MdLogout style={{ padding: 0 }} />
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export default PrivateLayout;
