import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import gif from "../images/clientview.gif";
import sample from "../images/sample.gif";
import PollingComponent from '../Poll/Pollcontainer';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../api';
import Swal from 'sweetalert2';

const Userdetails = () => {
  const { profile, setProfile ,profile1, setProfile1profile1, setProfile1,
    profile2, setProfile2,
    profile3, setProfile3,
    profile4, setProfile4} = useContext(AuthContext);
  const [user, setUser] = useState({
    user_name: "",
    phone_number: "",
    email: "",
    user_id: "",
    _id: ""
  });

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    try {
      if (userData) {
        const local = JSON.parse(userData);
        setUser(prev => ({
          ...prev,
          user_name: local.user_name,
          phone_number: local.phone_number,
          email: local.email,
          user_id: local.user_id,
          _id: local._id
        }));
      }
    } catch (error) {
      console.error("Error parsing userData from sessionStorage:", error);
    }
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = user._id;
      const current_user = user._id;
      if (userId) {
        try {
          const response = await axios.post(`${API_BASE_URL}/api/getProfile`, {
            user_id: userId,
            current_user: current_user
          });
          setProfile("")
          setProfile(response.data.user);
          setProfile1(response.data.user.created_polls)
          setProfile2(response.data.user.liked_polls)
          setProfile3(response.data.user.voted_polls)
          setProfile4(response.data.user.commented_polls)
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user._id, setProfile]);

const [imageFile, setImageFile] = useState(null);
const [view, setView] = useState(false);

const uploadimageHandler = (image) => {
        setImageFile(image);
    }
const profileUpload = async (image) => {
      try {
          const formd1 = new FormData();
          formd1.append('profile', image);

          const response = await axios.post(`${API_BASE_URL}/api/uploadprofile`, formd1, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

          const imageUrl = response.data.profile || '';
          console.log('Image URL:', imageUrl);

          return imageUrl;
      } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
      }
  };
  // const imageUrl = await profileUpload(imageFile);
  
  const handleEdit =async (identifier)=>{
    const imageUrl = await profileUpload(imageFile);
    const upload = await axios.post(`${API_BASE_URL}/api/updateuser`,{
      identifier:identifier,
      user_profile:imageUrl
    })
    if(upload.status == 200){
      Swal.fire({
        title: 'Profile Updated',
        text: 'Successfully updated your profile',
        icon: 'success',
      });
    }
    
  }
  console.log(`${API_BASE_URL}${profile.user_profile}`);
  const viewUpload =() =>{
    setView(!view)
  }
  return (
    <>
      <Container fluid className='user_container_outer mb-4'>
        <Card className='user_card' style={{ height: "auto" }}>
          <Row>
            <Col xs={12} md={5} lg={5} xl={5}>
            <Row>
            <Col xs={12} md={12} lg={12} xl={12}>
                <Card.Img
                    variant="top"
                    src={profile.user_profile ? `${API_BASE_URL}${profile.user_profile}` : gif}
                    style={{ height: "100%", width: "100%", padding: "5vh" }}
                />
            </Col>
            <Row>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <Button onClick={viewUpload}>Change Profile</Button>
                    {view && (
                <Row>
                    <Col xs={12} md={12} lg={12} xl={12}>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name="user_profile"
                            onChange={(e) => {
                                uploadimageHandler(e.target.files[0])
                            }}
                            required
                        />
                        <Button onClick={() => handleEdit(profile.phone_number)} style={{ float: "right" }} className=" shadow-sm">
                            upload<i className="bi bi-pencil"></i>
                        </Button>
                    </Col>
                </Row>
            )}
                </Col>
            </Row>
        </Row>
              </Col>

            <Col xs={12} md={7} lg={7} xl={7}>
              <Card.Body className='user_detail_container'>
                <Card.Text className='user_detail_container_in'>
                  <h6></h6>
                  <h6 className='detail'> ID : {user._id}</h6>
                  <h6 className='detail' > Name : {user.user_name}</h6>
                  <h6 className='detail'> Email : {user.email}</h6>
                  <h6 className='detail'> Mobile : {user.phone_number}</h6>
                </Card.Text>
              </Card.Body>
              <Row className="mb-3">
                <Col xs={4} className="text-center">
                  <strong>{profile?.created_polls?.length || 0}</strong>
                  <p className="text-muted">Posts</p>
                </Col>
                <Col xs={4} className="text-center">
                  <strong>{profile?.user_followers?.length || 0}</strong>
                  <p className="text-muted">Followers</p>
                </Col>
                <Col xs={4} className="text-center">
                  <strong>{profile?.user_following?.length || 0}</strong>
                  <p className="text-muted">Following</p>
                </Col>
                
              </Row>
            </Col>
          </Row>
        </Card>
      </Container>

      <Container className='polling-container mb-4' style={{  }}>
        {profile1 && (
          <>
            <h3 style={{ textAlign: "center", backgroundColor: "lightblue"}}>--- Created polls ---</h3>
            <PollingComponent t_poll1={profile1} />
          </>
        )}
      </Container>
      <hr/>

      <Container className='polling-container mb-4' style={{}}>
        {profile2 && (
          <>
            <h3 style={{ textAlign: "center",  backgroundColor: "orange"  }}>--- Liked polls ---</h3>
            <PollingComponent t_poll1={profile2} />
          </>
        )}
      </Container>
<hr/>
      <Container className='polling-container mb-4'  style={{ }}>
        {profile3 && (
          <>
            <h3 style={{ textAlign: "center", backgroundColor: "lightgreen"  }}>--- Voted polls ---</h3>
            <PollingComponent t_poll1={profile3} />
          </>
        )}
      </Container>
      <hr/>

      <Container className='polling-container mb-4' style={{  }}>
        {profile4 && (
          <>
            <h3 style={{ textAlign: "center", backgroundColor: "gray"}}>--- Commented polls ---</h3>
            <PollingComponent t_poll1={profile4} />
          </>
        )}
      </Container>

      {/* Uncomment and add more containers if needed */}
      {/* <Container className='mb-4'>
        <h3 style={{ textAlign: "center" }}>--- Liked polls ---</h3>
        <PollingComponent t_poll1={profile2} />
      </Container>
      <Container className='mb-4'>
        <h3 style={{ textAlign: "center" }}>--- Voted polls ---</h3>
        <PollingComponent t_poll1={profile3} />
      </Container>
      <Container className='mb-4'>
        <h3 style={{ textAlign: "center" }}>--- Commented polls ---</h3>
        <PollingComponent t_poll1={profile4} />
      </Container> */}
    </>
  );
};

export default Userdetails;