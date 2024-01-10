import React from "react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/slices/alertSlice";
import axios from 'axios'
import { baseUrl } from '../baseUrl'
import '../Styles/Layout.css'

function ApplyDoctor() {

  const {user} = useSelector(state=>state.userReducer)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  // Form submission handler
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading())
      const { data } = await axios.post(
        `${baseUrl}/user/apply-doctor`,
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
      dispatch(hideLoading())
      if (data.success) {
        message.success(data.message)
        navigate('/home')
      } else {
        message.error(data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      message.error('something went wrong')
     console.log(error); 
    }
  };

  return (
    <Layout>
      <div className="wrapper">
        <h1 className="text-center p-3">Apply For doctor Role</h1>
        <Form className="m-3" layout="vertical" onFinish={handleFinish}>
          {/* Personal Details */}
          <p className="text-danger mb-4">
            * Please Fill Your Personal Details
          </p>
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
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
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
          <p className="text-danger mb-3 mt-5">
            * Please Fill Your Professional Details
          </p>
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
                Submit - Form
              </button>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
}

export default ApplyDoctor;
