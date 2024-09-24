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
import profileimg from './profileimg.png'
import Swal from "sweetalert2";
const HomePage = ({ createdpolls }) => {

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
  const navtoedit = useNavigate();
  const navtopr = useNavigate();
  const navforlog = useNavigate();
  // const searchloc = useLocation();
  // const Logout = () => {
  //   sessionStorage.clear();
  // }
  const getlocone = useLocation();
  useEffect(() => {
    const getuser = () => {
      const userData = sessionStorage.getItem("UserData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setCurrentUser(parsedUserData._id);

      }
      else {
        navforlog('/');
      }
    };
    getuser();
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
        const resp = await axios.post('http://localhost:5000/polls/search', {
          query: loc.state.searchinp
        });
        if (resp?.data?.poll_ids && Array.isArray(resp.data.poll_ids)) {
          setData(resp.data.poll_ids);
          console.log(resp.data.poll_ids);
        } else {
          console.error(resp.data);
          setData([]);
        }
      }
      searchapi();
    }
    else if (getlocone?.state?.xx) {
      console.log(getlocone?.state?.xx);
      try {
        const dataArray = Array.isArray(getlocone?.state?.xx) 
        ? getlocone?.state?.xx 
        : [getlocone?.state?.xx];
        setTemparray(dataArray);
        console.log(temparray);
        setData(dataArray);
        console.log(data);
      }
      catch (e) {

      }

    }
    else {
      console.log("in")
      const getallapi = async () => {
        const resp = await axios.post('http://localhost:5000/polls/getall', {
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
          const resp = await axios.post('http://localhost:5000/polls/multipoll', {
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
        console.log(getlocone?.state?.xx);
        try {
          const dataArray = Array.isArray(getlocone?.state?.xx)
            ? getlocone?.state?.xx
            : [getlocone?.state?.xx];
          setTemparray(dataArray);
          console.log(temparray);
          setData(dataArray);
          console.log(data);
        }
        catch (e) {

        }

      }
      else if (loc?.state?.searchinp) {
        console.log("enter")
        const searchapi = async () => {
          const resp = await axios.post('http://localhost:5000/polls/search', {
            query: loc.state.searchinp
          });
          if (resp?.data?.poll_ids && Array.isArray(resp.data.poll_ids)) {
            const pollIds = resp.data.poll_ids
            const multipolls = await axios.post('http://localhost:5000/polls/multipoll', {
              poll_ids: pollIds,
              user_id: currentUser
            })
            if (multipolls.status === 200) {
              setData(multipolls.data)
            }
            else {

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
            "http://localhost:5000/polls/multipoll",
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
            axios.post('http://localhost:5000/polls/getisfollowing', {
              user_id: currentUser,
            }),
            axios.post('http://localhost:5000/polls/getall', {
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
    if (currentUser) {
      const fetchlikecomments = async () => {
        try {
          const resp = await axios.post('http://localhost:5000/comment/getcommentslikedbyuser', {
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
            "http://localhost:5000/comment/getcommentslikedbyuser",
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
            "http://localhost:5000/comment/getcommentslikedbyuser",
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
        const response = await axios.post('http://localhost:5000/polls/voteonpoll', voteoption);
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



  // useEffect(() => {
  //   if (currentUser) {
  //     const getAllPolls = async () => {
  //       try {
  //         const result = await axios.post(
  //           "http://localhost:5000/polls/getall",
  //           {
  //             user_id: currentUser,
  //           }

  //         );
  //         if (result.data) {
  //           setData(result.data);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching polls:", error);
  //       }
  //     };
  //     getAllPolls();
  //   }
  // }, [currentUser, voteoption]);

  const handleunvote = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/polls/getoption",
        {
          poll_id: id,
          user_id: currentUser,
        }
      );
      let option = response.data.votedOption;
      if (option) {
        const unvote = await axios.post(
          "http://localhost:5000/polls/voteonpoll",
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
        "http://localhost:5000/polls/likeonpoll",
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
          "http://localhost:5000/comment/likereply",
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
          "http://localhost:5000/comment/likecomment",
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
          const response = await axios.post('http://localhost:5000/polls/getliked', {
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
    const resp = await axios.post('http://localhost:5000/comment/getbyid', {
      poll_id: id,
      user_id: currentUser
    })
    setIsCommentVisible((prev) => prev === id ? null : id);
    setFetchcomments(resp.data);
  };

  const handlecomment = async (id) => {
    if (id && currentUser) {
      const comentresp = await axios.post('http://localhost:5000/comment/createcomment', {
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
        const resp = await axios.post('http://localhost:5000/polls/delete', {
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
      const replyresp = await axios.post('http://localhost:5000/comment/replycomment', {
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
          const resp = await axios.post('http://localhost:5000/polls/getisfollowing', {
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
        await axios.post("http://localhost:5000/api/follow", {
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
      const resp = await axios.post('http://localhost:5000/comment/replycomment', {
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

  return (
    <Container fluid style={{ height: "100vh" }}>
      <>
        {data.map((item) => {
          const totalVotersCount = item.options.reduce((total, option) => total + (option.voters?.length || 0), 0);


          return (
            <Card key={item._id} className="cardcolor mt-5">
              <Row>
                <Row>
                  <Col>
                    {/* <ProfilePage
                      profileImage={<img className='imageupload' src={`http://localhost:5000${item.createdBy.user_profile}`} alt="User Profile" />}
                    /> */}
                    <img className='imageupload' src={item.createdBy.user_profile ? `http://localhost:5000${item.createdBy.user_profile}` : profileimg}></img>

                  </Col>
                </Row>
                <Col lg={4} xs={4}>
                  <h3>
                    <a
                      style={{ textDecoration: 'none' }}
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        handleprofilenav(item.createdBy._id);
                      }}
                    >
                      {item.createdBy.user_name}
                    </a>

                  </h3>
                  Created at:
                  {<Createdate createdtime={item?.createdAt} />}
                  Expires at:
                  {<ExpiryAt expiryTime={item?.expirationTime} />}
                </Col>
                <Col lg={2} xs={2}>
                  <div style={{ display: currentUser === item.createdBy._id ? 'none' : 'contents' }}>
                    <Button onClick={() => followhandle(item.createdBy._id)}>
                      {isFollowingAll.includes(item._id) ? "Unfollow" : "Follow"}
                    </Button>
                  </div>
                </Col>
                <div
                  style={{ display: currentUser === item.createdBy._id ? 'contents' : "none" }}
                >
                  <Col lg={3} xs={3}>
                    <i class="bi bi-pencil" onClick={() => editevent(item)}></i>
                  </Col>
                  <Col lg={3} xs={3}>
                    <i class="bi bi-trash3" onClick={() => deleteevent(item._id)}></i>
                  </Col>

                </div>

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
                  <button style={{ height: '50%' }}>{inde.category_name}</button>
                </div>
              ))}
              <br />
              {item.createdBy.isVoted ? (
                <button onClick={() => handleunvote(item._id)} className="voteless">Unvote</button>
              ) : (
                <button onClick={() => Votebutton(item._id)} className="votein">Vote</button>
              )}
              <br />
              <Row>
                <Col xs={3} md={3} lg={3} xl={3}>
                  <i
                    className={gliked.includes(item._id) ? "bi bi-heart-fill" : "bi bi-heart"}
                    style={{ color: gliked.includes(item._id) ? "red" : "inherit", cursor: "pointer" }}
                    onClick={() => handleLike(item._id)}
                  >
                    {likeCounts[item._id]} Like
                  </i>
                </Col>
                <Col xs={3} md={3} lg={3} xl={3}>
                  <i className="bi bi-person">{totalVotersCount} voters</i>
                </Col>
                <Col xs={3} md={3} lg={3} xl={3}>
                  <i className="bi bi-chat-left-quote" onClick={() => handleToggleCommentBox(item._id)}>Comments</i>
                </Col>
                <Col xs={3} md={3} lg={3} xl={3}>
                  <i className="bi bi-share">Share</i>
                </Col>
              </Row>

              {isCommentVisible === item._id && (
                <div>
                  {fetchcomments && fetchcomments.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      {fetchcomments.map((com) => (
                        <Row key={com._id}>
                          <Col lg={2}>
                            <i className="bi bi-person personicon"></i>
                          </Col>
                          <Col lg={9}>
                            <Card className="Commentcard">
                              <Container style={{ marginBottom: '5px' }}>
                                <p><b>Posted by:</b> {com.user_id?.user_name || 'Unknown User'}</p>
                                <p><b>Posted At:</b> {new Date(com.created_at).toLocaleString()}</p>
                                <p><b>Comment:</b> {com.comment}</p>
                                <Button onClick={() => handletogglereply(com._id)}
                                >
                                  {visiblereplies[com._id] ? 'Hidereplies' : 'showreplies'}
                                </Button>
                                {visiblereplies[com._id] && com.replies && com.replies.length > 0 && (
                                  <Row>
                                    <Col lg={8}>
                                      {com.replies.map((rep) => (
                                        <div key={rep._id}>
                                          <Card style={{ width: '100%', height: '50%' }}>
                                            <Row>
                                              <Col lg={8} xs={8}>
                                                <p>Reply posted by: {rep.user_id.user_name}</p>
                                                <p>Reply posted at: {new Date(rep.createdAt).toLocaleDateString()}</p>
                                                <p>Reply message: {rep.reply_msg}</p>
                                              </Col>
                                              <Col lg={2} xs={2}>
                                                <i class="bi bi-heart"
                                                  className={replylikes.includes(rep._id) ? "bi bi-heart-fill" : "bi bi-heart"}
                                                  style={{ color: commentsliked.includes(com._id) ? "red" : "inherit" }}
                                                  onClick={() => handlelikereplies(com._id, rep._id)}>
                                                </i>
                                              </Col>
                                              <Col lg={2} xs={2}>
                                                <i className="bi bi-reply-fill" onClick={() => Toggleforreply(com._id, com)}></i>
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
                                  style={{ width: '100%', height: '5%', marginTop: '10px' }}
                                />
                                <Button variant="danger" onClick={() => showreplyreply(item._id, com._id, com.user_id.user_name)}>
                                  Submit Reply
                                </Button>
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

                                  <Button
                                    onClick={() => { submitreplycomment(item._id, com._id) }}
                                    style={{ marginTop: '10px' }}
                                  >
                                    Submit Reply
                                  </Button>
                                  {com.replies?.length > 0 && (
                                    com.replies.map((rep) => (
                                      <Card key={rep._id}>
                                        <Container>
                                          <p><b>Replied by:</b> {rep.user_id?.user_name || 'Unknown User'}</p>
                                          <p><b>Replied at:</b> {new Date(rep.createdAt).toLocaleString()}</p>
                                          <p><b>reply mes:</b> {rep.reply_msg}</p>
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
                  <textarea
                    value={commenttype}
                    onChange={(e) => setCommenttype(e.target.value)}
                    placeholder="Write your comment here..."
                    rows="4"
                    style={{ width: '100%', height: '10%', marginTop: '10px' }}
                  />



                  <Button
                    onClick={() => handlecomment(item._id)}
                    style={{ display: 'block', marginTop: '10px' }}
                  >
                    Submit Comment
                  </Button>
                </div>
              )}



            </Card>
          );
        })}
      </>
    </Container>
  );

}

export default HomePage;