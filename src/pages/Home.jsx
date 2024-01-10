import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import Layout from "../components/Layout";
import { Row, message } from "antd";
import DoctorsList from "../components/DoctorsList";



function Home() {

  const [doctors,setDoctors] = useState([])


// api for getting and verifying logged user 
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const res = await axios.post(
        `${baseUrl}/user/getUserData`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

//api for fetching all doctors list
  const getAllDoctors = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/user/get-all-doctors`,{
      headers: {
      Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    if (data.success) {
      console.log(data);
      setDoctors(data.data)
   }
  } catch (error) {
    console.log(error); 
    message.error('something went wrong')
  }
    };
  useEffect(() => {
    getUserData();
    getAllDoctors()
  }, []);

  return (
    <Layout>

        <Row>{doctors && doctors.map((doc) => <DoctorsList doc={doc} />)}</Row>
    
    </Layout>
  );
}

export default Home
