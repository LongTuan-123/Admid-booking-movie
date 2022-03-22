import { Button, Input, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import PrivateLayout from "../../Layout/PrivateLayout";
import axios from "axios";
import { API_LIST_USER } from "../../config/endpointapi";
import '../../style/User.css'

const User = () => {
  const value = useRef()
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const params = {limit, page, keyword}
      await axios.get(API_LIST_USER, {params})
        .then(res => {
          setData(res?.data?.data?.data)
          setTotal(res?.data?.data?.total)
        })
        .catch(err => {
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
    { title: "ID", dataIndex: "id" },
    { title: "Profile", dataIndex: "first_name" },
    { title: "Name", dataIndex: "last_name" },
    { title: "Age", dataIndex: "age" },
    { title: "Address", dataIndex: "address" },
    { title: "Email", dataIndex: "email" },
    { title: "Person ID", dataIndex: "person_id" },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <>
            <Button>Sửa</Button>
            <Button>Xóa</Button>
          </>
        );
      },
    },
  ];

  return (
    <PrivateLayout>
      <h2 style={{ fontSize: "32px", textTransform: "uppercase" }}>
        Danh sách người dùng
      </h2>
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
          pageSizeOptions: [5, 10, 20, 30]
        }} 
        dataSource={data}/>
    </PrivateLayout>
  );
};
export default User;
