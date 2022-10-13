/* eslint-disable jsx-a11y/alt-text */
import 'antd/dist/antd.css'
import React from 'react'
import '../style/Layout.css'
import { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { AiOutlineHome } from 'react-icons/ai'
import { IoMdStarHalf } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'
import { BiMovie } from 'react-icons/bi'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { BsFillCalendarWeekFill } from 'react-icons/bs'
import { BsNewspaper } from 'react-icons/bs'
import { FaChair } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ADVERTISEMENT, LOGIN, MOVIE, NEWS, ROOM, SEAT, SHOWTIME, TICKET, USER } from '../config/path'
import Logo from '../asset/Logo-main.png'
import axios from 'axios'
import Cookies from 'cookies-js'
import { API_LOGOUT } from '../config/endpointapi'
import { useHistory } from 'react-router-dom'

const PrivateLayout = ({ children }) => {
  const { Header, Content, Sider } = Layout
  const history = useHistory()
  const [slidebar] = useState(false)

  const onLogout = async () => {
    await axios
      .post(API_LOGOUT)
      .then((res) => {
        alert(res?.data?.message)
        Cookies.expire('token')
        Cookies.expire('data')
        history.push(LOGIN)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="layout">
      <Layout style={{ minHeight: '100vh', textAlign: 'center' }}>
        <Sider collapsible onCollapse={slidebar}>
          <div className="logo">
            <img
              style={{ width: '60%', margin: 'auto', paddingBottom: '50px', paddingTop: '30px' }}
              className="img"
              src={Logo}
            />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<AiOutlineHome />}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<BiMovie />}>
              <Link to={MOVIE}>Movie</Link>{' '}
            </Menu.Item>
            <Menu.Item key="3" icon={<IoMdStarHalf />}>
              <Link to={ADVERTISEMENT}>Advertisement</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to={USER}>User</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<BsFillDoorOpenFill />}>
              <Link to={ROOM}>Rooms</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<FaChair />}>
              <Link to={SEAT}>Seats</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<BsNewspaper />}>
              <Link to={NEWS}>News</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<BsFillCalendarWeekFill />}>
              <Link to={SHOWTIME}>Showtime</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<BsFillCalendarWeekFill />}>
              <Link to={TICKET}>Ticket</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 10 }}>
            <div style={{ float: 'right', fontSize: 24, cursor: 'pointer' }} onClick={onLogout}>
              Logout
              <MdLogout style={{ padding: 0 }} />
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
export default PrivateLayout
