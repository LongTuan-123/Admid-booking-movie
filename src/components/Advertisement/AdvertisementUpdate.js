import { Button, Form, Input } from 'antd'
import PrivateLayout from '../../Layout/PrivateLayout'
import { API_ADVERTISEMENT_UPDATE } from '../../config/endpointapi'
import { ADVERTISEMENT } from '../../config/path'
import { postAxios } from '../../Http'
import { useHistory } from 'react-router-dom'

const AdvertisementUpdate = () => {
  const history = useHistory()

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  const onFinish = (values) => {
    postAxios(API_ADVERTISEMENT_UPDATE, values)
    console
      .log(values)
      .then(function (res) {
        history.push(ADVERTISEMENT)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Thêm quảng cáo</h2>

        <Form.Item
          {...formItemLayout}
          name="name"
          label="Tên quảng cáo"
          rules={[
            {
              required: true,
              message: 'Điền tên quảng cáo',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="image"
          label="Ảnh"
          rules={[
            {
              required: true,
              message: 'Upload ảnh',
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
export default AdvertisementUpdate
