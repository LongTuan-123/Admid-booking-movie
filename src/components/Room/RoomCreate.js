import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import PrivateLayout from '../../Layout/PrivateLayout'
import { API_ROOM_STORE } from '../../config/endpointapi'
import { ROOM } from '../../config/path'
import { useHistory, useLocation } from 'react-router-dom'
import { getToken, postAxios } from '../../Http'
import useRoomCreate from '../../hooks/useRoomCreate'
import QueryString from 'qs'
import { useQueryClient } from 'react-query'
import moment from 'moment'

const RoomCreate = () => {
  const history = useHistory()
  const queryClient = useQueryClient()

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const onCreateRoom = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

    postAxios(API_ROOM_STORE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['room'])
          // toast.success(res?.message)
          setTimeout(() => {
            history.push(ROOM)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onCreateRoom}>
        <h2 style={{ fontSize: "2rem", textTransform: "uppercase" }}>
          Add Room
        </h2>
        <Form.Item
          {...formItemLayout}
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Input the name of room",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="number_seat"
          label="Number of seats"
          rules={[
            {
              required: true,
              message: "Input the number of seats",
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
  );
};
export default RoomCreate;
