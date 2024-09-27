import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, FormControl, Offcanvas, Row, Container, Nav, Navbar, Card, Button, CardBody } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
const Topnavbar = () => {
  const [data, setData] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [show, setShow] = useState(false);
  const [detailtop, setDetailtop] = useState([]);
  const [categoryhandle, setCategoryhandle] = useState([])
  const [showcategory, setShowcategory] = useState([]);
  const[showlogout,setShowlogout]=useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navtoshow = useNavigate();
  const navtoclear = useNavigate();
  const[searchinp,setSearchinp]=useState();
  const[getonepoll,setGetonepoll]=useState([]);
  const navtoone=useNavigate();
 
  useEffect(() => {
    const getUser = () => {
      const userData = sessionStorage.getItem("UserData");
      sessionStorage.setItem('original',window.location.href);
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setCurrentUser(parsedUserData._id);
        setData(parsedUserData.user_name);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchtop = async () => {
      const store = await axios.get('http://localhost:5000/polls/top3');
      if (store.data) {
        setDetailtop(store.data);
      }
    };
    fetchtop();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:5000/category/getall');
        if (response.data) {
          setCategoryhandle(response.data);
        }
      } catch (error) {
        console.log("api is NO", error);
      }

    }
    fetchdata();
  }, []);



 const showonepoll=async(id)=>{
  try{

    console.log("enterincard")
    const onepoll=await axios.post('http://localhost:5000/polls/getone',{
            poll_id:id,
            user_id:currentUser
    })
    
      let xx=onepoll?.data;
       setGetonepoll(xx);
       console.log(getonepoll);
    navtoone('/HomePage',{state:{xx}});
  }
  catch(e){

  }
 }

  const Showid = async (id) => {
    try {
      const categorywise = await axios.post('http://localhost:5000/polls/getbycategory', {
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
  ;
};
  
  return (
    <>
      {/* Top Navbar (always visible) */}
      <Navbar className="bg-body-tertiary" style={{ position: 'fixed', top: '0', left: '0', width: "100%" }} expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" style={{ margin: "0px", padding: "0px" }}>
            Polling Booth
          </Navbar.Brand>
          <Navbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar" />
          <Navbar.Collapse className="d-none d-lg-flex justify-content-end">
            <FormControl
              style={{ width: "50%", marginRight: "55px" }}
              placeholder="Search"
              onChange={(e) => {
                setSearchinp(e.target.value);  // Update search input value
                navtoclear('/Homepage', { state: { searchinp: e.target.value } });  // Navigate and pass the search input
              }}
              
              value={searchinp}
            />
            {/* <Button  style={{marginRight:'5%'}}onClick={handleNavigation}>search</Button> */}
            <h2>Welcome {data ? `${data}` : `Guest`}!!</h2>
           
         </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas for Mobile View */}
      <Offcanvas show={show} onHide={handleClose} id="offcanvasNavbar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              style={{ color: "black", fontSize: "20px", fontWeight: "700" }}

              href="/HomePage"
            >

              POLL LIST
            </Nav.Link>

            <hr />
            <Nav.Link
              style={{ color: "black", fontSize: "20px", fontWeight: "700" }}
              href="/Addpoll"
            >
              ADD POLL
            </Nav.Link>
            <hr />
            <Nav.Link
              style={{ color: "black", fontSize: "20px", fontWeight: "700" }}
              href="/Profilepage"
            >
              USER DETAILS
            </Nav.Link>
            <hr />
            
            <FormControl
              style={{ width: "100%", marginBottom: "10px" }}
              placeholder="Search"
              onChange={(e) => setSearchinp(e.target.value)} 
            />
            
            <h2>Welcome {data ? `${data}` : `Guest`}!!</h2>
            {detailtop.map((item) => (
              <Card key={item._id} className="mb-3" style={{ width: '100%' }} onClick={()=>showonepoll(item._id)}>
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
          <Col lg={3} className="d-none d-lg-block bg-light p-3" style={{ position: 'fixed', top: '8vh', left: '0', height: '100vh' }}>
            <Nav className="flex-column">
              <Nav.Link
                style={{ color: "black", fontSize: "20px", fontWeight: "700" }}
                href="/HomePage"
              >
                POLL LIST
              </Nav.Link>
              <hr />
              <Nav.Link
                style={{ color: "black", fontSize: "20px", fontWeight: "700" }}
                href="/Addpoll"
              >
                ADD POLL
              </Nav.Link>
              <hr />
              <Nav.Link
                style={{ color: "black", fontSize: "20px", fontWeight: "700" }}
                href="/Profilepage"
              >
                USER DETAILS
              </Nav.Link>
              <hr />
              {categoryhandle.map((portion) => (
                <div key={portion._id}>
                  <Row>

                    <Button onClick={() => Showid(portion._id)} style={{ width: '50%', height: '50%', marginBottom: '5px' }}>{portion.category_name}</Button>

                  </Row>

                </div>
              ))}
              <Button style={{color:'black',backgroundColor:'red',fontSize:'20px',fontWeight:'700',width:'50%'}} onClick={handlelogout}>Logout</Button>


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
