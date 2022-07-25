
import PrivateLayout from '../../Layout/PrivateLayout'
import { Form, Select,  Button,  DatePicker, TimePicker } from 'antd'
import { API_SHOWTIME_CREATE } from '../../config/endpointapi'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { SEAT, SHOWTIME } from '../../config/path'
import QueryString from 'qs'
import { useQueryClient } from 'react-query'
import useRoomQuery from '../../hooks/useRoomQuery'
import useMovieQuery from '../../hooks/useMovieQuery'

import moment from 'moment'
import { postAxios } from '../../Http'

const { Option } = Select

const ShowTimeCreate = () => {
  const history = useHistory()
  const queryClient = useQueryClient()
  const location = useLocation()
  const id_room = location.pathname.split('/')[4]
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }
  const { data: movie } = useMovieQuery([limit, keyword, page])
  console.log(movie?.data?.data)
  const movieSelect = movie?.data?.data.map((movies) => {
    return movies
  })
  const { data: room } = useRoomQuery([limit, keyword, page])
  console.log(room?.data?.data)
  const roomSelect = room?.data?.data.map((rooms) => {
    return rooms
  })
  const onCreateShowtime = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm')

    postAxios(API_SHOWTIME_CREATE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['room'])
          setTimeout(() => {
            history.push(SHOWTIME)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onCreateShowtime}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Add showtime</h2>

        <Form.Item
          {...formItemLayout}
          name="show_date"
          label="Start date"
          rules={[
            {
              required: true,
              message: 'Input the start date'
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="show_time"
          label="Showtime"
          rules={[
            {
              required: true,
              message: 'Input the showtime',
            },
          ]}
        >
          <TimePicker format={'HH:mm'} minuteStep={15} />
        </Form.Item>

         <Form.Item
          name="room_id"
          label="Room"
          rules={[
            {
              required: true,
              message: 'Input the type of room',
            },
          ]}
        >
          <Select placeholder="Please select rooms">
            {roomSelect?.map((r) => {
              return <Option value={r?.id}>{r?.name}</Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="movie_id"
          label="Phim"
          rules={[
            {
              required: true,
              message: 'Input the name of movie',
            },
          ]}
        >
          <Select placeholder="Please select movies">
            {movieSelect?.map((m) => {
              return <Option value={m?.id}>{m?.name}</Option>
            })}
          </Select>
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

export default ShowTimeCreate
