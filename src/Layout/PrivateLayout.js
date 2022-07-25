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
import { GiTicket } from 'react-icons/gi'
import { FaChair } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { ADVERTISEMENT, HOME, LOGIN, MOVIE, NEWS, ROOM, SEAT, SHOWTIME, TICKET, USER } from '../config/path'
import Logo from '../asset/Logo-main.png'
import axios from 'axios'
import Cookies from 'cookies-js'
import { API_LOGOUT } from '../config/endpointapi'
import { useHistory } from 'react-router-dom'

const PrivateLayout = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout
  const { SubMenu } = Menu
  const history = useHistory()
  const [slidebar, setSlidebar] = useState(false)
  const location = useLocation()
  console.log(location.pathname.split('/')[1])
  const onCollapsed = () => {
    setSlidebar(!slidebar)
  }

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
  const MENU_ITEM = [
    {
      href: HOME,
      pathname: '',
      icon: <AiOutlineHome />,
      name: 'Home',
    },
    {
      href: MOVIE,
      pathname: 'movies',
      icon: <BiMovie />,
      name: 'Movies',
    },
    {
      href: ADVERTISEMENT,
      pathname: 'advertisement',
      icon: <IoMdStarHalf />,
      name: 'Advertisements',
    },
    {
      href: USER,
      pathname: 'user',
      icon: <UserOutlined />,
      name: 'Users',
    },
    {
      href: ROOM,
      pathname: 'room',
      icon: <BsFillDoorOpenFill />,
      name: 'Rooms',
    },
    {
      href: SEAT,
      pathname: 'seat',
      icon: <FaChair />,
      name: 'Seats',
    },
    {
      href: NEWS,
      pathname: 'news',
      icon: <BsNewspaper />,
      name: 'News',
    },
    {
      href: SHOWTIME,
      pathname: 'showtime',
      icon: <BsFillCalendarWeekFill />,
      name: 'Showtimes',
    },
    {
      href: TICKET,
      pathname: 'ticket',
      icon: <GiTicket />,
      name: 'Tickets',
    },
  ]

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
          <Menu defaultSelectedKeys={location.pathname.split('/')[1]} theme="dark" mode="inline">
            {MENU_ITEM?.map((item) => {
              return (
                <Menu.Item className="" key={item.pathname} icon={item.icon}>
                  <Link to={item.pathname}>{item.name}</Link>
                </Menu.Item>
              )
            })}
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
          <Footer style={{ textAlign: 'center' }}>LongDT Cinema Created by Đặng Tuấn Long</Footer>
        </Layout>
      </Layout>
    </div>
  )
}
export default PrivateLayout
