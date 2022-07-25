import { Popover, Col, Row, Table, notification } from 'antd'
import { useState } from 'react'
import { API_SEAT_DELETE } from '../../config/endpointapi'
import { SEAT, SEAT_CREATE } from '../../config/path'
import PrivateLayout from '../../Layout/PrivateLayout'
import '../../style/Seat.css'
import { bindParam } from '../../config/function'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { postAxios } from '../../Http'
import QueryString from 'qs'
import { toast } from 'react-toastify'
import Search from 'antd/lib/transfer/search'
import useSeatQuery from '../../hooks/useSeatQuery'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { SmileOutlined } from '@ant-design/icons'

const Seat = () => {
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

  const { data: seat, isError, isLoading, isFetching } = useSeatQuery([limit, keyword, page])
  const data = seat?.data?.data || []
  const onChangePage = (page, limit) => {
    let params = { page, limit }
    history.push({
      pathname: SEAT,
      search: QueryString.stringify(params),
    })
  }
  const onDelete = (id) => {
    postAxios(bindParam(API_SEAT_DELETE, { id }))
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['seat'])
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
  const onSearch = (seat) => {
    let params = { page, limit, keyword: seat }

    history.push({
      pathname: SEAT,
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

  const columns = [
    { title: "ID Seat", dataIndex: "id" },
    { title: "Row", dataIndex: "row" },
    { title: "Order", dataIndex: "order" },
    { title: "Type of seat", dataIndex: "type_seat" },
    { title: "Room", dataIndex: ["room", "name"] },
    {
      title: '',
      dataIndex: '',
      width: '5%',
      key: 'action',
      render: ({ id }) => {
        const content = (
          <div className="seat-popover">
            <div className="seat-popover__content" onClick={() => onOpenModal(id)}>
              <AiFillDelete />
              <div onClick={() => onDelete(id)}>Delete</div>
            </div>
          </div>
        )

        return (
          <Popover placement="bottom" content={content} trigger="click">
            <BsThreeDots className="seat-three__dot" />
          </Popover>
        )
      },
    },
  ];
  return (
    <PrivateLayout>
    <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Table Seats</h2>
    <Row>
      <Col span={20}>
        <div className="seat-search">
          <Search
            loading={isFetching}
            defaultadvertise={keyword}
            onSearch={onSearch}
            className="seat-content-search__input"
          />
        </div>
      </Col>
      <Col span={4}>
        <div className="seat-add__btn">
          <Link to={SEAT_CREATE}>Add seat</Link>
        </div>
      </Col>
    </Row>

    <Table
      dataSource={data}
      columns={columns}
      scroll={{
        x: 1100,
      }}
      key="seat"
      loading={isLoading}
      pagination={{
        onChange: onChangePage,
        total: seat?.total,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 30],
        current: seat?.current_page,
        pageSize: seat?.per_page,
      }}
    />
  </PrivateLayout>
  );
};

export default Seat;
