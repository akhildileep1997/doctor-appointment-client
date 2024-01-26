import React, { useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../redux/slices/alertSlice';
import axios from 'axios'
import { baseUrl } from '../baseUrl';
import { setUser } from '../redux/slices/userSlice';

function ProtectedRoute({ children }) {

  const dispatch = useDispatch()
const navigate = useNavigate()

  const { user } = useSelector(state => state.userReducer)
  
 
  //eslint-disable-next-line
  const getUser = async() => {
    try {
      dispatch(showLoading())
      const res = await axios.post(
        `${baseUrl}/user/getUserData`,
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization:`Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      dispatch(hideLoading())
      if (res.data.success) {
        dispatch(setUser(res.data.data))
      } else {
        navigate('/login')
        localStorage.clear()
      }

    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      localStorage.clear()
    }
  }

  useEffect(() => {
    if (!user) {
      getUser()
    }
  },[user,getUser])


  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/landing"} />;
  }
}

export default ProtectedRoute
