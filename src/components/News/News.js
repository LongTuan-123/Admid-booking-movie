/* eslint-disable jsx-a11y/alt-text */
import { Button, Col, Input, Row, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { API_LIST_NEWS, API_NEWS_DELETE } from '../../config/endpointapi'
import { bindParam } from '../../config/function'
import { NEWS_CREATE, NEWS_UPDATE } from '../../config/path'
import PrivateLayout from '../../Layout/PrivateLayout'
import '../../style/News.css'
import { getAxios, postAxios } from '../../Http'

const News = () => {
  const value = useRef()
  const [status, setStatus] = useState(false)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const history = useHistory()
  useEffect(() => {
    const getMovies = async () => {
      const params = { limit, page, keyword }
      await getAxios(API_LIST_NEWS, { params })
        .then((res) => {
          setData(res?.data?.data?.data)
          setTotal(res?.data?.data?.total)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getMovies()
  }, [status, limit, page, keyword])
  const onSearch = () => {
    setKeyword(value.current.input.value)
  }

  const onDelete = async (id) => {
    await postAxios(bindParam(API_NEWS_DELETE, { id })).then((res) => {
      console.log(value?.id)
      setStatus(!status)
    })
  }
  const onChangePage = (page, limit) => {
    setPage(page)
    setLimit(limit)
  }

  const onSwitchUpdate = (id) => {
    history.push(bindParam(NEWS_UPDATE, { id }))
  }

  const columns = [
    { title: 'ID tin tức', dataIndex: 'id' },
    {
      title: 'Ảnh',
      render: (value, record) => {
        return (
          <div className="news-list__img">
            <img src={value.image} />
          </div>
        )
      },
    },
    { title: 'Tiêu đề', dataIndex: 'name' },
    { title: 'Mô tả', dataIndex: 'description' },
    {
      title: 'Action',
      render: (value, record) => {
        console.log(value)
        return (
          <>
            <Button onClick={() => onSwitchUpdate(value?.id)}>Sửa</Button>
            <Button onClick={() => onDelete(value?.id)}>Xóa</Button>
          </>
        )
      },
    },
  ]

  return (
    <PrivateLayout>
      <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Danh sách tin tức</h2>
      <Row>
        <Col span={22}>
          <div className="news-search">
            <Input ref={value} placeholder="Tìm tin tức bằng tên" />
            <div className="news-search__btn" onClick={onSearch}>
              Tìm
            </div>
          </div>
        </Col>
        <Col span={2}>
          <div className="news-add__btn" onClick={onSearch}>
            <Link to={NEWS_CREATE}>Thêm tin tức</Link>
          </div>
        </Col>
      </Row>

      <Table
        columns={columns}
        className="news-table"
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
export default News
