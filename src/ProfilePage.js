import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import HomePage from './Homepage'
import profileimg from './profileimg.png'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom'
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
              "http://localhost:5000/api/getProfile",
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
  const uploadimage = (im) => {
    setImageget(im)
  }

  const profileimageupload = async (img) => {
    const updata = new FormData();
    updata.append('profile', img)
    const repapi = await axios.post('http://localhost:5000/api/uploadprofile', updata, {
      header: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const imagein = repapi.data.profile || '';
    return imagein;
  }
  const handleedit = async (idph) => {
    const imageurl = await profileimageupload(imageget);
    const resp = await axios.post('http://localhost:5000/api/updateuser', {
      identifier: idph,
      user_profile: imageurl
    })
    if (resp.status === 200) {
      Swal.fire({
        title: 'Profile Updated',
        text: 'Successfully updated your profile',
        icon: 'success',
      });
    }
  }

  return (
    <div>
      <Container
        style={{paddingTop:'50px',minHeight:'100vh'}}
      >
        <Container style={{height:'100%'}}>
          <Card className="card">
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
                        src={data.user_profile ? `http://localhost:5000${data.user_profile}` : profileimg}
                      // src={profileimg}
                      ></img>
                    </Col>
                    <Row>
                      <Col>
                        {currentUser === data._id && (
                          <>
                            <Button onClick={() => viewimage()}>Upload Photo</Button>

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
            <div style={{ padding: "20px" }}>
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
        </Container>
        <Container>
          <h4 style={{ paddingTop: '20px', marginBottom: '50px' }}>CREATED POLLS: </h4>
          <div style={{ marginTop: '80px' }}>
            <HomePage createdpolls={createdpolls} />
          </div>
        </Container>
        <Container>
          <h4 >LIKED POLLS: </h4>
          <div style={{ marginTop: '80px' }}>
            <HomePage createdpolls={likedpolls} />
          </div>
        </Container>
        <Container>
          <h4>VOTED POLLS: </h4>
          <div style={{ marginTop: '80px' }}>
            <HomePage createdpolls={votedpolls} />
          </div>
        </Container>
      </Container>
    </div>
  )
}

export default ProfilePage
