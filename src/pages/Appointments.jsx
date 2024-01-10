import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Table, message } from "antd";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import moment from "moment";

function Appointments() {
  const [appointment, setAppointment] = useState([]);

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/user/user-appointment-lists`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setAppointment(data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong while fetching appointment lists");
    }
  };

  useEffect(() => {
    getUserAppointment();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorId.firstName} {record.doctorId.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorId.phone}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YY")} &nbsp; &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
          <h1 className="p-3 text-center">Appointments</h1>
          <Table columns={columns} dataSource={appointment}/>
    </Layout>
  );
}

export default Appointments;
