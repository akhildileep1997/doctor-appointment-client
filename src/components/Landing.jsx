import React from 'react'
import { MDBFooter } from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';
import '../Styles/Layout.css'


function Landing() {
  const navigate = useNavigate()
  return (
    <>
      <div className="heading-div">
        <div className="text">
          <h4>
            <i className="fa-solid fa-user-doctor me-2"></i>
            Med-Care
          </h4>
        </div>
      </div>
      <div className="wrapper-div-landing">
        <div className="content-div">
          <h2>Med-Care</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            dolorem eos reprehenderit exercitationem. Veritatis aliquid quisquam
            facere nihil velit, nulla quaerat doloremque repellat soluta
            accusantium non magni incidunt deleniti maxime.
          </p>
          <div className="button-div">
            <button className="btn-landing" onClick={() => navigate("/home")}>
              Book Appointment
            </button>
          </div>
        </div>
        <div className="image-div">
          <img
            style={{ width: "500px" }}
            src="https://irp.cdn-website.com/82d5ed66/dms3rep/multi/Contraception+methods-rafiki.svg"
            alt=""
          />
        </div>
      </div>
      <div className="footer-div">
        <MDBFooter bgColor="success" className="text-center text-lg-left">
          <div
            className="text-center p-3 text-light"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a className="text-light" href="/">
              MedCare.com
            </a>
          </div>
        </MDBFooter>
      </div>
    </>
  );
}

export default Landing
