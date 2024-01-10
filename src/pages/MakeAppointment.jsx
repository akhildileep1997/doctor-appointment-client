// File: MakeAppointment.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { DatePicker, TimePicker, message } from "antd";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/slices/alertSlice";
import { baseUrl } from "../baseUrl";

function MakeAppointment() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const { docId } = useParams();

  useEffect(() => {
    const getParticularDoctorInfo = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/doctor/get-particular-doctor-info/${docId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDoctor(data.data);
        console.log('doctor information is',doctor);
      } catch (error) {
        console.log(error);
      }
    };

    getParticularDoctorInfo();
  }, [docId]);


  // for make booking
  const handleBooking = async () => {
    try {
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading())

      const { data } = await axios.post(
        `${baseUrl}/user/book-an-appointment`,
        {
          doctorId: docId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date,
          time
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
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("An error occurred");
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="main-div">
        <div className="img-div">
          <img
            style={{width:'350px'}}
            src="https://cdn.pixabay.com/photo/2017/01/31/22/32/doctor-2027768_640.png"
            alt=""
          />
        </div>
        <div className="form-div ">
          <h3 className="text-center text-secondary p-3">Book Your Appointment</h3>
          <hr className="text-success" />
          <div className="container m-3">
            {doctor && (
              <div>
                <h2>
                  Dr:{doctor?.firstName} {doctor?.lastName}
                </h2>
                <h4>Consultation Fee: {doctor?.consultationFee}</h4>
                <h4>
                  Consulting time: {doctor?.timing?.[0]} - {doctor?.timing?.[1]}
                </h4>
                <h4>
                  Available Days : {doctor?.availableDays}
                </h4>
                <p className="text-danger">* make sure you choose the correct consulting time and day *</p>
                <div className="d-flex flex-column w-50">
                  <DatePicker
                    aria-required={"true"}
                    className="m-2"
                    format="DD-MM-YYYY"
                    onChange={(value) => {
                      setDate(value && value.format("DD-MM-YYYY"));
                    }}
                  />
                  <TimePicker
                    aria-required={"true"}
                    format="HH:mm"
                    className="mt-3"
                    onChange={(value) => {
                      setTime(value && value.format("HH:mm"));
                    }}
                  />
                  <div className="d-flex flex-column">
                    <button
                      onClick={handleBooking}
                      className="btn btn-success mt-2"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MakeAppointment;
