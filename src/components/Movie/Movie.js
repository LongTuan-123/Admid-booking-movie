/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useRef, useState } from 'react'
import PrivateLayout from '../../Layout/PrivateLayout'
import { Button, Col, Input, Row, Table } from 'antd'
import axios from 'axios'
import { API_MOVIE, API_MOVIE_DELETE } from '../../config/endpointapi'
import { MOVIE_CREATE, MOVIE_UPDATE } from '../../config/path'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { bindParam } from '../../config/function'
import '../../style/Movie.css'
import { getAxios, postAxios } from '../../Http'

const Movie = () => {
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
      await getAxios(API_MOVIE, { params })
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
    await postAxios(`${API_MOVIE_DELETE}/${id}`).then((res) => {
      setStatus(!status)
    })
  }

  const onChangePage = (page, limit) => {
    setPage(page)
    setLimit(limit)
  }

  const onSwitchUpdate = (id) => {
    history.push(bindParam(MOVIE_UPDATE, { id }))
  }

  const columns = [
    { title: 'ID Phim', dataIndex: 'id' },
    {
      title: 'Poster',
      render: (value, record) => {
        return (
          <div className="movie-list__img">
            <img src={value.poster} />
          </div>
        )
      },
    },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Dimension', dataIndex: 'dimension' },
    { title: 'Type of movie', dataIndex: 'type_of_movie' },
    { title: 'Start date', dataIndex: 'start_date' },
    { title: 'Range of movie', dataIndex: 'range_of_movie' },
    { title: 'Actor', dataIndex: 'actor' },
    { title: 'Director', dataIndex: 'director' },
    { title: 'Description', dataIndex: 'description' },
    {
      title: 'Action',
      render: (value, record) => {
        console.log(value)
        return (
          <>
            <Button onClick={() => onSwitchUpdate(value?.id)}>Update</Button>
            <Button onClick={() => onDelete(value?.id)}>Delete</Button>
          </>
        )
      },
    },
  ]
  return (
    <PrivateLayout>
      <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Movies list</h2>
      <Row>
        <Col span={22}>
          <div className="movies-search">
            <Input ref={value} placeholder="Search by First name" />
            <div className="movies-search__btn" onClick={onSearch}>
              Search
            </div>
          </div>
        </Col>
        <Col span={2}>
          <div className="movies-add__btn" onClick={onSearch}>
            <Link to={MOVIE_CREATE}>Create Movie</Link>
          </div>
        </Col>
      </Row>

      <Table
        columns={columns}
        className="movie-table"
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
export default Movie
