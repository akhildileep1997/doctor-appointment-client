import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Table, Tag, message } from 'antd';
import moment from 'moment';
import { baseUrl } from '../../baseUrl';
import axios from 'axios';


function DoctoBookings() {

      const [bookingsForDoctor, setBookingsForDoctor] = useState([]);

      const getAppointmentsForDoctor = async () => {
        try {
          const { data } = await axios.get(
            `${baseUrl}/doctor/bookings-for-the-doctor`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (data.success) {
            setBookingsForDoctor(data.data);
          }
        } catch (error) {
          console.log(error);
          message.error(
            "Something went wrong while fetching appointment lists"
          );
        }
      };

      useEffect(() => {
        getAppointmentsForDoctor();
      }, []);
  
  //for handling the status // approve/reject
  const handleStatusApprove = async (record,status) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/doctor/update-user-Booking-status`, {bookingId:record._id,status},
        {
          headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }}
      );
      if (data.success) {
        message.success(data.message)
        getAppointmentsForDoctor()
      } else {
        message.error(data.message)
      }
    } catch (error) {
      console.log(error);
      message.error('something went wrong while updating the status')
    }
  }



// columns for antd table
      const columns = [
        {
          title: "Id",
          dataIndex: "_id",
        },
        {
          title: `Date & Time`,
          dataIndex: "date",
          render: (text, record) => (
            <span>
              {moment(record.date).format("DD-MM-YY")} &nbsp; 
              {moment(record.time).format("HH:mm")}
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              {record.status === "pending" && (
                <div className="d-flex">
                  <button
                    onClick={() => handleStatusApprove(record, "approved")}
                    className="btn btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusApprove(record, "rejected")}
                    className="btn btn-danger ms-3"
                  >
                    Reject
                  </button>
                </div>
              )}
              {record.status === "approved" && (
                <Tag color='green'>Approved</Tag>
              )}
              {record.status === "rejected" && (
                <Tag color='red'>Rejected</Tag>
              )}
            </div>
          ),
        },
      ];

  return (
    <Layout>
      <h1 className='p-3 text-center'>Appointments</h1>
      <Table columns={columns} dataSource={bookingsForDoctor} />
    </Layout>
  );
}

export default DoctoBookings
