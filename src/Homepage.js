import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormControl,
  Row,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from "axios";
import { Bs9Square } from "react-icons/bs";
import Addpoll from "./Addpoll";
import Createdate from "./Createdate";
import ExpiryAt from "./ExpiryAt";
import { ClockFill } from "react-bootstrap-icons";
import ProfilePage from "./ProfilePage";
import profileph from './profilelogo.jpg';
import Swal from "sweetalert2";
import apiUrl from "./api";
const HomePage = ({ createdpolls, item }) => {

  const loc = useLocation();


  const [prope, setPrope] = useState(false);

  const [data, setData] = useState([]);
  const [isVoted, setIsvoted] = useState(false);
  const [sended, setSended] = useState(false);
  const [colour, setColour] = useState("")
  const [selectedoption, setSelectedoption] = useState(null);
  const [voteoption, setVoteoption] = useState({
    poll_id: "",
    user_id: "",
    option: ""
  })
  const [likepoll, setLikepoll] = useState({
    poll_id: "",
    user_id: "",
  });
  const [gliked, setGliked] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [like, setLike] = useState({
    poll_id: "",
    user_id: "",
  });
  const [likeCounts, setLikeCounts] = useState({});
  const [addpolcheck, setAddpolcheck] = useState(false);
  const [totalvotercount, setTotalvotercount] = useState([])
  const [commenttype, setCommenttype] = useState();
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [categoryviist, setCategoryvisit] = useState(false);
  const [editportion, setEditportion] = useState([]);
  const [commentreply, setCommentreply] = useState();
  const [isreplyvisible, setIsreplyvisible] = useState(false);
  const [fetchcomments, setFetchcomments] = useState([])
  const [isFollowingAll, setIsFollowingAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [local, setLocal] = useState(false);
  const [allpolls, setAllPolls] = useState([])
  const [visiblereplies, setVisiblereplies] = useState({})
  const [replytouser, setReplytouser] = useState();
  const [replytoreplyvisible, setreplytoreplyvisible] = useState({})
  const [replynametoshow, setReplynametoshow] = useState();
  const [replylikes, setReplylikes] = useState([]);
  const [commentsliked, setCommentsliked] = useState([]);
  const [temparray, setTemparray] = useState([]);
  const [sessiondatacreate, setSessiondatacreate] = useState({
    user_name: "",
    email: "",
    user_profile: "",
    phone_number: null
  });
  const navtoedit = useNavigate();
  const navtopr = useNavigate();
  const navforlog = useNavigate();

  // const searchloc = useLocation();
  // const Logout = () => {
  //   sessionStorage.clear();
  // }
  const getlocone = useLocation();
  useEffect(() => {
    const getUser = async () => {
      const userdata = sessionStorage.getItem('UserData');
      // const userdata=sessionStorage.getItem("datamain");

      if (userdata) {
        const parsedUserData = JSON.parse(userdata);

        setCurrentUser(parsedUserData._id);
      }
      else {
        navforlog('/');
      }


    }

    getUser();
  }, []);

  const Handlesubmit = (id, optionval) => {
    if (selectedoption && selectedoption._id === id && selectedoption.option === optionval) {
      setSelectedoption(null);
    } else {
      setSelectedoption({ _id: id, option: optionval });
      setVoteoption({
        poll_id: id,
        user_id: currentUser,
        option: optionval
      });
    }
  }

  useEffect(() => {
    if (loc && loc.state && loc.state.x) {
      let a = loc?.state?.x
      setData(a);
      setPrope(true);

    }
    else if (loc?.state?.searchinp) {
      console.log("enter")
      const searchapi = async () => {
        const resp = await axios.post(`${apiUrl}/polls/search`, {
          query: loc.state.searchinp
        });
        const storesearch = resp?.data?.poll_ids;
        if (storesearch && storesearch != "") {
          const pollIds = storesearch;
          const multipolls = await axios.post(`${apiUrl}/polls/multipoll`, {
            poll_ids: pollIds,
            user_id: currentUser
          })
          if (multipolls?.data?.message != "Polls not found") {
            setData(multipolls.data)
          }
        } else {
          console.error(resp.data);
          setData([]);
        }
      }
      searchapi();
    }
    else if (getlocone?.state?.xx) {
      console.log("Value of xx:", getlocone?.state?.xx);  // Log to ensure xx exists

      if (getlocone?.state?.xx) {
        const fetchtrend = async () => {
          try {
            const resp = await axios.post(`${apiUrl}/polls/getone`, {
              poll_id: getlocone?.state?.xx?._id,   // Safely access _id
              user_id: currentUser
            });

            if (resp.status === 200) {
              const responseData = resp.data;
              console.log("Response Data:", responseData);  // Log response for debugging

              // Check if responseData is an array and update state accordingly
              if (Array.isArray(responseData)) {
                setData(responseData);
              } else {
                setData([responseData]);
              }
            }
          } catch (er) {
            console.log("Error fetching:", er);
          }
        }

        fetchtrend();  // Call the async function
      } else {
        console.log("getlocone.state.xx is not valid");  // Log if xx is undefined or null
      }
    } 
    else {
      console.log("in")
      const getallapi = async () => {
        const resp = await axios.post(`${apiUrl}/polls/getall`, {
          user_id: currentUser
        });
        if (resp?.data && Array.isArray(resp.data)) {
          setData(resp.data);
          console.log(resp.data);
        } else {
          console.error(resp.data);
          setData([]);
        }
      }
      getallapi();
    }
  }, [loc?.state]);

  useEffect(() => {
    const fetchData = async () => {
      if (prope && loc?.state?.x) {

        try {
          const resp = await axios.post(`${apiUrl}/polls/multipoll`, {
            poll_ids: loc.state.x,
            user_id: currentUser,
          });
          if (resp.data) {
            setData(resp.data);
          }

        } catch (error) {
          console.error("Error fetching multipoll data:", error);
        }
      }
      else if (getlocone?.state?.xx) {
        console.log("Value of xx:", getlocone?.state?.xx);  // Log to ensure xx exists

        if (getlocone?.state?.xx) {
          const fetchtrend = async () => {
            try {
              const resp = await axios.post(`${apiUrl}/polls/getone`, {
                poll_id: getlocone?.state?.xx?._id,   // Safely access _id
                user_id: currentUser
              });

              if (resp.status === 200) {
                const responseData = resp.data;
                console.log("Response Data:", responseData);  // Log response for debugging

                // Check if responseData is an array and update state accordingly
                if (Array.isArray(responseData)) {
                  setData(responseData);
                } else {
                  setData([responseData]);
                }
              }
            } catch (er) {
              console.log("Error fetching:", er);
            }
          }

          fetchtrend();  // Call the async function
        } else {
          console.log("getlocone.state.xx is not valid");  // Log if xx is undefined or null
        }
      } 
    
      else if (loc?.state?.searchinp) {
  console.log("enter")
  const searchapi = async () => {
    const resp = await axios.post(`${apiUrl}/polls/search`, {
      query: loc.state.searchinp
    });
    const storesearch = resp?.data?.poll_ids;
    if (storesearch && storesearch != "") {
      const pollIds = storesearch;
      const multipolls = await axios.post(`${apiUrl}/polls/multipoll`, {
        poll_ids: pollIds,
        user_id: currentUser
      })
      if (multipolls?.data?.message != "Polls not found") {
        setData(multipolls.data)
      }
    } else {
      console.error(resp.data);
      setData([]);
    }
  }
  searchapi();
}
else if (createdpolls) {
  console.log("entered   2");
  try {
    const response = await axios.post(
      `${apiUrl}/polls/multipoll`,
      {
        poll_ids: createdpolls,
        user_id: currentUser,
      }
    );
    if (response.data) {
      setData(response.data);
    }
  } catch (error) { }
}
else {
  try {
    const [followedResponse, allpollsResponse] = await Promise.all([
      axios.post(`${apiUrl}/polls/getisfollowing`, {
        user_id: currentUser,
      }),
      axios.post(`${apiUrl}/polls/getall`, {
        user_id: currentUser,
      })
    ]);
    const countfollow = followedResponse.data.pollIds;
    const allpolls = allpollsResponse.data;
    if (countfollow) {
      setIsFollowingAll(countfollow);
    }
    else {
      console.log("error:no polll IDs recieved")
    }
    if (allpolls) {
      setData(allpolls);
    }
    else {
      console.log("Error:No data recieved")
    }
  } catch (error) {
    console.log("error fetching data:", error)
  }
}
    };

fetchData();
  }, [loc.state, currentUser, voteoption]);

useEffect(() => {
  const getWinner = async () => {
    if (!item || !item.expirationTime) {
      console.log('Item or expirationTime is undefined. Waiting for data...');
      return;
    }
    const currentTime = new Date();
    const expiryTime = new Date(item?.expirationTime);
    console.log(item)
    // Check if the poll has expired
    if (expiryTime < currentTime) {
      try {
        const getupd = await axios.post(`${apiUrl}/polls/getwin`, {
          poll_id: item?.poll_id
        });


        console.log('Winner:', getupd.data.pollCollection);
      } catch (error) {
        console.error('Error fetching the winner:', error);
      }
    }
  };

  getWinner();
}, [item]);

useEffect(() => {
  if (currentUser) {
    const fetchlikecomments = async () => {
      try {
        const resp = await axios.post(`${apiUrl}/comment/getcommentslikedbyuser`, {
          user_id: currentUser,
        });
        if (resp.data && resp.data.commentIds) {
          setCommentsliked(resp.data.commentIds)
        }
      }
      catch (er) {
        console.log('error', er.message)
      }
    };
    fetchlikecomments();
  }
}, [currentUser])

useEffect(() => {
  if (currentUser) {
    const fetchLikedComments = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/comment/getcommentslikedbyuser`,
          {
            user_id: currentUser,
          }
        );

        if (response.data && response.data.commentIds) {
          setCommentsliked(response.data.commentIds);
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    fetchLikedComments();
  }
}, [currentUser]);

useEffect(() => {
  if (currentUser) {
    const fetchLikedComments = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/comment/getcommentslikedbyuser`,
          {
            user_id: currentUser,
          }
        );

        if (response.data && response.data.commentIds) {
          setCommentsliked(response.data.commentIds);
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    fetchLikedComments();
  }
}, [currentUser]);

const Votebutton = async () => {
  if (voteoption.poll_id && voteoption.user_id && voteoption.option) {
    try {
      const response = await axios.post(`${apiUrl}/polls/voteonpoll`, voteoption);
      if (response.status === 200) {
        setSended(true);
        setVoteoption({
          poll_id: "",
          user_id: "",
          option: "",
        });
        setSelectedoption(null);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  }
};

const handleunvote = async (id) => {
  try {
    const response = await axios.post(
      `${apiUrl}/polls/getoption`,
      {
        poll_id: id,
        user_id: currentUser,
      }
    );
    let option = response.data.votedOption;
    if (option) {
      const unvote = await axios.post(
        `${apiUrl}/polls/voteonpoll`,
        {
          poll_id: id,
          user_id: currentUser,
          option: option,
        }
      );
      if (unvote.status === 201) {
        console.log(isVoted)
        setSended(true);
        setVoteoption({
          poll_id: "",
          user_id: "",
          option: "",
        });
      } else if (unvote.status === 200) {
        setSended(false);
        setVoteoption({
          poll_id: "",
          user_id: "",
          option: "",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  const initialLikeCounts = data.reduce((acc, item) => {
    acc[item._id] = (item.likers || []).length;
    return acc;
  }, {});
  setLikeCounts(initialLikeCounts);
}, [data]);

const handleLike = async (id) => {


  if (id && currentUser) {
    const response = await axios.post(
      `${apiUrl}/polls/likeonpoll`,
      {
        poll_id: id,
        user_id: currentUser
      }
    );
    if (response.data.message === "Like removed successfully") {
      setGliked((preGliked) => preGliked.filter((pollId) => pollId !== id));
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] - 1,
      }));

    } else if (response.data.message === 'Like recorded successfully') {
      setGliked((prev) => [...prev, id]);
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] + 1,
      }));
    }
  }
};

const handlelikereplies = async (commentid, replyid) => {
  if (currentUser) {
    try {
      const response = await axios.post(
        `${apiUrl}/comment/likereply`,
        {
          user_id: currentUser,
          comment_id: commentid,
          reply_id: replyid,
        }
      );
      if (response.status === 200) {
        setReplylikes((prev) => {
          const isReplyLiked = prev.includes(replyid);
          if (isReplyLiked) {
            return prev.filter((id) => id !== replyid);
          } else {
            return [...prev, replyid];
          }
        });
        setData((prevData) =>
          prevData.map((poll) => ({
            ...poll,
            comments: poll.comments.map((comment) =>
              comment.id === commentid
                ? {
                  ...comment,
                  replies: comment.replies.map((replyy) =>
                    replyy.id === replyid
                      ? {
                        ...replyy,
                        likers: replylikes.includes(replyid)
                          ? replyy.likers.filter(
                            (liker) => liker._id !== currentUser
                          )
                          : [...replyy.likers, { _id: currentUser }],
                      }
                      : replyy
                  ),
                }
                : comment
            ),
          }))
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

const handleLikeComments = async (commentId, pollId) => {
  if (currentUser) {
    try {
      const response = await axios.post(
        `${apiUrl}/comment/likecomment`,
        {
          user_id: currentUser,
          comment_id: commentId,
        }
      );

      if (response.status === 200) {
        const isLiked = commentsliked.includes(commentId);

        setCommentsliked((prevLiked) =>
          isLiked
            ? prevLiked.filter((id) => id !== commentId)
            : [...prevLiked, commentId]
        );

        setData((prevData) =>
          prevData.map((poll) => ({
            ...poll,
            comments: poll.comments.map((comment) =>
              comment.id === commentId
                ? {
                  ...comment,
                  likers: isLiked
                    ? comment.likers.filter((liker) => liker._id !== currentUser)
                    : [...comment.likers, { _id: currentUser }],
                }
                : comment
            ),
          }))
        );
      }
    } catch (error) {
      console.error("Error liking comment:", error.message);
    }
  }
};

useEffect(() => {
  if (currentUser) {
    const fetchLikes = async () => {
      try {
        const response = await axios.post(`${apiUrl}/polls/getliked`, {
          user_id: currentUser
        });
        const likecount = response.data.pollIds;
        if (likecount) {
          setGliked(likecount)
        }
      } catch (error) {
        console.error("Error fetching liked polls:", error);
      }
    };
    fetchLikes();
  }
}, [currentUser]);

const handleToggleCommentBox = async (id) => {
  const resp = await axios.post(`${apiUrl}/comment/getbyid`, {
    poll_id: id,
    user_id: currentUser
  })
  setIsCommentVisible((prev) => prev === id ? null : id);
  setFetchcomments(resp.data);
};

const handlecomment = async (id) => {
  if (id && currentUser) {
    const comentresp = await axios.post(`${apiUrl}/comment/createcomment`, {
      poll_id: id,
      user_id: currentUser,
      comment: commenttype

    })
    setIsCommentVisible(null);
    setCommenttype('')
  }
}

const replycomment = (id) => {
  setIsreplyvisible(isreplyvisible === id ? null : id);
}

const editevent = (item) => {
  navtoedit(`/Addpoll/${item._id}`)
}

const deleteevent = async (id) => {
  if (id && currentUser) {
    try {
      const resp = await axios.post(`${apiUrl}/polls/delete`, {
        poll_id: id
      })
      if (resp.status === 200) {
        setData((prevdata) => prevdata.filter((poll) => poll._id !== id));
      }

    } catch (error) {

    }
  }

}

const submitreplycomment = async (id, commentid) => {
  if (commentreply && currentUser) {
    const replyresp = await axios.post(`${apiUrl}/comment/replycomment`, {
      poll_id: id,
      user_id: currentUser,
      reply_msg: commentreply,
      comment_id: commentid
    })
    setCommentreply('');
    setIsreplyvisible(null);

  }
}

useEffect(() => {
  if (currentUser) {
    const followedcount = async () => {
      try {
        const resp = await axios.post(`${apiUrl}/polls/getisfollowing`, {
          user_id: currentUser
        })
        const countfollow = resp.data.pollIds;
        if (countfollow) {
          setIsFollowingAll(countfollow)
        } else {
          console.log("error:No poll IDs recieved")
        }
      }
      catch (er) {
        console.log("error fetching followed polls:", er);
      }
    }
    followedcount();
  };
}, [local]);

const followhandle = async (id) => {
  if (currentUser && id) {
    try {
      await axios.post(`${apiUrl}/api/follow`, {
        follow_user_id: id,
        user_id: currentUser,
      });

      setIsFollowingAll((prev) => {
        if (prev.includes(id)) {
          return prev.filter((pollid) => pollid !== id)
        } else {
          return [...prev, id]
        }
      });
      setLocal(!local);
    } catch (err) {
      console.error("Error follow:", err);
    }
  }
};

const handletogglereply = (id) => {
  setVisiblereplies((prev) => ({
    ...prev,
    [id]: !prev[id]
  }))
};

const Toggleforreply = (com_id) => {
  setreplytoreplyvisible((prev) => ({
    ...prev,
    [com_id]: !prev[com_id]
  }))

}

const showreplyreply = async (id, comid, name) => {
  if (id && currentUser) {
    const resp = await axios.post(`${apiUrl}/comment/replycomment`, {
      poll_id: id,
      user_id: currentUser,
      reply_msg: `@${name}:${replytouser}`,
      comment_id: comid
    })
    setReplytouser('');
    setIsreplyvisible(null);
  }
}

const handleprofilenav = (userid) => {
  navtopr('/Profilepage', { state: { userid } });
}

const handleShare = (id) => {
  const shareData = {
    title: 'Check this out!',
    text: 'This is some great content I want to share.',
    url: `${apiUrl}/share/${id}`, // Replace with your actual URL
  };

  navigator.share(shareData)
    .then(() => {
      console.log('Share was successful!');
    })
    .catch((error) => {
      console.error('Error sharing:', error);
    });
};
return (
  <Container fluid style={{ marginTop: "7vh", height: "83vh", overflowY: "auto" }}>

    {data == null ? "No polls found" : data?.map((item) => {
      const totalVotersCount = item.options.reduce((total, option) => total + (option.voters?.length || 0), 0);


      return (
        <Card key={item._id} className="cardcolor">
          <Row className="align-items-center">
            <Col xs={5} md={2}

            >
              <img
                className="imageupload"
                src={
                  item.createdBy.user_profile
                    ? `${apiUrl}${item.createdBy.user_profile}`
                    : profileph
                }
                alt="User Profile"
                style={{ width: '90px', height: '90px', borderRadius: '20px' }}
              />

            </Col>


            <Col xs={7} md={6}

            >
              <h3>
                <a
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    handleprofilenav(item.createdBy._id);
                  }}
                >
                  {item.createdBy.user_name}
                </a>
              </h3>
              <p className="mb-1">
                <strong>Created at:</strong> <Createdate createdtime={item?.createdAt} />
              </p>
              <p>
                <strong>Expires at:</strong> <ExpiryAt expiryTime={item?.expirationTime} />
              </p>
            </Col>


            <Col xs={6} md={2} className="text-center mt-2">
              <div style={{ display: currentUser === item.createdBy._id ? 'none' : 'block' }}>
                <button className="category-button" onClick={() => followhandle(item.createdBy._id)}>
                  {isFollowingAll.includes(item._id) ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </Col>


            {currentUser === item.createdBy._id && (
              <Col xs={6} md={2} className="text-center mt-2">
                <i className="bi bi-pencil mx-2" onClick={() => editevent(item)}></i>
                <i className="bi bi-trash3 mx-2" onClick={() => deleteevent(item._id)}></i>
              </Col>
            )}
          </Row>

          {item.title}<br />
          {item.question}<br />

          <div style={{ display: item.createdBy.isVoted ? "block" : "none" }}>
            {item.options.map((opti) => {
              const percentage = totalVotersCount > 0 ? (opti.count / totalVotersCount) * 100 : 0;
              return (
                <div key={opti._id} className="barct">
                  <div className="bar">
                    <div className="filledbar" style={{ width: `${percentage}%` }}>
                      <label>{opti.option}</label>
                      <span className="percentage-text">
                        {percentage.toFixed()}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: item.createdBy.isVoted ? "none" : "block" }}>
            {item.options.map((ind) => (
              <div key={ind._id} onClick={() => Handlesubmit(item._id, ind.option)}>
                <input
                  type="radio"
                  name={`option-${item._id}`}
                  value={ind.option}
                  checked={selectedoption && selectedoption._id === item._id && selectedoption.option === ind.option}
                />
                <label>{ind.option}</label>
              </div>
            ))}
          </div>

          {item.category?.map((inde) => (
            <div key={inde._id}>
              <button className="category-button" style={{ height: '50%' }}>{inde.category_name}</button>
            </div>
          ))}
          <br />
          {item.createdBy.isVoted ? (
            <button onClick={() => handleunvote(item._id)} className="voteless">Unvote</button>
          ) : (
            <button onClick={() => Votebutton(item._id)} className="votein">Vote</button>
          )}
          <br />
          <Row className="">
            <Col xs={6} md={3} lg={3} xl={3} className="mb-2">
              <i
                className={gliked.includes(item._id) ? "bi bi-heart-fill" : "bi bi-heart"}
                style={{ color: gliked.includes(item._id) ? "red" : "inherit", cursor: "pointer" }}
                onClick={() => handleLike(item._id)}
              >
                {likeCounts[item._id]} Like
              </i>
            </Col>
            <Col xs={6} md={3} lg={3} xl={3} className="mb-2">
              <i className="bi bi-person">{totalVotersCount} voters</i>
            </Col>
            <Col xs={7} md={3} lg={3} xl={3} className="mb-2">
              <i className="bi bi-chat-left-quote" onClick={() => handleToggleCommentBox(item._id)}>Comments </i>
            </Col>
            <Col xs={5} md={3} lg={3} xl={3} className="mb-2" style={{ paddingLeft: '5px' }}>
              <i className="bi bi-share" onClick={() => handleShare(item._id)}>
                Share
              </i>
            </Col>
          </Row>


          {isCommentVisible === item._id && (
            <div>
              <Card className='maincommentcard' style={{ background: 'transparent', border: 'none' }}>
                {fetchcomments && fetchcomments.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    {fetchcomments.map((com) => (
                      <Row key={com._id}>
                        <Col lg={2}>
                          <a href="" onClick={(e) => {
                            e.preventDefault();
                            handleprofilenav(com.user_id._id);
                          }}>

                            <img
                              src={com.user_id.user_profile ? `${apiUrl}${com.user_id.user_profile}` : profileph}
                              alt="User Profile"
                              className="imageupload"
                              style={{ width: '100%', borderRadius: '50%' }}
                            />
                          </a>

                        </Col>
                        <Col lg={9}>
                          <Card className="Commentcard" style={{ width: '90%' }}>
                            <Container style={{ marginBottom: '5px' }}>

                              <p className="paracont">
                                @{com.user_id?.user_name || 'Unknown User'}&nbsp;
                                {new Date(com.created_at).toLocaleString()}
                              </p>
                              <p><b>{com.comment}</b></p>
                              <button className='category-button' onClick={() => handletogglereply(com._id)}
                              >
                                {visiblereplies[com._id] ? 'Hidereplies' : 'showreplies'}
                              </button>
                              {visiblereplies[com._id] && com.replies && com.replies.length > 0 && (
                                <Row>
                                  <Col lg={8}>
                                    {com.replies.map((rep) => (
                                      <div key={rep._id}>
                                        <Card style={{ width: '150%', height: '50%', background: 'transparent', border: "none" }}>
                                          <Row className="align-items-center">
                                            <Col lg={2} xs={2}>
                                              <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                handleprofilenav(rep.user_id._id);
                                              }}>
                                                <img
                                                  className="imageupload1"
                                                  src={rep.user_id.user_profile ? `${apiUrl}${rep.user_id.user_profile}` : { profileph }}
                                                  alt="Profile"
                                                  style={{ width: '100%', borderRadius: '50%' }}
                                                />
                                              </a>

                                            </Col>

                                            <Col lg={8} xs={8}>
                                              <p className="paracont">@{rep.user_id.user_name}&nbsp;
                                                {new Date(rep.createdAt).toLocaleDateString()}</p>
                                              <p > <b>{rep.reply_msg}</b></p>
                                            </Col>

                                            <Col lg={1} xs={1} className="text-center">
                                              <i
                                                className={replylikes.includes(rep._id) ? "bi bi-heart-fill" : "bi bi-heart"}
                                                style={{ color: commentsliked.includes(com._id) ? "red" : "inherit", cursor: 'pointer' }}
                                                onClick={() => handlelikereplies(com._id, rep._id)}>
                                              </i>
                                            </Col>

                                            <Col lg={1} xs={1} className="text-center">
                                              <i className="bi bi-reply-fill" style={{ cursor: 'pointer' }} onClick={() => Toggleforreply(com._id, com)}></i>
                                            </Col>
                                          </Row>

                                        </Card>
                                      </div>
                                    ))}

                                  </Col>

                                </Row>
                              )}

                            </Container>
                          </Card>
                          {replytoreplyvisible[com._id] && (
                            <>
                              <textarea
                                value={replytouser}
                                onChange={(e) => setReplytouser(e.target.value)}
                                placeholder="Enter the reply"
                                rows="4"
                                style={{ width: '100%', height: '10%', marginTop: '10px' }}
                              />
                              <button className="category-button" onClick={() => showreplyreply(item._id, com._id, com.user_id.user_name)}>
                                Submit Reply
                              </button>
                            </>
                          )}


                          <div>
                            {isreplyvisible === item._id && (
                              <div>
                                <textarea
                                  value={commentreply}
                                  onChange={(e) => setCommentreply(e.target.value)}
                                  placeholder="Enter your reply..."
                                  rows="2"
                                  style={{ width: '100%', marginTop: '10px' }}
                                ></textarea>

                                <button
                                  className="category-button"
                                  onClick={() => { submitreplycomment(item._id, com._id) }}
                                  style={{ marginTop: '10px' }}
                                >
                                  Submit Reply
                                </button>
                                {com.replies?.length > 0 && (
                                  com.replies.map((rep) => (
                                    <Card key={rep._id}>
                                      <Container>
                                        <p className="paracont"> @{rep.user_id?.user_name || 'Unknown User'}&nbsp;
                                          {new Date(rep.createdAt).toLocaleString()}</p>
                                        <p><b>{rep.reply_msg}</b></p>
                                      </Container>
                                    </Card>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={1}>
                          <Row>
                            <Col>
                              <i
                                className={
                                  commentsliked.includes(com._id)
                                    ? "bi bi-heart-fill"
                                    : "bi bi-heart"
                                }
                                style={{
                                  color: commentsliked.includes(com._id)
                                    ? "red"
                                    : "inherit",
                                }}
                                onClick={() =>
                                  handleLikeComments(com._id)
                                }

                              >
                                {com.likers.length}
                              </i>
                            </Col>
                            <br /><br />
                            <Col>
                              <i className="bi bi-reply-fill" onClick={() => replycomment(item._id)}></i>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ))}
                  </div>
                )}
              </Card>

              <textarea
                value={commenttype}
                onChange={(e) => setCommenttype(e.target.value)}
                placeholder="Write your comment here..."
                rows="4"
                style={{ width: '100%', height: '10%', marginTop: '10px' }}
              />



              <button className="category-button"
                onClick={() => handlecomment(item._id)}
                style={{ display: 'block', marginTop: '10px' }}
              >
                Submit Comment
              </button>
            </div>
          )}



        </Card>
      );
    })}

  </Container>
);

}

export default HomePage;