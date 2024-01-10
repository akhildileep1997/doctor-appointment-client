import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import axios from 'axios'
import {baseUrl} from '../../baseUrl'
import { useNavigate, useParams } from 'react-router-dom'
import { hideLoading, showLoading } from '../../redux/slices/alertSlice'
import moment from 'moment'

function ManageProfile() {

  //for getting id from url
  const params = useParams()

  //for loading and hideloading
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //getting user details with redux
 const { user } = useSelector((state) => state.userReducer);

  //for storing values of fetched doctor details
  const [doctor, setDoctor] = useState(null)
  
  const getDoctorInfo = async () => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/doctor/get-doctor-info`,
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setDoctor(data.data)
      }
    } catch (error) {
      console.log(error);
      message.error('something went wrong')
    }
  }

  useEffect(() => {
    getDoctorInfo()
  }, [])
  
  const handleFinish = async (values) => {
        try {
          dispatch(showLoading());
          const { data } = await axios.post(
            `${baseUrl}/doctor/update-doctor-info`,
            {
              ...values,
              userId: user._id,
              timing: [
                values.timing[0] && values.timing[0].format("HH:mm"),
                values.timing[1] && values.timing[1].format("HH:mm"),
              ],
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (data.success) {
            message.success(data.message);
            navigate("/");
          } else {
            message.error(data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          message.error("something went wrong");
          console.log(error);
        }
  }
  
  return (
    <Layout>
      <div className="wrapper">
        <h1 className="text-center p-3">Manage Your Profile</h1>
        {doctor && (
          <Form
            className="m-3"
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              ...doctor,
              timing:
                doctor.timing && doctor.timing.length === 2
                  ? [
                      moment(doctor.timing[0], "HH:mm"),
                      moment(doctor.timing[1], "HH:mm"),
                    ]
                  : [null, null],
            }}
          >
            {/* Personal Details */}
            <p className="text-danger mb-4">* update Your Personal Details</p>
            <Row gutter={20}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: "Please enter your address" },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input type="email" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Phone No"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Website"
                  name="website"
                  rules={[
                    { required: true, message: "Please enter your website" },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>

            {/* Professional Details */}
            <p className="text-danger mb-3">update Your Professional Details</p>
            <Row gutter={20}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Specialized In"
                  name="specialization"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your specialization",
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Work Experience"
                  name="experience"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your work experience",
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Consultation Fees"
                  name="consultationFee"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your consultation fee",
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Available Days"
                  name="availableDays"
                  rules={[
                    {
                      required: true,
                      message: "Please provide consulting days",
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Consultation Time"
                  name="timing"
                  rules={[
                    {
                      required: true,
                      message: "Please select consultation time",
                    },
                  ]}
                >
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <button
                  type="submit"
                  className="btn btn-outline-success form-btn "
                >
                  Update - Form
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </Layout>
  );
}

export default ManageProfile
