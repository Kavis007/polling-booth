import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Otppage from './Otppage';
import { useNavigate } from 'react-router-dom';
import api from './api';
const Signup = () => {
    const [addph, setAddph] = useState(false)
    const [verify, setVerify] = useState(false)
    const [sig, setSig] = useState(false)
    let [state1, setState1] = useState({
        user_name: "",
        email: "",
        age: null,
        gender: "",
        password: "",
        phone_number: null,
    })
    let [otp, setOtp] = useState()
    let navv = useNavigate()
    let [validname, setValidname] = useState()
    let [validemail, setValidEmail] = useState()
    let [vaidage, setValidage] = useState()
    let [validgender, setValidgender] = useState()
    let [validpassword, setValidpassword] = useState()
    let [phonenumber, setPhoneNumber] = useState()
    let eemail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/
    let passwordcheck = /^[a-zA-z0-9]{6}$/

    const HandleChange = (e) => {
        const { name, value } = e.target
        setState1((prevState) => ({
            ...prevState,
            [name]: value
        }));
        // setState1({ ...state1, [e.target.name]: e.target.value })

        switch (name) {
            case 'user_name':
                setValidname('');
                break;
            case 'email':
                setValidEmail('');
                break;
            case 'age':
                setValidage('');
                break;


            case 'password':
                setValidpassword('');
                break;
            default:
                break;
        }
    };
    const Genotp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api}/mobileauth/send-otp-sms`, {
                number: state1.phone_number,
                appName: "POLL APP"
            }
            )
            if (response.status === 200) {

                Swal.fire({
                    title: "Good job!",
                    text: "otp has been successfully sended!",
                    icon: "success",

                });
                setVerify(true);
                setSig(true)


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

    }
    const VerifyOtp = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${api}/mobileauth/verify-otp-sms`, {
                number: state1.phone_number,
                otp: otp
            })
            if (response.status === 200) {

                Swal.fire({
                    title: "Good job!",
                    text: "otp has been successfully sended!",
                    icon: "success",

                });
                setVerify(true);
                setSig(false)

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

    }

    const Handlesubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate inputs
        let hasErrors = false;

        if (!state1.user_name) {
            setValidname("Name is required");
            hasErrors = true;
        } else {
            setValidname("");
        }

        if (state1.email === '') {
            setValidEmail("Email is required");
            hasErrors = true;
        } else if (!eemail.test(state1.email)) {
            setValidEmail("Invalid email");
            hasErrors = true;
        } else {
            setValidEmail("");
        }

        if (!state1.age) {
            setValidage("Date of birth is required");
            hasErrors = true;
        }
        else {
            setValidage("");
        }

        if (!state1.password) {
            setValidpassword("Password is required");
            hasErrors = true;
        } else if (!passwordcheck.test(state1.password)) {
            setValidpassword("Invalid password");
            hasErrors = true;
        } else {
            setValidpassword("");
        }

        // If there are no errors, proceed with setting `addph` to `true`
        if (!hasErrors) {
            setAddph(true);
        }
    };
    const Handlesubmit1 = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post(`${api}/api/createuser`, state1);
            if (response.status === 201) {
                Swal.fire({
                    title: "Good job!",
                    text: "User has been successfully added!",
                    icon: "success",
                });
                navv('/')

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
    }
    const Loginbut = () => {
        navv('/')
    }
    return (
        <Container fluid style={{ height: "100vh" }}>
            <Row style={{ height: "10vh" }} >
                <Col xs={6} md={6} lg={7} xl={7}>
                    <p className='m-3' style={{ fontSize: "4vh" }}>POLLING BOOTH</p>
                </Col>
                <Col xs={6} md={6} lg={5} xl={5} className="d-flex justify-content-end">
                    <Button onClick={Loginbut} className='b1' variant="light">Login</Button>
                </Col>
            </Row>
            <Row className="" style={{ height: "90vh" }}>
                <Col xs={12} md={4} lg={4} className="d-none d-md-block"></Col>

                <Col xs={12} md={5} lg={4} className="d-flex justify-content-center">
                    <Card style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
                        <h2 className="text-center mb-4">CREATE YOUR ACCOUNT!</h2>
                        <form onSubmit={Handlesubmit}>
                            <div>{!addph &&
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" id="user_name" name="user_name" value={state1.Name} className="form-control" placeholder="Enter your name" onChange={HandleChange} />

                                        <p style={{ color: "red" }} className='p1'>{validname} </p>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" name="email" value={state1.email} className="form-control" placeholder="Enter your email" onChange={HandleChange} />
                                        <p style={{ color: "red" }} className='p1'>{validemail}</p>
                                    </div>

                                    <Row className="mb-3">
                                        <Col>
                                            <label htmlFor="dob" className="form-label">Age</label>
                                            <input type="date" id="age" name="age" value={state1.age} className="form-control" onChange={HandleChange} />
                                            <p style={{ color: "red" }} className='p1'>{vaidage}</p>
                                        </Col>
                                        <Col>
                                            <label htmlFor="gender" className="form-label">Gender</label>
                                            <select id="gender" name="gender" value={state1.gender} className="form-select" onChange={HandleChange}>
                                                <option value="" disabled hidden>Select Gender</option>
                                                <option value='male'>Male</option>
                                                <option value='female'>female</option>
                                                <option value='others '>others</option>
                                            </select>
                                        </Col>
                                    </Row>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={state1.password}
                                            placeholder="*****"
                                            onChange={HandleChange}
                                            required
                                            minLength={6}
                                            maxLength={6}
                                        />

                                        <p style={{ color: "red" }} className='p1'>{validpassword}</p>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="confirmpassword" className="form-label">Confirm password</label>
                                        <input type="password" id="confirmpassword" value={state1.confirmpassword} name="confirmpassword" className="form-control" placeholder="*****" onChange={HandleChange} 
                                         required
                                         minLength={6}
                                         maxLength={6}/>
                                    </div>

                                    <div className="mb-3 d-flex justify-content-center">
                                        <Button onClick={Handlesubmit}>Go to stage2</Button>
                                    </div>
                                </>
                            }
                            </div>
                            <div>

                                {addph &&
                                    <>
                                        <label className='form-label'>Phonenumber</label>
                                        <input type='text' id="phonenumber" value={state1.phone_number} name="phone_number" className='form-control' placeholder="enter phone number" onChange={HandleChange} />
                                        <div className='mb-5 d-flex justify-content-center'>

                                            {!verify &&
                                                <>
                                                    <Button onClick={Genotp}>Send OTP</Button>
                                                </>
                                            }
                                        </div>

                                        <div>
                                            {(verify && sig) &&
                                                <>
                                                    <label className='form-label'>Enterotp</label>
                                                    <input type='number' id="otp" value={otp} name="otp" className='form-control' placeholder='enter otp' onChange={(e) => setOtp(e.target.value)} />
                                                    <Button onClick={VerifyOtp}>verify  OTP</Button>
                                                </>
                                            }
                                        </div>
                                        <div>
                                            {!sig &&
                                                <>
                                                    <Button onClick={Handlesubmit1}>Sign in</Button>
                                                </>
                                            }
                                        </div>
                                    </>
                                }
                            </div>
                        </form>
                    </Card>
                </Col>

                <Col xs={12} md={3} lg={4} className="d-none d-md-block"></Col>
            </Row>
        </Container>
    );
};

export default Signup;