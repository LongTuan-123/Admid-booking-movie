import PrivateLayout from '../../Layout/PrivateLayout'
import { Button, Col, Input, Row, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_LIST_SHOWTIME, API_SHOWTIME_DELETE } from '../../config/endpointapi'
import { bindParam } from '../../config/function'
import { SHOWTIME_CREATE } from '../../config/path'
import '../../style/Showtime.css'
import { getAxios, postAxios } from '../../Http'

const ShowTime = () => {
  const value = useRef()
  const [status, setStatus] = useState(false)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  const onSearch = () => {
    setKeyword(value.current.input.value)
  }

  useEffect(() => {
    const getShowtime = async () => {
      const params = { limit, page, keyword }
      await getAxios(API_LIST_SHOWTIME, params)
        .then((res) => {
          setData(res?.data?.data)
          setTotal(res?.data?.total)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getShowtime()
  }, [status, limit, page, keyword])

  const onDelete = async (id) => {
    await postAxios(bindParam(API_SHOWTIME_DELETE, { id })).then((res) => {
      setStatus(!status)
    })
  }

  const onChangePage = (page, limit) => {
    setPage(page)
    setLimit(limit)
  }

  const columns = [
    {
      title: 'ID Suất chiếu',
      dataIndex: 'id',
    },
    {
      title: 'Ngày chiếu',
      dataIndex: 'show_date',
    },
    {
      title: 'Giờ chiếu',
      dataIndex: 'show_time',
    },
    { title: 'Phòng chiếu', dataIndex: ['room', 'name'] },
    { title: 'Phim chiếu', dataIndex: ['movie', 'name'] },
    {
      title: 'Action',
      render: (value, record) => {
        console.log(value)
        return (
          <>
            {/* <Button onClick={() => onSwitchUpdate(value?.id)}>Sửa</Button> */}
            <Button onClick={() => onDelete(value?.id)}>Xóa</Button>
          </>
        )
      },
    },
  ]

  return (
    <PrivateLayout>
      <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Danh sách suất chiếu</h2>
      <Row>
        <Col span={22}>
          <div className="showtime-search">
            <Input ref={value} placeholder="Search by First name" />
            <div className="showtime-search__btn" onClick={onSearch}>
              Tìm
            </div>
          </div>
        </Col>
        <Col span={2}>
          <div className="showtime-add__btn" onClick={onSearch}>
            <Link to={SHOWTIME_CREATE}>Thêm suất chiếu</Link>
          </div>
        </Col>
      </Row>

      <Table
        columns={columns}
        className="showtime-table"
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

export default ShowTime
