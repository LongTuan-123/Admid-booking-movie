import PrivateLayout from '../../Layout/PrivateLayout'
import { Form, Select, Button, DatePicker, TimePicker } from 'antd'
import { API_MOVIE_SELECT, API_ROOM_SELECT, API_SHOWTIME_CREATE } from '../../config/endpointapi'
import { useEffect, useState } from 'react'
import Cookies from 'cookies-js'
import { useHistory } from 'react-router-dom'
import { SHOWTIME } from '../../config/path'
import moment from 'moment'
import { getAxios, postAxios } from '../../Http'

const { Option } = Select

const ShowTimeCreate = () => {
  const [token] = useState(Cookies?.get('token'))
  const [movieSelect, setMovieSelect] = useState([])
  const [roomSelect, setRoomSelect] = useState([])
  const history = useHistory()

  // const onChange = (e) => {
  //   console.log(e.target.value);
  // };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  useEffect(() => {
    const getMovieSelect = async () => {
      await getAxios(API_ROOM_SELECT)
        .then((res) => {
          setRoomSelect(res?.data?.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    getMovieSelect()
  }, [token])

  const onFinish = (values) => {
    const { show_date, show_time } = values

    if (show_date) {
      values.show_date = moment(show_date).format('YYYY-MM-DD')
    }

    if (show_time) {
      values.show_time = moment(show_time).format('HH:mm')
    }

    values.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    values.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')

    postAxios(API_SHOWTIME_CREATE, values)
      .then(function (res) {
        history.push(SHOWTIME)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  useEffect(() => {
    const getMovieSelect = async () => {
      await getAxios(API_MOVIE_SELECT)
        .then((res) => {
          setMovieSelect(res?.data?.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    getMovieSelect()
  }, [token])

  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Thêm suất chiếu</h2>

        <Form.Item
          {...formItemLayout}
          name="show_date"
          label="Thời gian khởi chiếu"
          rules={[
            {
              required: true,
              message: 'Nhập thời gian khởi chiếu',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="show_time"
          label="Thời gian khởi chiếu"
          rules={[
            {
              required: true,
              message: 'Nhập thời gian khởi chiếu',
            },
          ]}
        >
          <TimePicker format={'HH:mm'} minuteStep={15} />
        </Form.Item>

        <Form.Item
          name="room_id"
          label="Phòng"
          rules={[
            {
              required: true,
              message: 'Nhập phòng',
            },
          ]}
        >
          <Select placeholder="Please select rooms">
            {roomSelect?.map((movie) => {
              return <Option value={movie?.id}>{movie?.name}</Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="movie_id"
          label="Phim"
          rules={[
            {
              required: true,
              message: 'Nhập thể loại phim',
            },
          ]}
        >
          <Select placeholder="Please select movies">
            {movieSelect?.map((movie) => {
              return <Option value={movie?.id}>{movie?.name}</Option>
            })}
          </Select>
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

export default ShowTimeCreate
