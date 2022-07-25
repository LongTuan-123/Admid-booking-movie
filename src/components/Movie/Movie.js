import { Popover, Col, Row, Table, notification } from 'antd'
import { useState } from 'react'
import { API_MOVIE_DELETE } from '../../config/endpointapi'
import { MOVIE, MOVIE_CREATE, MOVIE_UPDATE } from '../../config/path'
import PrivateLayout from '../../Layout/PrivateLayout'
import '../../style/Movie.css'
import { bindParam } from '../../config/function'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { postAxios } from '../../Http'
import QueryString from 'qs'
import { toast } from 'react-toastify'
import Search from 'antd/lib/transfer/search'
import useMovieQuery from '../../hooks/useMovieQuery'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { SmileOutlined } from '@ant-design/icons'
import { MdUpdate } from 'react-icons/md'

const Movie = () => {
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

  const { data: movie, isError, isLoading, isFetching } = useMovieQuery([limit, keyword, page])
  const data = movie?.data?.data || []
  const onChangePage = (page, limit) => {
    let params = { page, limit }
    history.push({
      pathname: MOVIE,
      search: QueryString.stringify(params),
    })
  }
  const onDelete = (id) => {
    postAxios(bindParam(API_MOVIE_DELETE, { id }))
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['movie'])
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
  const onSearch = (movie) => {
    let params = { page, limit, keyword: movie }

    history.push({
      pathname: MOVIE,
      search: QueryString.stringify(params),
    })
  }
  const onOpenModal = (id) => {
    setIdDelete(id)
    setIsPopover(true)
    setIsOpen(true)
  }
  const onGoToUpdate = (id) => {
    history.push(bindParam(MOVIE_UPDATE, { id }))
  }

  const columns = [
    { title: 'ID movie', dataIndex: 'id' },
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
    {
      title: '',
      dataIndex: '',
      width: '5%',
      key: 'action',
      render: ({ id }) => {
        const content = (
          <div className="movie-popover">
            <div className="movie-popover__content" onClick={() => onOpenModal(id)}>
              <AiFillDelete />
              <div onClick={() => onDelete(id)}>Delete</div>
            </div>
            <div className="movie-popover__content" onClick={() => onGoToUpdate(id)}>
              <MdUpdate />
              <div>Update</div>
            </div>
          </div>
        )

        return (
          <Popover placement="bottom" content={content} trigger="click">
            <BsThreeDots className="advertise-three__dot" />
          </Popover>
        )
      },
    },
  ]
  return (
    <PrivateLayout>
      <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Table Movies</h2>
      <Row>
        <Col span={20}>
          <div className="movie-search">
            <Search
              loading={isFetching}
              defaultadvertise={keyword}
              onSearch={onSearch}
              className="movie-content-search__input"
            />
          </div>
        </Col>
        <Col span={4}>
          <div className="movie-add__btn" onClick={onSearch}>
            <Link to={MOVIE_CREATE}>Add Movie</Link>
          </div>
        </Col>
      </Row>

      <Table
        columns={columns}
        className="movie-table"
        pagination={{
          total: movie?.total,
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
