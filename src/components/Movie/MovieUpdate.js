import PrivateLayout from '../../Layout/PrivateLayout'
import { Form, Select, InputNumber, Button, Input, DatePicker } from 'antd'
import axios from 'axios'
import { API_MOVIE_DETAIL, API_MOVIE_UPDATE } from '../../config/endpointapi'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { MOVIE } from '../../config/path'
import { useParams } from 'react-router-dom'
import { bindParam } from '../../config/function'
import { getAxios, getToken } from '../../Http'

const { Option } = Select

const MovieUpdate = () => {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [form] = Form.useForm()
  const [defaultValue, setDefaultValue] = useState({})
  const history = useHistory()

  const getData = async () => {
    await getAxios(bindParam(API_MOVIE_DETAIL, { id }))
      .then((res) => {
        setData(res?.data?.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.name,
        range_of_movie: data?.range_of_movie,
        start_date: moment(data?.start_date),
        dimension: data?.dimension,
        type_of_movie: data?.type_of_movie?.split(','),
        range_age: data?.range_age,
        actor: data?.actor,
        direct: data?.director,
        description: data?.description,
        poster: data?.poster,
        trailer: data?.trailer,
      })
    }
  }, [data, form])

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
    getData()
  }, [])

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  const onFinish = (values) => {
    const { type_of_movie, start_date } = values

    if (id) {
      values.id = Number(id)
    }
    if (type_of_movie) {
      values.type_of_movie = type_of_movie.toString()
    }
    if (start_date) {
      values.start_date = moment(start_date).format('YYYY-MM-DD')
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
    axios
      .post(API_MOVIE_UPDATE, values)
      .then(function (res) {
        history.push(MOVIE)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  console.log(data)
  return (
    <PrivateLayout>
      <Form name="validate_other" initialValues={data} {...formItemLayout} form={form} onFinish={onFinish}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>sửa phim</h2>

        <Form.Item
          {...formItemLayout}
          name="name"
          label="Tên phim"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Input placeholder="Nhập tên bộ phim" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="range_of_movie"
          label="Thời lượng"
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
          label="Thời gian khởi chiếu"
          rules={[
            {
              required: true,
              message: 'Nhập thời gian khởi chiếu',
            },
          ]}
        >
          <DatePicker style={{ width: '70%' }} />
        </Form.Item>
        <Form.Item
          name="dimension"
          label="Loại phim"
          hasFeedback
          rules={[{ required: true, message: 'Nhập loại phim' }]}
        >
          <Select placeholder="Loại phim">
            <Option value="2D">2D</Option>
            <Option value="3D">3D</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="type_of_movie"
          label="Thể loại"
          rules={[
            {
              required: true,
              message: 'Nhập thể loại phim',
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
          </Select>
        </Form.Item>

        <Form.Item label="Giới hạn tuổi">
          <Form.Item name="range_age" noStyle>
            <InputNumber min={0} max={21} />
          </Form.Item>
          <span className="ant-form-text"> tuổi</span>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="actor"
          label="Diễn viên"
          rules={[
            {
              required: true,
              message: 'Nhập tên diễn viên',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="direct"
          label="Đạo diễn"
          rules={[
            {
              required: true,
              message: 'PNhập tên đạo diễn',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Nhập mô tả' }]}>
          <Input.TextArea rows={5} showCount maxLength={1000} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="poster"
          label="Poster"
          rules={[
            {
              required: true,
              message: 'Nhập ảnh',
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
              message: 'Nhập link trailer',
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
export default MovieUpdate
