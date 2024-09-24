import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import Swal from "sweetalert2";
import api from "./api";
import { useNavigate } from "react-router-dom";
import './Bodystyle.css';

const LoginPage = () => {

  const navi = useNavigate();
  const navi2 = useNavigate();
  const [validpas, setValidpas] = useState();
  const [validph, setValidph] = useState();
  const [addof, setAddof] = useState(false);
  const [details, setDetails] = useState({
    phone_number: "",
    password: "",
  });
  let passwordcheck = /^[a-zA-z0-9]{6}$/;
  let phonenumber_check = /^\d{10}$/;
  const handleChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let erroris = false;
    if (!details.phone_number) {
      setValidph("phonenumber is required")
      erroris = true;
    }
    else if (!phonenumber_check.test(details.phone_number)) {
      setValidph("Invalid phonenumber");
      erroris = true;
    }
    else {
      setValidph('');
    }
    if (!details.password) {
      setValidpas("password is required")
      erroris = true;
    }
    else if (!passwordcheck.test(details.password)) {
      setValidpas("invalid password");
      erroris = true;
    }
    else {
      setValidpas("")
    }
    if (!erroris) {
      setAddof(true)
    }
    sessionStorage.setItem("user", details.phone_number)
    try {
      const response = await axios.post(
        `${api}/log/loginuser`,
        details
      );

      if (response.status === 200) {
        const SaveUser = response.data.user;
        // console.log("SaveUser",SaveUser)
        sessionStorage.setItem("UserData", JSON.stringify(SaveUser))
        const sessionuser=sessionStorage.getItem('UserData');
        if (sessionuser) {
          Swal.fire({
            title: "Good job!",
            text: "Category has been successfully added!",
            icon: "success",
          });
          navi("/HomePage")
        }

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
  const handlePassword = (e) => {
    navi2('/ForgotPassword')
  }
  const Signbut = () => {
    navi('/Signup')
  }

  return (
    <Container fluid className="bodyyy">
      <Row
        style={{
          height: '20vh',
          paddingLeft: "15vw",
          fontWeight: "2000px",
          paddingTop: "3.8vw",
        }}
      >
        <Col style={{ fontFamily: "sans-serif" }} xs={6} lg={4}>
          <button className="pollingbooth"> POLLING BOOTH </button>

        </Col>
        <Col xs={2} lg={5}></Col>
        <Col xs={4} lg={3}>
          <Button onClick={Signbut} style={{ padding: "5%" }}> Sign up</Button>
        </Col>
      </Row>
      <Row style={{ height: "60vh" }}>
        <Col lg={3} xs={12}></Col>
        <Col lg={6} xs={12}>
          <Card className='Loginpageeee'>
            <h1 className="Login">LOGIN</h1>
            <div></div>
            {!addof &&
              <>
                <Form.Label className="">Mobile No:
                </Form.Label>
                <FormControl
                  name="phone_number"
                  type="text"
                  value={details.phone_number}
                  placeholder="Enter Your Mob no"
                  onChange={handleChange}
                />
                <p style={{ color: "red" }} className='p1'>{validph}</p>
                <br />
                <Form.Label className="formpassword">Password:</Form.Label>
                <FormControl
                  name="password"
                  type="password"
                  value={details.password}
                  placeholder="Enter your Password"
                  onChange={handleChange}
                />
                <p style={{ color: "red" }} className='p1'>{validpas}</p>
                <br />
                <Button className="submit" onClick={handleSubmit}>Login</Button>
                <br />
                <br />
                <button className="forgotpassword" onClick={handlePassword}>Forgot Password?</button>
              </>}


          </Card>
        </Col>
        <Col lg={3} xs={12}></Col>
      </Row>
      <Row style={{ height: "20vh" }}></Row>
    </Container>
  )

};

export default LoginPage;