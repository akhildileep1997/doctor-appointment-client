import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import {baseUrl} from '../../baseUrl'
import { Table, message } from 'antd'


function Users() {

  const [users,setUsers] = useState([])

  //api for fetching all user
  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/get-all-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data.success) {
          console.log(data);
          setUsers(data.data);
      }

    } catch (error) {
  console.log(error);
  message.error('something went wrong file fetching data')
}
  }
  useEffect(() => {
    fetchAllUsers()
  }, [])

  //api for removing the user
  const removeUser = async (id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/admin/remove-user/${id}`, {
        headers: {
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }});
      if (data.success) {
        message.success('user removed successfully')
        fetchAllUsers()
      } else {
        message.error('cannot remove user')
      }
    } catch (error) {
      console.log(error);
      message.error('something went wrong while removing the user')
    }
  }
  
  // column for antd table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => (
        <span>{record.isDoctor ?"Yes":"No" }</span>
      )
    },
    {
      title: "Created AT",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button onClick={()=>removeUser(record._id)} className="btn btn-danger">Remove</button>
        </div>
      ),
    },
  ];



  return (
    <Layout>
      <div style={{ minHeight: "70vh" }} className="wrapper">
        <h1 className="text-center p-3">users</h1>
        <Table columns={columns} dataSource={users} />
      </div>
    </Layout>
  );
}

export default Users
