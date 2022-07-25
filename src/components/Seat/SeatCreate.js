import PrivateLayout from '../../Layout/PrivateLayout'
import { Form, Select,  Button, Input } from 'antd'
import { API_SEAT_CREATE } from '../../config/endpointapi'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { SEAT } from '../../config/path'
import QueryString from 'qs'
import { useQueryClient } from 'react-query'
import useRoomQuery from '../../hooks/useRoomQuery'
import moment from 'moment'
import { postAxios } from '../../Http'

const { Option } = Select

const SeatCreate = () => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }
  const history = useHistory()
  const queryClient = useQueryClient()
  const location = useLocation()
  const id_room = location.pathname.split('/')[4]
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)

  const { data: room } = useRoomQuery([limit, keyword, page])
  console.log(room?.data?.data)
  const roomList = room?.data?.data.map((rooms) => {
    return rooms
  })
  const onCreateSeat = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

    postAxios(API_SEAT_CREATE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['room'])
          setTimeout(() => {
            history.push(SEAT)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onCreateSeat}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Add seat</h2>

        <Form.Item
          {...formItemLayout}
          name="row"
          label="Row"
          rules={[
            {
              required: true,
              message: 'Please input your row',
            },
          ]}
        >
          <Select placeholder="Hàng">
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
            <Option value="D">D</Option>
            <Option value="E">E</Option>
            <Option value="F">F</Option>
            <Option value="G">G</Option>
            <Option value="H">H</Option>
            <Option value="I">I</Option>
            <Option value="J">J</Option>
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="num_order"
          label="Number of seats in row"
          rules={[
            {
              required: true,
              message: 'Input the number of seats in row',
            },
          ]}
        >
          <Input type={'number'} />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="money"
          label="Price of seat"
          rules={[
            {
              required: true,
              message: 'Input the price',
            },
          ]}
        >
          <Input type={'number'} />
        </Form.Item>
        <Form.Item
          name="type_seat"
          label="Type of seat"
          rules={[
            {
              required: true,
              message: 'Input the type of seat',
            },
          ]}
        >
          <Select placeholder="Vui lòng chọn loại ghế">
            <Option value="1">Vip seat</Option>
            <Option value="3">Normal seat</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="room_id"
          label="Phòng chiếu"
          rules={[
            {
              required: true,
              message: 'Input the room',
            },
          ]}
        >
          <Select placeholder="Please select room">
            {roomList?.map((r) => {
              return <Option value={r?.id}>{r?.name}</Option>
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

export default SeatCreate
