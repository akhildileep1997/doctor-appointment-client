import React from 'react'
import { Link } from 'react-router-dom';

function DoctorsList({doc}) {
  return (
    <>
      <div style={{ width: "20rem" }} className="card  m-3 shadow ">
        <div className="card-header ">
          <h5 className="text-center">
            Dr {doc.firstName} {doc.lastName}
          </h5>
          <hr />
          <div className="card-body">
            <p>
              <b>Specialization : {doc.specialization}</b>
            </p>
            <p>
              <b>Experience : {doc.experience} years</b>
            </p>
            <p>
              <b>Consultation Fees: {doc.consultationFee}</b>
            </p>
            <p>
              <b>Available Days: {doc?.availableDays}</b>
            </p>
            <p>
              <b>
                Consulting Time: {doc?.timing[0]}-{doc?.timing[1]}
              </b>
            </p>
          </div>
          <div className="text-center mb-3">
            <Link to={`/make-appointment/${doc._id}`}>
              <button className="btn btn-success">Book an Appointment</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorsList
