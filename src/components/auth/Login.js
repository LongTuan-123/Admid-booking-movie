/* eslint-disable jsx-a11y/alt-text */
import { Button, Form, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import { HOME } from '../../config/path'
import { API_LOGIN } from '../../config/endpointapi'
import Cookies from 'cookies-js'
import '../auth/Login.css'
import Logo from '../../asset/Logo-main.png'
import { postAxios } from '../../Http'

const Login = () => {
  const history = useHistory()

  const onFinish = (values) => {
    postAxios(API_LOGIN, values)
      .then(function (res) {
        if (res?.user?.role === 1) {
          Cookies.set('data', JSON.stringify(res.user))
          Cookies.set('token', res.access_token)
          history.push(HOME)
        } else {
          alert('Bạn không có quyền')
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <img src="https://previews.123rf.com/images/peshkov/peshkov1701/peshkov170100303/70042331-manager-managing-abstract-business-panel-on-digital-background-finance-concept.jpg"></img>
      <div className="login-container">
        <img className="login-logo" src={Logo}></img>
        <h2>Admin Đăng nhập</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
            <div className="form-input">
              <Input />
            </div>
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <div className="form-input">
              <Input.Password />
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="login-btn">
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
