import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import axios from "axios";
import { Card, FormControl, Button } from "react-bootstrap";
import api from "../api";
import { useNavigate } from "react-router-dom";
import '../Loginpage/Login.css';

const ForgotPassword = () => {
  const a = sessionStorage.getItem("user");
  const [pass, setPass] = useState({
    number: "",
    appName: "POLL APP",
  });

  console.log(a)
  const [sended, setSended] = useState(false);
  const [otpverify, setOtpverify] = useState({
    otp: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!a) {
      navigate("/");
    }
  }, [a, navigate]);

  const handleChange = (e) => {
    setPass((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOtpChange = (e) => {
    setOtpverify((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${api}/mobileauth/send-otp-sms`,
        pass
      );

      if (!pass.number) {
        Swal.fire({
          title: "Oops!",
          text: "Please enter a valid mobile number!",
          icon: "error",
        });

      } else if (response.status === 200) {
        setSended(true);
        Swal.fire({
          title: "Good job!",
          text: "OTP has been sent!",
          icon: "success",
        });
        sessionStorage.setItem('userph', pass.number)
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "An error occurred. Please try again later.",
        icon: "error",
      });
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${api}/mobileauth/verify-otp-sms`,
        {
          number: pass.number,
          otp: otpverify.otp
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Good job!",
          text: "OTP matched successfully!",
          icon: "success",
        });
        navigate('/VerifyOtpPassword')
      } else {
        Swal.fire({
          title: "Oops!",
          text: "OTP verification failed!",
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
    <Container className="bodyyy" fluid>
      <Row style={{ height: "20vh" }}></Row>
      <Row style={{ height: "60vh" }}>
        <Col lg={3}></Col>
        <Col lg={6}>
          <Card className="cardcolor">
            <Card.Body>
              <div>
                <label>
                  <span style={{ color: "white" }}>Mobile no:</span>
                </label>
              </div>
              <br />
              <FormControl
                className="inputpassword"
                type="text"
                required
                name="number"
                value={pass.number}
                onChange={handleChange}
                minLength={10}
                maxLength={10}
              />
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                {!sended && (
                  <button className="login-button" onClick={handleSubmit}>
                    Enter OTP
                  </button>
                )}
                {sended && (
                  <>
                    <FormControl
                      className="inputpassword"
                      type="text"
                      required
                      name="otp"
                      value={otpverify.otp}
                      onChange={handleOtpChange}
                      minLength={6}
                      maxLength={6}
                    />
                    <button className="login-button" onClick={handleVerify}>
                      Verify OTP
                    </button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}></Col>
      </Row>
      <Row style={{ height: "20vh" }}></Row>
    </Container>
  );
};

export default ForgotPassword;