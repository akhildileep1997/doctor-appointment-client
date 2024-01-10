import React from "react";
import { Form, Input, message, } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/slices/alertSlice";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import '../Styles/RegisterStyles.css'

function Login() {

    const navigate = useNavigate();

  const dispatch = useDispatch();
  
  // Form submission handler
  const onFinishHandler = async(values) => {
     try {
         dispatch(showLoading());
       const { data } = await axios.post(`${baseUrl}/user/login`, values);
       window.location.reload();
         dispatch(hideLoading());
       if (data.success) {
          localStorage.setItem("token", data.token);
          message.success(data.message);
          navigate("/");
        } else {
          message.error(data.message);
        }
      } catch (error) {
         dispatch(hideLoading());
        console.log(error);
      }
  };

  return (
    <>
      <div className="form-container">
        <div className="text">
          <h1 className="heading">
            <i className="fa-solid fa-user-doctor me-3"></i>Find Doctor{" "}
          </h1>
          <p className="desc">
            Here you can find Your ideal doctor for your treatment
          </p>
        </div>
        <div className="card p-3 text-center">
          <Form layout="vertical" onFinish={onFinishHandler}>
            <h2 style={{borderRadius:'8px'}} className="text-center p-1 bg-success text-light mt-2">
              Login Here
            </h2>
            <Form.Item className="mt-3" label="Email" name="email">
              <Input className="form-control" type="email" required />
            </Form.Item>
            <Form.Item className="mt-3" label="Password" name="password">
              <Input className="form-control" type="password" required />
            </Form.Item>
            <Form.Item className="mt-3 text-center">
              <button type="submit" className="btn btn-success form-control ">
                Login
              </button>
            </Form.Item>
          </Form>
          <div className="mt-1 mb-1">
            New Here? <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
