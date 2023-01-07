import PrivateLayout from '../../Layout/PrivateLayout'
import { Form, Select, Button, Input } from 'antd'
import { API_ROOM_SELECT, API_SEAT_CREATE } from '../../config/endpointapi'
import { useEffect, useState } from 'react'
import Cookies from 'cookies-js'
import { useHistory } from 'react-router-dom'
import { SEAT } from '../../config/path'
import { getAxios, postAxios } from '../../Http'
const { Option } = Select

const SeatCreate = () => {
  const [token] = useState(Cookies?.get('token'))
  const [movieSelect, setMovieSelect] = useState([])
  const history = useHistory()

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  useEffect(() => {
    const getMovieSelect = async () => {
      await getAxios(API_ROOM_SELECT)
        .then((res) => {
          setMovieSelect(res?.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    getMovieSelect()
  }, [token])

  const onFinish = (values) => {
    postAxios(API_SEAT_CREATE, values)
      .then(function (res) {
        history.push(SEAT)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Thêm ghế</h2>

        <Form.Item
          {...formItemLayout}
          name="row"
          label="Hàng"
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
          label="Số lượng cột trong hàng"
          rules={[
            {
              required: true,
              message: 'Nhập số lượng cột trong hàng',
            },
          ]}
        >
          <Input type={'number'} />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="money"
          label="Số tiền"
          rules={[
            {
              required: true,
              message: 'Nhập số tiền',
            },
          ]}
        >
          <Input type={'number'} />
        </Form.Item>
        <Form.Item
          name="type_seat"
          label="Loại ghế"
          rules={[
            {
              required: true,
              message: 'Nhập thể loại ghế',
            },
          ]}
        >
          <Select placeholder="Vui lòng chọn loại ghế">
            <Option value="1">Ghế vip</Option>
            <Option value="3">Ghế thường</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="room_id"
          label="Phòng chiếu"
          rules={[
            {
              required: true,
              message: 'Nhập phòng chiếu',
            },
          ]}
        >
          <Select placeholder="Please select movie">
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

export default SeatCreate
