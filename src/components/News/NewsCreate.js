import { Button, Form, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import { API_NEWS_STORE } from '../../config/endpointapi'
import { NEWS } from '../../config/path'
import PrivateLayout from '../../Layout/PrivateLayout'
import { postAxios } from '../../Http'

const NewsCreate = () => {
  const history = useHistory()

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  const onFinish = (values) => {
    postAxios(API_NEWS_STORE, values)
      .then(function (res) {
        history.push(NEWS)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Thêm tin tức</h2>
        <Form.Item
          {...formItemLayout}
          name="name"
          label="Tiêu đề tin tức"
          rules={[
            {
              required: true,
              message: 'Điền tiêu đề',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="image"
          label="Ảnh tiêu đề"
          rules={[
            {
              required: true,
              message: 'Nhập thông tin ảnh',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="description"
          label="Tóm tắt mô tả"
          rules={[
            {
              required: true,
              message: 'Nhập tóm tắt mô tả',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="detail"
          label="Nội dung chi tiết"
          rules={[
            {
              required: true,
              message: 'Nhập nội dung chi tiết',
            },
          ]}
        >
          <Input.TextArea rows={5} showCount maxLength={5000} />
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
export default NewsCreate
