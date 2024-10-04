import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, FormControl, Offcanvas, Row, Container, Nav, Navbar, Card, Button, CardBody } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import apiUrl from "./api";
const Topnavbar = () => {
  const [data, setData] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [show, setShow] = useState(false);
  const [detailtop, setDetailtop] = useState([]);
  const [categoryhandle, setCategoryhandle] = useState([])
  const [showcategory, setShowcategory] = useState([]);
  const [showlogout, setShowlogout] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navtoshow = useNavigate();
  const navtoclear = useNavigate();
  const [searchinp, setSearchinp] = useState();
  const [getonepoll, setGetonepoll] = useState([]);
  const navtoone = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const userinpf = sessionStorage.getItem("UserData");
      console.log(userinpf);
      // console.log(userData);
      // console.log(userData);
      // sessionStorage.setItem('original', window.location.href);
      if (userinpf) {
        const parsedUserData = JSON.parse(userinpf);
        setCurrentUser(parsedUserData._id);
        setData(parsedUserData.user_name);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchtop = async () => {
      const store = await axios.get(`${apiUrl}/polls/top3`);
      if (store.data) {
        setDetailtop(store.data);
      }
    };
    fetchtop();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${apiUrl}/category/getall`);
        if (response.data) {
          setCategoryhandle(response.data);
        }
      } catch (error) {
        console.log("api is NO", error);
      }

    }
    fetchdata();
  }, []);



  const showonepoll = async (id) => {
    try {

      console.log("enterincard")
      const onepoll = await axios.post(`${apiUrl}/polls/getone`, {
        poll_id: id,
        user_id: currentUser
      })

      let xx = onepoll?.data;
      setGetonepoll(xx);
      console.log(getonepoll);
      navtoone('/HomePage', { state: { xx } });
    }
    catch (e) {

    }
  }

  const Showid = async (id) => {
    try {
      const categorywise = await axios.post(`${apiUrl}/polls/getbycategory`, {
        category: id
      })
      let x = categorywise?.data;

      setShowcategory(x);

      navtoshow("/HomePage", { state: { x } })

      console.log("passed")
    }
    catch (error) {
      console.log("navigation log of error", error);
    }
  }
  const handlelogout = () => {

    sessionStorage.clear();
    navtoclear('/');

  };
  //  const handlesearchinp=(e)=>{
  //     setSearchinp(e.tarsessionStorage.clear();
  //  }

  const handleNavigation = () => {
    navtoone('/HomePage')
  };
  const handleNavigation1 = () => {
    navtoone("/Addpoll");
  }
  const handleNavigation2 = () => {
    navtoone('/Profilepage');
  }

  return (
    <>
      {/* Top Navbar (always visible) */}
      <Navbar className="bg-body-tertiary " style={{ position: 'fixed', top: '0', left: '0', width: "100%", zIndex: 20, padding: '0' }} expand="lg">
        <Container fluid className="navstyle">

          <Navbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar" />
          <Navbar.Collapse className="d-none d-lg-flex justify-content-between">
            <Navbar.Brand href="#" style={{ margin: "0px", padding: "0px" }} className="pollingmain">
              Polling Booth
            </Navbar.Brand>
            <FormControl className="searchstyle"
              style={{ width: "50%" }}
              placeholder="Search...."
              onChange={(e) => {
                setSearchinp(e.target.value);  // Update search input value
                navtoclear('/Homepage', { state: { searchinp: e.target.value } });  // Navigate and pass the search input
              }}

              value={searchinp}
            />
            {/* <Button  style={{marginRight:'5%'}}onClick={handleNavigation}>search</Button> */}
            <h2 className="pollingmain">Welcome {data ? `${data}` : `Guest`}!!</h2>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas for Mobile View */}
      <Offcanvas show={show} onHide={handleClose} id="offcanvasNavbar" style={{background:'#013a63'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="pollingmain">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
          <Nav className="flex-column">
            <Nav.Link
              style={{ fontSize: "20px",color:'white',paddingLeft:'100px' }}
              
              onClick={handleNavigation} // Calls the function when clicked
            >
              POLL LIST
            </Nav.Link>
           <hr style={{color:'white'}}/>
            <Nav.Link
              style={{ fontSize: "20px", color:'white',paddingLeft:'100px'}}
             
              onClick={handleNavigation1}
            >
              ADD POLL
            </Nav.Link>
            <hr style={{color:'white'}}/>
            <Nav.Link
              style={{ fontSize: "20px", color:'white' ,paddingLeft:'100px'}}
             
              onClick={handleNavigation2}
            >
              USER DETAILS
            </Nav.Link>
            <hr style={{color:'white'}}/>

            <FormControl
              style={{ width: "100%",marginBottom:'10px',borderRadius:'10px' }}
              placeholder="Search...."
              onChange={(e) => {
                setSearchinp(e.target.value);  // Update search input value
                navtoclear('/Homepage', { state: { searchinp: e.target.value } });  // Navigate and pass the search input
              }}

              value={searchinp}
            />

            <h2 className="pollingmain">Welcome {data ? `${data}` : `Guest`}!!</h2>
            {detailtop.map((item) => (
              <Card key={item._id} className="mb-3 cardcolor" style={{ width: '100%' }} onClick={() => showonepoll(item._id)}>
                <Card.Body>
                  <Card.Title>{item.question}</Card.Title>
                  <Card.Text>
                    <strong>Total Votes:</strong> {item.totalVotes}
                  </Card.Text>
                  <Card.Text>
                    <strong>Total Likes:</strong> {item.totalLikes}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
            {categoryhandle.map((portion) => (
              <div key={portion._id}>
                <Row>

                  <button className='categoryshow' onClick={() => Showid(portion._id)} style={{ height: '50%', marginBottom: '10px' }}>{portion.category_name}</button>

                </Row>

              </div>
            ))}
            <button className='logbut' onClick={handlelogout}>Logout</button>

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar for Laptop/Desktop View */}
      <Container fluid>
        {/* <Row>
        <Navbar.Brand href="#" style={{ margin: "0px", padding: "0px" }}>
            Polling Booth
          </Navbar.Brand>
        </Row> */}
        <Row>
          {/* Sidebar (only visible on large screens) */}
          <Col lg={3} className="d-none d-lg-block  p-3 sidenavstyle" style={{ position: 'fixed', top: '8vh', left: '0', height: '100vh', width: '25%' }}>
            <Nav className="flex-column " style={{ color: "white" }}>
              <Nav.Link
                style={{ fontSize: "20px" }}
                className="btn btn-primary polllistbut"
                onClick={handleNavigation}
              >
                POLL LIST
              </Nav.Link>
              <hr />
              <Nav.Link
                style={{ fontSize: "20px" }}
                className="btn btn-primary  polllistbut"
                onClick={handleNavigation1}
              >
                ADD POLL
              </Nav.Link>
              <hr />
              <Nav.Link
                style={{ fontSize: "20px" }}
                className="btn btn-primary polllistbut"
                onClick={handleNavigation2}
              >
                USER DETAILS
              </Nav.Link>
              <hr />
              {categoryhandle.map((portion) => (
                <div key={portion._id}>
                  <Row>

                    <button className='categoryshow' onClick={() => Showid(portion._id)} style={{ height: '50%', marginBottom: '10px' }}>{portion.category_name}</button>

                  </Row>

                </div>
              ))}
              <button className='logbut' onClick={handlelogout}>Logout</button>


            </Nav>
          </Col>


          {/* Main Content Area */}
          <Col lg={9} className="p-3" style={{ marginLeft: '25%' }}>
            {/* Main content would go here */}


          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Topnavbar;
