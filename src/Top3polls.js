import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Offcanvas, Button } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from 'react-router-dom';

const Top3polls = () => {
  const [detailtop, setDetailtop] = useState([]);
  const [show, setShow] = useState(false);
  const[getonepoll,setGetonepoll]=useState([]);
  const navtoone=useNavigate();
  const[currentUser,setCurrentUser]=useState();
  const[data,setData]=useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  const showonepoll=async(id)=>{
    try{
  
      console.log("enterincard")
      const onepoll=await axios.post('http://localhost:5000/polls/getone',{
              poll_id:id,
              user_id:currentUser
      })
      
        let xx=onepoll?.data;
         setGetonepoll(xx);
         console.log(xx);
      navtoone('/HomePage',{state:{xx}});
    }
    catch(e){
  
    }
   }

  return (
    <>
     
  
      <div className="d-none d-md-block">
        <Container 
          className="my-4"
          style={{ position: 'fixed', width: '20%', height: '100%', top: '0', right: '0', paddingTop: '30px' }}>
          <h3 className='Trendpollstyle'>Trending Polls</h3>
          {detailtop.map((item) => (
            <Card key={item._id} className="mb-3" style={{width:'100%'}} onClick={()=>showonepoll(item._id)}>
              <Card.Body>
                <Card.Title>{item.question}</Card.Title>
                <Card.Text >
                  <strong>Total Votes:</strong> {item.totalVotes}
                </Card.Text>
                <Card.Text>
                  <strong>Total Likes:</strong> {item.totalLikes}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>
    </>
  );
};

export default Top3polls;
