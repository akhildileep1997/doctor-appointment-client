import React from "react";
import Layout from "../components/Layout";
import { Row, Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/slices/alertSlice";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

function Notification() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  //function for reading all notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        `${baseUrl}/user/getAllNotification`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      dispatch(hideLoading());
      if (data.success) {
        message.success('All Notifications marked as seen');
         window.location.reload();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };

  //function for deleting all seen notification
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        `${baseUrl}/user/deleteAllNotification`,
        { userId: user._id }, {
          headers: {
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (data.success) {
        console.log(data);
        message.success(data.message)
        window.location.reload()
      } else {
        message.error(data.message)
      }
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('something went wrong')
    }
  };

  return (
    <Layout style={{ backgroundColor: "#F0F2F5" }}>
      <div className="m-4 p-3">
        <h4 className="p-4 text-center">Notifications</h4>
        <Tabs>
          <Tabs.TabPane tab="Un-Readed-Notifications" key={0}>
            <div className="d-flex justify-content-end">
              <button
                style={{ cursor: "pointer" }}
                className="p-2  btn btn-info"
                onClick={handleMarkAllRead}
              >
                Mark All read
              </button>
            </div>
            <Row gutter={20}>
              {user?.notification.map((msg) => (
                <div
                  style={{ cursor: "pointer" }}
                  className="card p-4 ms-3 mb-3"
                >
                  <div
                    onClick={() => navigate(msg.onClickPath)}
                    className="card-text"
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Readed-Notifications" key={1}>
            <div className="d-flex justify-content-end">
              <button
                style={{ cursor: "pointer" }}
                className="p-2 btn btn-danger"
                onClick={handleDeleteAllRead}
              >
                Delete All read
              </button>
            </div>
            <Row gutter={20}>
              {user?.seenNotification.map((msg) => (
                <div style={{ cursor: "pointer" }} className="card p-4">
                  <div
                    onClick={() => navigate(msg.onClickPath)}
                    className="card-text"
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  );
}

export default Notification;
