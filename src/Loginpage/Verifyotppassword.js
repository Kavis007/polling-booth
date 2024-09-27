import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";
import { Card, Col, Container, FormControl, Row } from "react-bootstrap";


const VerifyOtpPassword = () => {
 
  const [password, setPassword] = useState();
  const [confirmpassword,setConfirmpassword] =useState();
 const p= sessionStorage.getItem('userph')
  const navigate1 = useNavigate();
 const navtohom=useNavigate();
  useEffect(()=>{
     if(!p)
     {
      navtohom('/');
     }
      
  },[p,navtohom])

  const handleChangeconfirm =(e)=>{
    setConfirmpassword(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(`${api}/api/updateuser`,{
        identifier:p,
        password:password
    
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Good job!",
          text: "Your password has been reset successfully!",
          icon: "success",
        });
        navigate1("/");
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong!",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "An error occurred. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Container fluid className="bodyyy">
        <Row style={{ height: "20vh" }}></Row>
        <Row style={{ height: "60vh" }}>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card className="Loginpageeee">
              <label>
                <b> Password:</b>
              </label>
              <FormControl
                className="mobinputpass"
                type="number"
                required="10"
                value={password}
                onChange={handleChangePassword}

              />
              <br />
              <label>
                <b>Confirm Password:</b>
              </label>
              <FormControl
                type="number"
                required="10"
                name="confirmpassword"
                value={confirmpassword}
                onChange={handleChangeconfirm}
              />
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{ background: "grey", color: "white" }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </Card>
          </Col>
          <Col lg={3}></Col>
        </Row>
        <Row style={{ height: "20vh" }}></Row>
      </Container>
    </div>
  );
};

export default VerifyOtpPassword;
