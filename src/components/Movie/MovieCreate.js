import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import PrivateLayout from '../../Layout/PrivateLayout'
import { API_MOVIE_STORE } from '../../config/endpointapi'
import { MOVIE } from '../../config/path'
import { useHistory } from 'react-router-dom'
import { postAxios } from '../../Http'
import { useQueryClient } from 'react-query'
import moment from 'moment'
import { Option } from 'antd/lib/mentions'


const MovieCreate = () => {
  const history = useHistory()
  const queryClient = useQueryClient()

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }
  const onCreateMovie = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

    postAxios(API_MOVIE_STORE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['movie'])
          // toast.success(res?.message)
          setTimeout(() => {
            history.push(MOVIE)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onCreateMovie}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Add movie</h2>

        <Form.Item
          {...formItemLayout}
          name="name"
          label="Name of movie"
          rules={[
            {
              required: true,
              message: 'Please input the name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="range_of_movie"
          label="Range of movie"
          rules={[
            {
              required: true,
              message: 'Nhập thời lượng phim',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="start_date"
          label="Start date"
          rules={[
            {
              required: true,
              message: 'Please input the start date',
            },
          ]}
        >
          <DatePicker style={{ width: '70%' }} />
        </Form.Item>
        <Form.Item
          name="dimension"
          label="Dimension"
          hasFeedback
          rules={[{ required: true, message: 'Please input the dimension of movie' }]}
        >
          <Select placeholder="Dimension">
            <Option value="2D">2D</Option>
            <Option value="3D">3D</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="type_of_movie"
          label="Type of movie"
          rules={[
            {
              required: true,
              message: 'Please input the type of movie',
              type: 'array',
            },
          ]}
        >
          <Select mode="multiple" placeholder="Please select favourite colors">
            <Option value="Kinh dị">Kinh dị</Option>
            <Option value="Hành động">Hành động</Option>
            <Option value="Hài hước">Hài hước</Option>
            <Option value="Hoạt hình">Hoạt hình</Option>
            <Option value="Trinh thám">Trinh thám</Option>
            <Option value="Phiêu lưu">Phiêu lưu</Option>
            <Option value="Thần thoại">Thần thoại</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Age">
          <Form.Item name="range_age" noStyle>
            <InputNumber min={0} max={21} />
          </Form.Item>
          <span className="ant-form-text"> age</span>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="actor"
          label="Actor"
          rules={[
            {
              required: true,
              message: 'Please input the name of actor',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="direct"
          label="Director"
          rules={[
            {
              required: true,
              message: 'Please input the name of director',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Nhập mô tả' }]}>
          <Input.TextArea rows={5} showCount maxLength={1000} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="poster"
          label="Poster"
          rules={[
            {
              required: true,
              message: 'Please input the poster',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="trailer"
          label="Trailer"
          rules={[
            {
              required: true,
              message: 'Please input the trailer',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </PrivateLayout>
  )
}
export default MovieCreate
