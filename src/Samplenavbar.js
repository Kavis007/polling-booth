import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormControl, Offcanvas } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Samplenavbar = () => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    useEffect(() => {
        const getUser = () => {
            const userData = sessionStorage.getItem("UserData");
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                setCurrentUser(parsedUserData._id);
                setData(parsedUserData.user_name);
            }
        };
        getUser();
    }, []);
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid style={{width:"40%"}}>
                <Navbar.Brand href="#">Polling booth</Navbar.Brand>
                <Navbar.Toggle onClick={handleShow} />
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body >

                        <div >
                            <Nav.Link style={{ color: 'black', fontSize: '20px', fontWeight: '700' }} href="/HomePage">POLL LIST</Nav.Link>
                            <br />
                            <hr />
                            <Nav.Link style={{ color: 'black', fontSize: '20px', fontWeight: '700' }} href='/Addpoll'>ADD POLL</Nav.Link>
                            <br />
                            <hr />
                            <Nav.Link style={{ color: 'black', fontSize: '20px', fontWeight: '700' }} href="#link">VOTED POLLS</Nav.Link>
                            <br />
                            <hr />
                            <Nav.Link style={{ color: 'black', fontSize: '20px', fontWeight: '700' }} href="#link">USER DETAILS</Nav.Link>
                            <br />
                            <hr />
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
                </Container>
                <Container>
                <Navbar style={{ height: '15vh' }} expand="lg">
                <FormControl style={{ width: '100%', marginBottom:"10px" }} placeholder="Search"></FormControl>

                    <h2   >Welcome {data ? `${data}` : `guest`}!!</h2>

                </Navbar>
                </Container>
            
        </Navbar>
    )
}

export default Samplenavbar
