import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Offcanvas, Button } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import apiUrl from "./api";
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
      const store = await axios.get(`${apiUrl}/polls/top3`);
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
  const showonepoll = async (xx) => {
    try {
      console.log("Data being passed:", xx); // Log to check the data
      navtoone('/HomePage', { state: { xx } }); // Pass xx to HomePage
    } catch (error) {
      console.log("Error navigating:", error);
    }
  };
  // const showonepoll=async(xx)=>{
  //   try{
  
  //     // console.log("enterincard")
  //     // const onepoll=await axios.post(`${apiUrl}/polls/getone`,{
  //     //         poll_id:id,
  //     //         user_id:currentUser
  //     // })
      
       
  //       //  setGetonepoll(xx);
  //        console.log(xx);
  //     navtoone('/HomePage',{state:{xx}});
  //   }
  //   catch(e){
  
  //   }
  //  }

  return (
    <>
     
  
      <div className="d-none d-md-block">
        <Container 
          className="my-4"
          style={{ position: 'fixed', width: '20%', height: '100%', top:'8%', right: '0', paddingTop: '30px' }}>
          <h3 className='Trendpollstyle'>Trending Polls</h3>
          {detailtop.map((item) => (
            <Card key={item._id} className="mb-3 cardintrend" style={{width:'100%'}} onClick={()=>showonepoll(item)}>
              <Card.Body>
                <span>{item.question}</span>
                <Card.Text >
                  <span>Total Votes:</span> {item.totalVotes}
                </Card.Text>
                <Card.Text>
                  <span>Total Likes:</span> {item.totalLikes}
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
