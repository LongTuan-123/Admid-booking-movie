import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Popover, Col, Row, Table } from 'antd'
import { API_ADVERTISEMENT_DELETE } from '../../config/endpointapi'
import { ADVERTISEMENT, ADVERTISEMENT_CREATE } from '../../config/path'
import PrivateLayout from '../../Layout/PrivateLayout'
import '../../style/Advertisement.css'
import { bindParam } from '../../config/function'
import { postAxios } from '../../Http'
import QueryString from 'qs'
import Search from 'antd/lib/transfer/search'
import useAdvertisementQuery from '../../hooks/useAdvertisementQuery'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { MdUpdate } from 'react-icons/md'

const Advertisement = () => {
  const location = useLocation()
  const history = useHistory()
  const queryClient = useQueryClient()
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [idDelete, setIdDelete] = useState(0)
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)

  const { data: advertise, isLoading, isFetching } = useAdvertisementQuery([limit, keyword, page])
  const data = advertise?.data?.data || []

  const onChangePage = (page, limit) => {
    let params = { page, limit }

    history.push({
      pathname: ADVERTISEMENT,
      search: QueryString.stringify(params),
    })
  }

  const onDelete = () => {
    postAxios(bindParam(API_ADVERTISEMENT_DELETE, { id: idDelete }))
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['advertisement'])
        }
      })
      .catch((err) => {
        toast.error(err?.message)
      })
  }
  const onSearch = (advertise) => {
    let params = { page, limit, keyword: advertise }

    history.push({
      pathname: ADVERTISEMENT,
      search: QueryString.stringify(params),
    })
  }
  const onOpenModal = (id) => {
    setIdDelete(id)
  }

  const columns = [
    { title: 'ID Quảng cáo', dataIndex: 'id' },
    {
      title: 'Ảnh',
      render: (advertise) => {
        return (
          <div className="advertisement-list__img">
            <img src={advertise.image} alt="Advertise"></img>
          </div>
        )
      },
    },
    {
      title: 'Tên quảng cáo',
      dataIndex: 'name',
    },

    {
      title: '',
      dataIndex: '',
      width: '5%',
      key: 'action',
      render: ({ id }) => {
        const content = (
          <div className="advertise-popover">
            <div className="advertise-popover__content" onClick={() => onOpenModal(id)}>
              <AiFillDelete />
              <div onClick={onDelete}>Delete</div>
            </div>
            <div className="advertise-popover__content">
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
      <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Danh sách quảng cáo</h2>
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
            <Link to={ADVERTISEMENT_CREATE}>Thêm quảng cáo</Link>
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
export default Advertisement
