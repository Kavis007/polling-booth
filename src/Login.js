
import axios from "axios";
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Row,
} from "react-bootstrap";
import Swal from "sweetalert2";
import apiUrl from "./api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Loginpage/Login.css";
import pollimage from "../src/pollinglogo.png";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth , provider } from './firebaseconfig';
import google from '../src/googlelogo.png';

const LoginPage = () => {
  const navi = useNavigate();
  const formik = useFormik({
    initialValues: {
      phone_number: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone_number: Yup.string()
        .required("Required field")
        .matches(/^\d{10}$/, "Invalid phone number"),
      password: Yup.string()
        .required("Required field")
        .min(6, "Password must be at least 6 characters long"),
    }),
    onSubmit: async (values) => {
      sessionStorage.setItem("user", values.phone_number);
      try {
        const response = await axios.post(`${apiUrl}/log/loginuser`, values);
        if (response.status === 200) {
          const SaveUser = response.data.user;
          console.log("SaveUser", SaveUser);
          sessionStorage.setItem("UserData", JSON.stringify(SaveUser));
          Swal.fire({
            title: "Good job!",
            text: "Log in successfully!",
            icon: "success",
          });
          navi("/HomePage");
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
    },
  });

  const handleSignup = () => {
    navi("/Signup");
  };

  const handlePassword = () => {
    navi("/ForgotPassword");
  };
  const handleGoogleSignIn = async () =>{
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      const createapi=await axios.post(`${apiUrl}/api/createuser`,{
        user_name:user.displayName,
        email:user.email,
        phone_number:user.email
      })
      const userincreate=createapi.data.savedUser || createapi.data.existingUser;
      sessionStorage.setItem('UserData', JSON.stringify(userincreate));
      navi('/HomePage')
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      alert('Google Sign-In failed. Please try again.')
    }
  }

  return (
    <div className="LoginBody" style={{ height: "85vh" }}>
      <Container style={{ height: "100vh"}}>
        <Row style={{height:"10vh"}}>

        </Row>
        <Row>
          <Col xs={12} md={1} xl={1} lg={1} style={{}}></Col>
          <Col xs={12} md={5} xl={5} lg={5} style={{marginTop:'30px'}}>
            <img src={pollimage} style={{ height: "100%", width: "100%" }}></img>
          </Col>
          {/* <Col xs={12} md={1} xl={1} lg={1}></Col> */}
          <Col xs={12} md={5} xl={5} lg={5} style={{marginTop:"9vh"}}>
            <Card className="cardcolor" style={{paddingLeft:'20px'}}>
              <h1 style={{ color: "white" }}>LOGIN</h1>
              <h6 style={{paddingTop: "20px" }}>
                Phone no:
              </h6>
              <FormControl
                className="inputpassword"
                name="phone_number"
                type="text"
                value={formik.values.phone_number}
                placeholder="Enter Your Mob no"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required={10}
                minLength={10}
                maxLength={10}
              />
              {formik.touched.phone_number && formik.errors.phone_number ? (
                <div style={{ color: "red" }} className="error-message">
                  {formik.errors.phone_number}
                </div>
              ) : null}

              <br />
              <h6 style={{ }}>Password:</h6>
              <FormControl
                className="inputpassword"
                name="password"
                type="password"
                value={formik.values.password}
                placeholder="Enter your Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required={6}
                minLength={6}
                maxLength={6}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }} className="error-message">
                  {formik.errors.password}
                </div>
              )}
              <br />
              <div className="d-flex allign-items-center justify-content-center" >
              <Button className="login-button" onClick={formik.handleSubmit}>
                Login
              </Button>
              </div>
              
              
              <br />
              <div className="d-flex allign-items-center justify-content-center">
              <img src={google} alt='gpic' className='gpic' onClick={handleGoogleSignIn} ></img>
              </div>
             
              <br />
              <button className="forgotpassword" onClick={handlePassword}>
                Forgot Password?
              </button>
            </Card>
          </Col>
          <Col xs={12} md={1} xl={1} lg={1} className='last_column_in_auth'>
          <div className="d-flex allign-item-center justify-content-center">
          <Button
            className="signin-button"
              onClick={handleSignup}
              
            >
              Sign up
            </Button>
          </div>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
