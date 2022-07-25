import { Popover, Col, Row, Table, notification } from 'antd'
import { useState } from 'react'
import { API_ROOM_DELETE } from '../../config/endpointapi'
import { ROOM, ROOM_CREATE } from '../../config/path'
import PrivateLayout from '../../Layout/PrivateLayout'
import '../../style/Room.css'
import { bindParam } from '../../config/function'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { postAxios } from '../../Http'
import QueryString from 'qs'
import { toast } from 'react-toastify'
import Search from 'antd/lib/transfer/search'
import useRoomQuery from '../../hooks/useRoomQuery'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { SmileOutlined } from '@ant-design/icons'

const Room = () => {
  const location = useLocation()
  const history = useHistory()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenPopover, setIsPopover] = useState(false)
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [idDelete, setIdDelete] = useState(0)
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)
  const { data: room, isError, isLoading, isFetching } = useRoomQuery([limit, keyword, page])
  const data = room?.data?.data || []
  const onChangePage = (page, limit) => {
    let params = { page, limit }
    history.push({
      pathname: ROOM,
      search: QueryString.stringify(params),
    })
  }
  const onDelete = (id) => {
    postAxios(bindParam(API_ROOM_DELETE, { id }))
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['room'])
          notification.open({
            message: 'Delete Successed',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          })
        }
      })
      .catch((err) => {
        toast.error(err?.message)
      })
      .finally(() => {
        setIsOpen(false)
      })
  }
  const columns = [
    { title: "ID room", dataIndex: "id" },
    { title: "Room name", dataIndex: "name" },
    { title: "Nuber of seat", dataIndex: "number_seat" },
    {
      title: '',
      dataIndex: '',
      width: '5%',
      key: 'action',
      render: ({ id }) => {
        const content = (
          <div className="room-popover">
            <div className="room-popover__content" onClick={() => onOpenModal(id)}>
              <AiFillDelete />
              <div onClick={() => onDelete(id)}>Delete</div>
            </div>
          </div>
        )

        return (
          <Popover placement="bottom" content={content} trigger="click">
            <BsThreeDots className="room-three__dot" />
          </Popover>
        )
      },
    },
  ];
  const onSearch = (room) => {
    let params = { page, limit, keyword: room }

    history.push({
      pathname: ROOM,
      search: QueryString.stringify(params),
    })
  }
  const onOpenModal = (id) => {
    setIdDelete(id)
    setIsPopover(true)
    setIsOpen(true)
  }

  const onCloseModal = () => {
    setIsOpen(false)
  }
  return (
    <PrivateLayout>
    <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Table Rooms</h2>
    <Row>
      <Col span={20}>
        <div className="room-search">
          <Search
            loading={isFetching}
            defaultadvertise={keyword}
            onSearch={onSearch}
            className="room-content-search__input"
          />
        </div>
      </Col>
      <Col span={4}>
        <div className="room-add__btn">
          <Link to={ROOM_CREATE}>Add room</Link>
        </div>
      </Col>
    </Row>

    <Table
      dataSource={data}
      columns={columns}
      scroll={{
        x: 1100,
      }}
      key="advertise"
      loading={isLoading}
      pagination={{
        onChange: onChangePage,
        total: room?.total,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 30],
        current: room?.current_page,
        pageSize: room?.per_page,
      }}
    />
  </PrivateLayout>
  );
};
export default Room;
