import { useEffect, useRef, useState } from 'react'
import { Input, Table } from 'antd'
import PrivateLayout from '../../Layout/PrivateLayout'
import { API_LIST_TICKET } from '../../config/endpointapi'
import '../../style/Ticket.css'
import { getAxios } from '../../Http'
import moment from 'moment'

const Ticket = () => {
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const value = useRef()

  useEffect(() => {
    const getTicket = async () => {
      const params = { limit, page, keyword, date: moment().format('YYYY-MM-DD') }
      await getAxios(API_LIST_TICKET, params)
        .then((res) => {
          setData(res?.data?.data)
          setTotal(res?.data?.total)
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getTicket()
  }, [limit, page, keyword])

  const onSearch = () => {
    setKeyword(value.current.input.value)
  }

  const onChangePage = (page, limit) => {
    setPage(page)
    setLimit(limit)
  }

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Người dùng', dataIndex: ['user', 'full_name'] },
    { title: 'Hàng ghế', dataIndex: ['seat', 'row'] },
    { title: 'Dãy ghế', dataIndex: ['seat', 'order'] },
    { title: 'Suất chiếu', dataIndex: ['showtime', 'id'] },
    { title: 'Gía tiền', dataIndex: 'money' },
    { title: 'Confirm', dataIndex: 'confirm' },
    { title: 'Ngày chiếu', dataIndex: ['showtime', 'show_date'] },
  ]

  return (
    <PrivateLayout>
      <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Danh sách vé bán</h2>
      <div className="ticket-search">
        <Input ref={value} placeholder="Tìm bằng mã" />
        <div className="ticket-search__btn" onClick={onSearch}>
          Tìm
        </div>
      </div>
      <Table
        columns={columns}
        pagination={{
          total: total,
          onChange: onChangePage,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 30],
        }}
        dataSource={data}
      />
    </PrivateLayout>
  )
}
export default Ticket
