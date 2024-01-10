import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Spinner from "./components/Spinner";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import ManageProfile from "./pages/doctor/ManageProfile";
import MakeAppointment from "./pages/MakeAppointment";
import Appointments from "./pages/Appointments";
import { useSelector } from "react-redux";
import DoctoBookings from "./pages/doctor/DoctoBookings";


function App() {
  const { loading } = useSelector((state) => state.alertReducer);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/make-appointment/:docId"
            element={
              <ProtectedRoute>
                <MakeAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="doctor/profile/:id"
            element={
              <ProtectedRoute>
                <ManageProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-appointments"
            element={
              <ProtectedRoute>
                <DoctoBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          />
          {/* Redirect to Login if no route matches */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
