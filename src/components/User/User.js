import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input, Table } from "antd";
import PrivateLayout from "../../Layout/PrivateLayout";
import { API_LIST_USER } from "../../config/endpointapi";
import "../../style/User.css";
import { getToken } from "../../Http";

const User = () => {
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const value = useRef();

  useEffect(() => {
    const getUser = async () => {
      const params = { limit, page, keyword };
      axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
      await axios
        .get(API_LIST_USER, { params })
        .then((res) => {
          setData(res?.data?.data?.data);
          setTotal(res?.data?.data?.total);
          console.log(res?.data?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [limit, page, keyword]);

  const onSearch = () => {
    setKeyword(value.current.input.value);
  };

  const onChangePage = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };

  const columns = [
    { title: "ID user", dataIndex: "id" },
    { title: "Name", dataIndex:  `"first_name" "last_name"` },
    { title: "Age", dataIndex: "age" },
    { title: "Address", dataIndex: "address" },
    { title: "Email", dataIndex: "email" },
    { title: "Person ID", dataIndex: "person_id" },
    { title: "Create date", dataIndex: "created_at" },
    
  ];

  return (
    <PrivateLayout>
      <h2 style={{ fontSize: "32px", textTransform: "uppercase" }}>
        Table users
      </h2>
      <div className="user-search">
        <Input ref={value} placeholder="Search by First name" />
        <div className="user-search__btn" onClick={onSearch}>
          Search
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
  );
};
export default User;
