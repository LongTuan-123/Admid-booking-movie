import { useEffect, useRef, useState } from 'react'
import { Input, Table } from 'antd'
import PrivateLayout from '../../Layout/PrivateLayout'
import { API_LIST_USER } from '../../config/endpointapi'
import '../../style/User.css'
import { getAxios } from '../../Http'

const User = () => {
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const value = useRef()

  useEffect(() => {
    const getUser = async () => {
      const params = { limit, page, keyword }
      await getAxios(API_LIST_USER, params)
        .then((res) => {
          setData(res?.data?.data)
          setTotal(res?.data?.total)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getUser()
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
    { title: 'Profile', dataIndex: 'first_name' },
    { title: 'Name', dataIndex: 'last_name' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Address', dataIndex: 'address' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Person ID', dataIndex: 'person_id' },
    { title: 'Ngày tạo', dataIndex: 'created_at' },
  ]

  return (
    <PrivateLayout>
      <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Danh sách người dùng</h2>
      <div className="user-search">
        <Input ref={value} placeholder="Search by First name" />
        <div className="user-search__btn" onClick={onSearch}>
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
export default User
