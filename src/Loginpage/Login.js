import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import API_BASE_URL from '../api';

const Loginpage = () => {
    const {setLoggedIn} = useContext(AuthContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone_number: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'phone_number') {
            const numericValue = value.replace(/[^0-9]/g, '');
            if (numericValue.length <= 10) {
                setFormData({ ...formData, [name]: numericValue });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/log/loginuser`, formData);

            if (response && response.status === 200) {
                const userData = response.data.user;
                sessionStorage.clear();
                sessionStorage.setItem('userData', JSON.stringify(userData));
                setLoggedIn(true);
                navigate('/');
            } else if (response.status === 400) {
                setLoggedIn(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Incorrect phone number or password. Please try again.',
                });
            }
        } catch (error) {
            setLoggedIn(false);
            console.error('Error during login:', error);
            // Handle errors where response or response.data might be undefined
            const errorMessage = error.response?.data?.message || 'An error occurred on the server. Please try again later.';
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: errorMessage,
            });
        }
    }

    const handlesignup = () => {
        navigate('/signup');
    };

    const continueWithForgot = () => {
        navigate('/forgot');
    }

    function continueWithGoogle() {
        window.location.href = `${API_BASE_URL}/auth/google`;
    }
    return (
        <div>
            <Container fluid className='div_of_the_loginpage'>
                <Container className='inner_div_login'>
                    <Row>
                        <Col xs={12} md={6} xl={6} lg={6}>
                            <img src={logo} className='logo_in_loginpage' alt="Logo" />
                        </Col>
                        <Col xs={12} md={6} xl={6} lg={6}>
                            <Card className="shadow-lg card_login_form float-end" style={{ fontFamily: 'Arial, sans-serif', color: '#A8DD51', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                                <Card.Body>
                                    <h3 className="gradient-heading">Login Page</h3>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="phone_number">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone_number"
                                                value={formData.phone_number}
                                                onChange={handleChange}
                                                style={{ border: '2px solid rgb(0, 0, 0)' }}
                                                placeholder="Enter phone number"
                                                maxLength={10}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                style={{ border: '2px solid rgb(0, 0, 0)' }}
                                                placeholder="Enter password"
                                                maxLength={6}
                                                required
                                            />
                                        </Form.Group>
                                        <br />
                                        <Button className='gradient-button' type="submit" style={{ width: '100%' }}>
                                            Login
                                        </Button>
                                    </Form>
                                    <hr />
                                    Not a user? &nbsp;
                                    <Button className='gradient-button m-2' onClick={continueWithForgot}>Forgot password</Button>
                                    <Row style={{ width: '100%' }}>
                                        <Col>
                                            <Button className='gradient-button w-100 m-2' onClick={handlesignup}><i className="bi bi-phone-fill fs-6 "></i> Sign up</Button>
                                        </Col>
                                        <Col>
                                            <Button className='gradient-button w-100 m-2' onClick={continueWithGoogle}><i className="bi bi-google fs-6 "></i> &nbsp;Google</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    )
}

export default Loginpage