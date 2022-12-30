import PrivateLayout from '../../Layout/PrivateLayout'
import { Form, Button, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NEWS } from '../../config/path'
import { useParams } from 'react-router-dom'
import { bindParam } from '../../config/function'
import { API_NEWS_DETAIL, API_NEWS_UPDATE } from '../../config/endpointapi'
import { getAxios, postAxios } from '../../Http'

const NewsUpdate = () => {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [form] = Form.useForm()
  const history = useHistory()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.name,
        image: data?.image,
        detail: data?.detail,
        description: data?.description,
      })
    }
  }, [data, form])

  useEffect(() => {
    const getData = async () => {
      await getAxios(bindParam(API_NEWS_DETAIL, { id }))
        .then((res) => {
          setData(res?.data?.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    getData()
  }, [id])

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  const onFinish = (values) => {
    if (id) {
      values.id = Number(id)
    }

    postAxios(API_NEWS_UPDATE, values)
      .then(function (res) {
        history.push(NEWS)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  console.log(data)
  return (
    <PrivateLayout>
      <Form name="validate_other" initialValues={data} {...formItemLayout} form={form} onFinish={onFinish}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Sửa tin tức</h2>
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
export default NewsUpdate
