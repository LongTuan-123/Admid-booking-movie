import { Popover, Col, Row, Table, notification } from 'antd'
import { useState } from 'react'
import { API_SHOWTIME_DELETE } from '../../config/endpointapi'
import { SHOWTIME, SHOWTIME_CREATE } from '../../config/path'
import PrivateLayout from '../../Layout/PrivateLayout'
import '../../style/Showtime.css'
import { bindParam } from '../../config/function'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { postAxios } from '../../Http'
import QueryString from 'qs'
import { toast } from 'react-toastify'
import Search from 'antd/lib/transfer/search'
import useShowTimeQuery from '../../hooks/useShowTimeQuery'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { SmileOutlined } from '@ant-design/icons'

const ShowTime = () => {
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
  const { data: advertise, isError, isLoading, isFetching } = useShowTimeQuery([limit, keyword, page])
  const data = advertise?.data?.data || []
  const onChangePage = (page, limit) => {
    let params = { page, limit }
    history.push({
      pathname: SHOWTIME,
      search: QueryString.stringify(params),
    })
  }
  const onDelete = (id) => {
    postAxios(bindParam(API_SHOWTIME_DELETE, { id }))
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['showtime'])
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
  const onSearch = (showtime) => {
    let params = { page, limit, keyword: showtime }

    history.push({
      pathname: SHOWTIME,
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
    {
      title: 'ID Show time',
      dataIndex: 'id',
    },
    {
      title: 'Show date',
      dataIndex: 'show_date',
    },
    {
      title: 'Show date',
      dataIndex: 'show_time',
    },
    { title: 'Room', dataIndex: ['room', 'name'] },
    { title: 'Movie name', dataIndex: ['movie', 'name'] },
    {
      title: '',
      dataIndex: '',
      width: '5%',
      key: 'action',
      render: ({ id }) => {
        const content = (
          <div className="showtime-popover">
            <div className="showtime-popover__content" onClick={() => onOpenModal(id)}>
              <AiFillDelete />
              <div onClick={() => onDelete(id)}>Delete</div>
            </div>
          </div>
        )

        return (
          <Popover placement="bottom" content={content} trigger="click">
            <BsThreeDots className="showtime-three__dot" />
          </Popover>
        )
      },
    },
  ]

  return (
    <PrivateLayout>
      <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Table Showtimes</h2>
      <Row>
        <Col span={20}>
          <div className="advertisement-search">
            <Search
              loading={isFetching}
              defaultadvertise={keyword}
              onSearch={onSearch}
              className="advertise-content-search__input"
            />
          </div>
        </Col>
        <Col span={4}>
          <div className="advertisement-add__btn">
            <Link to={SHOWTIME_CREATE}>Add Showtime </Link>
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
          total: advertise?.total,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 30],
          current: advertise?.current_page,
          pageSize: advertise?.per_page,
        }}
      />
    </PrivateLayout>
  )
}

export default ShowTime
