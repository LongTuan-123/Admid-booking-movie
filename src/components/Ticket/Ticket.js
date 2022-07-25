import { Col, Row, Table } from 'antd'
import PrivateLayout from '../../Layout/PrivateLayout'
import '../../style/Ticket.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import QueryString from 'qs'
import Search from 'antd/lib/transfer/search'
import useTicketQuery from '../../hooks/useTicketQuery'
import { SHOWTIME } from '../../config/path'
import { useState } from 'react'

const Ticket = () => {
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

  const { data: ticket, isError, isLoading, isFetching } = useTicketQuery([limit, keyword, page])
  const data = ticket?.data?.data || []
  const onChangePage = (page, limit) => {
    let params = { page, limit }
    history.push({
      pathname: SHOWTIME,
      search: QueryString.stringify(params),
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
    { title: 'ID', dataIndex: 'id' },
    { title: 'User ID', dataIndex: ['user', 'id'] },
    { title: 'Seat ID', dataIndex: ['seat', 'id'] },
    { title: 'Showtime', dataIndex: ['showtime', 'id'] },
    { title: 'Price', dataIndex: 'money' },
    { title: 'Confirm', dataIndex: 'confirm' },
    { title: 'Create at', dataIndex: 'created_at' },
  ]

  return (
    <PrivateLayout>
      <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Table Tickets</h2>
      <Row>
        <Col span={20}>
          <div className="ticket-search">
            <Search
              loading={isFetching}
              defaultadvertise={keyword}
              onSearch={onSearch}
              className="ticket-content-search__input"
            />
          </div>
        </Col>
      </Row>

      <Table
        dataSource={data}
        columns={columns}
        scroll={{
          x: 1100,
        }}
        key="showtime"
        loading={isLoading}
        pagination={{
          onChange: onChangePage,
          total: ticket?.total,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 30],
          current: ticket?.current_page,
          pageSize: ticket?.per_page,
        }}
      />
    </PrivateLayout>
  )
}
export default Ticket
