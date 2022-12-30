import { Button, Form, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import { API_ROOM_STORE } from '../../config/endpointapi'
import { ROOM } from '../../config/path'
import PrivateLayout from '../../Layout/PrivateLayout'
import { postAxios } from '../../Http'

const RoomCreate = () => {
  const history = useHistory()

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  const onFinish = async (values) => {
    await postAxios(API_ROOM_STORE, values)
      .then(function (res) {
        history.push(ROOM)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Thêm phòng</h2>
        <Form.Item
          {...formItemLayout}
          name="name"
          label="Tên phòng"
          rules={[
            {
              required: true,
              message: 'Điền tên phòng',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="number_seat"
          label="Số lượng ghế"
          rules={[
            {
              required: true,
              message: 'Nhập số lượng ghế',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </PrivateLayout>
  )
}
export default RoomCreate
