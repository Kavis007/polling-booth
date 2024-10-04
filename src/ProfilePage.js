import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import HomePage from './Homepage'
import profileimg from './profileimg.png'
import Swal from 'sweetalert2'
import apiUrl from "./api";
import { useLocation } from 'react-router-dom'
import "./ProfilePage.css";
const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState("")
  const [data, setData] = useState({});
  const [createdpolls, setCreatedpolls] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likees, setLikes] = useState([]);
  const [likedpolls, setLikedpolls] = useState([]);
  const [votedpolls, setVotedpolls] = useState([]);
  const [view, setView] = useState(false)
  const [imageget, setImageget] = useState(null);
  const loc=useLocation();
  const[error,setError]=useState('')
  useEffect(() => {
    const userdata = sessionStorage.getItem("UserData");
    if (userdata) {
      const parsedUserData = JSON.parse(userdata);
      setCurrentUser(parsedUserData._id);
  
      // Determine the ID to fetch based on location state or the current user ID
      const fetchtodate = loc?.state?.userid || parsedUserData._id;
  
      const fetchUserInfo = async (userId) => {
        if (userId) {
          try {
            const response = await axios.post(
              `${apiUrl}/api/getProfile`,
              {
                user_id: userId, // Use the fetched ID instead of hardcoded values
                current_user: parsedUserData._id,
              }
            );
  
            const profileData = response.data.user;
            const profileCreatedpolls = response.data.user.created_polls;
            const profileFollowers = response.data.user.user_followers;
            const profileFollowing = response.data.user.user_following;
            const profileLikes = response.data.user.user_likers;
            const profileLikedpolls = response.data.user.liked_polls;
            const profileVotedpolls = response.data.user.voted_polls;
  
            if (profileData) {
              setData(profileData);
              setCreatedpolls(profileCreatedpolls);
              setFollowers(profileFollowers);
              setFollowing(profileFollowing);
              setLikedpolls(profileLikedpolls);
              setVotedpolls(profileVotedpolls);
              setLikes(profileLikes);
            }
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        }
      };
  
      fetchUserInfo(fetchtodate);
    }
  }, [loc?.state?.userid]); // Re-run the effect if `loc.state.userid` changes
  
  const viewimage = () => {
    console.log("clicked");
    setView(!view);
  }
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  const uploadimage = (im) => {
    setImageget(im)
  }

  const profileimageupload = async (img) => {
    const updata = new FormData();
    updata.append('profile', img)
    const repapi = await axios.post(`${apiUrl}/api/uploadprofile`, updata, {
      header: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const imagein = repapi.data.profile || '';
    return imagein;
  }
  const handleedit = async (idph) => {

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  
    if (!imageget) {
      Swal.fire({
        title: 'No Image Selected',
        text: 'Please choose an image before updating your profile.',
        icon: 'error',
      });
      return;
    }
    if (!allowedExtensions.test(imageget.name)) {
      Swal.fire({
        title: 'Invalid File Type',
        text: 'Only JPG, JPEG, PNG, and GIF file types are allowed.',
        icon: 'error',
      });
      return;
    }
  
    try {
      
      const imageurl = await profileimageupload(imageget);
  
      const resp = await axios.post(`${apiUrl}/api/updateuser`, {
        identifier: idph,
        user_profile: imageurl
      });
  
      if (resp.status === 200) {
        Swal.fire({
          title: 'Profile Updated',
          text: 'Successfully updated your profile',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'There was an error updating your profile. Please try again.',
        icon: 'error',
      });
      console.error('Error during profile update:', error);
    }
  };
  

  return (
    <div>
      <Container
        style={{paddingTop:'50px',minHeight:'100vh'}}
      >
        <Container fluid className='user_container_outer mb-4'>
        <Card className='cardcolor' style={{ height: "auto" ,borderRadius:"30px"}}>
          <Row>
            <Col xs={12} md={5} lg={5} xl={5}>
            <Row style={{height:"40vh" ,padding:"1vh"}}>
            <Col xs={12} md={12} lg={12} xl={12}>
            <Card.Img
                    variant="top"
                    // src={profile.user_profile ? `${API_BASE_URL}${profile.user_profile}` : gif}
                    src={data.user_profile ? `${apiUrl}${data.user_profile}` : profileimg}
                    style={{
                      border:"1px solid black",
                      borderRadius:"30px",
                      objectFit:"cover",
                      height: "38vh",
                      // width: "100%",
                      }}
                /></Col>
            </Row>
            <Row>
              <Col xs={12} md={12} lg={12} xl={12} >
              <Row style={{paddingLeft:"20%",width:"80%"}}>
                {data._id===currentUser &&
                  <button 
                  className='category-button'
                  onClick={viewimage}
                  >Change Profile</button>
                
                }  
                    </Row>
                    {view && (
                <Row>
                    <Col xs={12} md={12} lg={12} xl={12}>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name="user_profile"
                            onChange={(e) => {
                                // uploadimageHandler(e.target.files[0])
                                uploadimage(e.target.files[0]);
                            }}
                            
                        />
                          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                        <button 
                        className='category-button'
                        onClick={() => handleedit(data.phone_number)
                          // () => handleEdit(profile.phone_number)
                          } style={{ float: "right" }}>
                            upload<i className="bi bi-pencil"></i>
                        </button>
                    </Col>
                </Row>
            )}
          
          
                </Col>
          
            </Row>
          
              </Col>
                {/* <Card.Img
                    variant="top"
                    // src={profile.user_profile ? `${API_BASE_URL}${profile.user_profile}` : gif}
                    src={data.user_profile ? `${apiUrl}${data.user_profile}` : profileimg}
                    style={{
                      border:"1px solid black",
                      borderRadius:"30px",
                      height: "100%",
                      width: "100%",
                      }}
                /> */}
            
            {/* <Row>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <Button 
                    onClick={viewimage}
                    >Change Profile</Button>
                    {view && (
                <Row>
                    <Col xs={12} md={12} lg={12} xl={12}>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name="user_profile"
                            onChange={(e) => {
                                // uploadimageHandler(e.target.files[0])
                                uploadimage(e.target.files[0]);
                            }}
                            required
                        />
                        <Button onClick={() => handleedit(data.phone_number)
                          // () => handleEdit(profile.phone_number)
                          } style={{ float: "right" }} className=" shadow-sm">
                            upload<i className="bi bi-pencil"></i>
                        </Button>
                    </Col>
                </Row>
            )}
                </Col>
            </Row>
        </Row> */}
              {/* </Col> */}


            <Col xs={12} md={7} lg={7} xl={7}>
              <Card.Body className='user_detail_container'>
                <Card.Text className='user_detail_container_in'>
                  <h6></h6>
                  <h6 className='detail'> ID : {data._id}</h6>
                  <h6 className='detail' > Name : {data.user_name}</h6>
                  <h6 className='detail'> Email : {data.email}</h6>
                  <h6 className='detail'> Mobile : {data.phone_number}</h6>
                </Card.Text>
              </Card.Body>
              <Row className="mb-3">
                <Col xs={4} className="text-center">
                  <strong>{data?.created_polls?.length || 0}</strong>
                  <p className="text-muted">Posts</p>
                </Col>
                <Col xs={4} className="text-center">
                  <strong>{data?.user_followers?.length || 0}</strong>
                  <p className="text-muted">Followers</p>
                </Col>
                <Col xs={4} className="text-center">
                  <strong>{data?.user_following?.length || 0}</strong>
                  <p className="text-muted">Following</p>
                </Col>
                
              </Row>
            </Col>
          </Row>
        </Card>
      </Container>
        {/* <Container style={{height:'100%'}}>
          <Card className='cardcolor'style={{zIndex:10,padding:"20px"}}>
            <div style={{ display: "flex" }}>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <img
                        style={{
                          height: "70px",
                          width: "90px",
                          paddingBottom: "10px",
                          borderRadius: "35px",
                        }}
                        src={data.user_profile ? `${apiUrl}${data.user_profile}` : profileimg}
                      // src={profileimg}
                      ></img>
                    </Col>
                    <Row>
                      <Col>
                        {currentUser === data._id && (
                          <>
                          <button className='category-button'onClick={()=>viewimage()}>Upload Photo</button>


                            {view && (
                              <Row>
                                <Col>
                                  <Form.Control
                                    type="file"
                                    accept="image/*"
                                    name="user_profile"
                                    onChange={(e) => {
                                      uploadimage(e.target.files[0]);
                                    }}
                                    required
                                  />
                                  <Button onClick={() => handleedit(data.phone_number)}>
                                    Upload <i className="bi bi-pencil"></i>
                                  </Button>
                                </Col>
                              </Row>
                            )}
                          </>
                        )}

                      </Col>
                    </Row>
                  </Row>
                </Col>
              </Row>

              <h5 style={{ paddingTop: "20px", paddingLeft: "10px" }}>
                <b> USERNAME: </b>{data.user_name}
              </h5>
            </div>
            <div style={{ padding: "20px",}}>
              <Row>
                <Col lg={4}>
                  <h6 style={{ paddingRight: "30px" }}>
                    <h5 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> Followers: </h5>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      {followers?.length}
                    </div>
                  </h6>
                </Col>
                <Col lg={4}>
                  <h6
                    style={{
                      paddingRight: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h5 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> Following:</h5>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      {following?.length}
                    </div>
                  </h6>
                </Col>
                <Col lg={4}>
                  <h6 style={{ paddingRight: "30px" }}>
                    <h5 className="polls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Created:</h5>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      {" "}
                      {createdpolls?.length}
                    </div>
                  </h6>
                </Col>
              </Row>
            </div>
          </Card>
        </Container> */}
        <Container>
          <h4 style={{ paddingTop: '20px', marginBottom: '50px',color:'white' }}>CREATED POLLS: </h4>
          <div style={{ marginTop: '80px',zindex:-1}}>
            <HomePage createdpolls={createdpolls} />
          </div>
        </Container>
        <Container>
          <h4 style={{color:'white'}} >LIKED POLLS: </h4>
          <div style={{ marginTop: '80px' }}>
            <HomePage createdpolls={likedpolls} />
          </div>
        </Container>
        <Container>
          <h4 style={{color:'white'}} >VOTED POLLS: </h4>
          <div style={{ marginTop: '80px' }}>
            <HomePage createdpolls={votedpolls} />
          </div>
        </Container>
      </Container>
    </div>
  )
}

export default ProfilePage
