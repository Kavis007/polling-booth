import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from 'react-router-dom';
const Navigationpage = () => {
  return (
    <Container fluid style={{height:"100vh",position:'fixed',width:'auto',top:'0',left:'0',paddingTop:'30px'}}>
    <Row style={{ height: "10vh" }}>
    </Row>
    <Row>
    <Col lg={12}>
    <Navbar expand="lg">
          <Container>
                <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <div >
                  <Nav.Link style={{color:'black',fontSize:'20px',fontWeight:'700'}} href="/HomePage">POLL LIST</Nav.Link>
                  <br />
                  <hr/>
                  <Nav.Link style={{color:'black',fontSize:'20px',fontWeight:'700'}} href='/Addpoll'>ADD POLL</Nav.Link>
                  <br />
                  <hr/>
                  <Nav.Link style={{color:'black',fontSize:'20px',fontWeight:'700'}} href="#link">VOTED POLLS</Nav.Link>
                  <br />
                  <hr/>
                  <Nav.Link style={{color:'black',fontSize:'20px',fontWeight:'700'}} href="#link">USER DETAILS</Nav.Link>
                  <br />
                  <hr/>
                </div>
              </Nav>
            </Navbar.Collapse>
            </Col>
          </Container>     
        </Navbar>
        </Col>
        </Row>
</Container>
  )
}

export default Navigationpage
