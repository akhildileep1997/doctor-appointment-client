import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { Table, message,Tag } from "antd";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  const fetchAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/get-all-doctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data.data);
      setDoctors(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllDoctors();
  }, []);

  // for approving the status
  const handleApprove = async (record, status) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/admin/change-status`,
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.location.reload();
        message.success(data.message);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong while approving the status");
    }
  };

  // for rejecting the status
const handleReject = async (record, status) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/admin/change-status-to-reject`,
      { doctorId: record._id,userId: record.userId, status: status }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(data);
    if (data.success) {
      window.location.reload();
      message.success(data.message);
    } else {
      message.error(data.message);
    }
  } catch (error) {
    console.log(error);
    message.error("something went wrong while rejecting the status");
  }
};


  const columns = [
    {
      title: " Name",
      dataIndex: "Name",
      render: (text, record) => (
        <span>{record.firstName + "" + record.lastName}</span>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Added At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (title, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <div>
              <button
                onClick={() => handleApprove(record, "approved")}
                className="btn btn-success"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(record, "rejected")}
                className="btn btn-danger ms-3"
              >
                Reject
              </button>
            </div>
          ) : record.status === "approved" ? (
            <Tag color="green">Approved</Tag>
          ) : (
            <Tag color="red">Rejected</Tag>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{minHeight:'70vh'}} className="wrapper">
        <h1 className="text-center p-3">Doctors List</h1>
        <Table columns={columns} dataSource={doctors} />
      </div>
    </Layout>
  );
}

export default Doctors;
