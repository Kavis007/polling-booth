// import React, { useEffect, useState } from 'react'
// import { Button, Col, FormControl, FormLabel, Row } from 'react-bootstrap'
// import { BsTrash } from 'react-icons/bs';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';

// const Addpoll = () => {
//   const { editid } = useParams();

//   const [forms, setForms] = useState({
//     title: "",
//     question: "",
//     options: [{ option: "" }, { option: "" }],
//     duration: "",
//     category: "",
//     createdBy: "",

//   });
//   const [prop, setProp] = useState()
//   const navi2 = useNavigate();
//   const [currentUser, setCurrentUser] = useState("")
//   const [categories, setCategories] = useState([]);
//   const [updsub, setUpdsub] = useState(false)
//   const locport = useLocation();
//   const [state,setState] = useState({})


//   let upd = locport.state.item || {
//     title: "",
//     question: "",
//     options: [{ option: "" }],
//     duration: "",}
//   console.log("upd", upd)
//   useEffect(() => {
//     const getUser = () => {
//       const userData = sessionStorage.getItem("UserData");

//       if (userData) {
//         const parsedUserData = JSON.parse(userData);
//         setCurrentUser(parsedUserData._id)
//         setForms(prevForms => ({
//           ...prevForms,
//           createdBy: parsedUserData._id
//         }));
//       }
//       if (upd!==null) {
//         console.log("now goes to add")
//         setUpdsub(true)
//         setForms({
//           title:upd.title,
//           question:upd.question,
//           options:upd.options,
//           duration:upd.duration,
//           category:upd.category,
//           createdBy:upd.createdBy
//         })
//       }
//     };
//     getUser();
//   }, []);

  

//   useEffect(() => {
//     const fetchPollData = async () => {
//       if (editid && currentUser) {
//         try {
//           const response = await axios.post(`http://localhost:5000/polls/getone`, {
//             poll_id: editid,
//             user_id: currentUser
//           });

//           // Assuming the response contains the poll data
//           const pollData = response.data;
//           setForms({
//             title: pollData.title,
//             question: pollData.question,
//             options: pollData.options,
//             duration: pollData.duration,
//             category: pollData.category,
//             createdBy: pollData.createdBy,
//           });
//         } catch (error) {
//           console.error("Error fetching poll:", error);
//         }
//       }
//     };

//     // Fetch poll data once currentUser is available
//     if (currentUser) {
//       fetchPollData();
//     }
//   }, [editid, currentUser]);

//   const handlechange = (e) => {
//     setForms(prevForms => ({
//       ...prevForms,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleInputChange = (index, value) => {
//     // const { value } = event.target;
//     const updatedOptions = [...forms.options];
//     updatedOptions[index]={option:value};
//     setForms(prevForms => ({
//       ...prevForms,
//       options: updatedOptions
//     }));
//   };
//   const Addinput = () => {
//     setForms(prevForms => ({
//       ...prevForms,
//       options: [...prevForms.options,{ option: "" }]
//     }));
//   };
//   const Removeinput = (index) => {
//     const updatedOptions = forms.options.filter((_, i) => i !== index);
//     setForms(prevForms => ({
//       ...prevForms,
//       options: updatedOptions
//     }));
//   };
//   useEffect(() => {

//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/category/getall');
//         const fetchedCategories = response.data;
//         setCategories(fetchedCategories);


//         if (fetchedCategories.length > 0) {
//           setForms(prevForms => ({
//             ...prevForms,
//             category: fetchedCategories[0]._id
//           }));
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);




//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (upd) {
//         console.log("id", upd._id)
//         const response = await axios.post('http://localhost:5000/polls/update', {
//           ...forms,
//           poll_id: upd._id,


//         })
//         if (response.status === 200) {
//           Swal.fire({
//             title: "Good job!",
//             text: "User has been successfully added!",
//             icon: "success",
//           });
        
//        // Clear the state and navigate to HomePage
//        navi2('/HomePage', { state: {} });  // Clear state after navigating

//         }
//         else {
//           Swal.fire({
//             title: "Oops!",
//             text: "Something went wrong!",
//             icon: "error",
//           });
//         }
//       }
//       else {
//         try {
//           const resp = await axios.post('http://localhost:5000/polls/create', forms);
//           if (resp.status === 201) {
//             Swal.fire({
//               title: "Good job!",
//               text: "User has been successfully added!",
//               icon: "success",
//             });


//             navi2('/HomePage')

//           } else {
//             Swal.fire({
//               title: "Oops!",
//               text: "Something went wrong!",
//               icon: "error",
//             });
//           }
//         } catch (error) {
//           console.error('Error creating poll:', error);
//         }
//       }
//     }
//     catch (error) {
//       Swal.fire({
//         title: 'Error!',
//         text: 'There was an issue creating a poll',
//         icon: 'error',
//         confirmButtonText: 'ok'
//       });
//     };


//   };

//   return (
//     <div>

//       <form onSubmit={handleSubmit}>
//         <div className='mb-3'>
//           <FormLabel>Title</FormLabel>
//           <FormControl
//             type='text'
//             name="title"
//             value={forms.title}
//             placeholder='Title'
//             onChange={handlechange}
//             style={{ marginTop: "5vh", width: "50%", border: "solid", borderRadius: "10px" }}
//           />
//         </div>
//         <div className='mb-3'>
//           <FormLabel>Question</FormLabel>
//           <FormControl
//             type='text'
//             name='question'
//             value={forms.question}
//             placeholder='Text your Question'
//             onChange={handlechange}
//             style={{ width: "70%", height: "20vh", border: "solid", borderRadius: "10px" }}
//           />
//         </div>
//         {Array.isArray(forms.options) && forms.options.length > 0 ? (
//           forms.options.map((option, index) => (
//             <div key={index} className='mb-3'>
//               <FormLabel>{`Option ${index + 1}`}</FormLabel>
//               <FormControl
//                 name="options"
//                 value={option.option}
//                 type='text'
//                 onChange={(e)=>handleInputChange(index,e.target.value)}
//                 placeholder={`option ${index + 1}`}
//                 style={{ width: "50%", border: "solid", borderRadius: "10px" }}
//               />
//               {forms.options.length>2  && (
//               <BsTrash
//                 style={{ cursor: 'pointer', marginLeft: '10px' }}
//                 onClick={() => Removeinput(index)}
//               />
//               )}
//             </div>
//           ))
//         ) : (<p>no option</p>)}

//         <Button onClick={Addinput}>Add Option</Button>
//         <div className='mb-2'>
//           <FormLabel>Duration</FormLabel>
//           <FormControl
//             type='Number'
//             name='duration'
//             value={forms.duration}
//             onChange={handlechange}
//             style={{ width: "50%", border: "solid", borderRadius: "10px" }}
//           />
//         </div>
//         <div className='mb-3'>
//           <FormLabel>Category</FormLabel>
//           <FormControl
//             as="select"
//             name="category"
//             value={forms.category}
//             onChange={handlechange}
//             style={{ width: "50%", border: "solid", borderRadius: "10px" }}
//           >
//             <option value="">Select a category</option>
//             {categories.map(category => (
//               <option key={category._id} value={category._id}>
//                 {category.category_name}
//               </option>
//             ))}
//           </FormControl>
//         </div>
        
//           <Button type='submit' onClick={handleSubmit} >
//           {upd? "update" : "Create"}
//           </Button>
       
//       </form>
//     </div>
//   );
// };

// export default Addpoll;


import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormLabel } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Addpoll = () => {
  const { editid } = useParams();
  const [forms, setForms] = useState({
    title: "",
    question: "",
    options: [{ option: "" }, { option: "" }],
    duration: "",
    category: "",
    createdBy: "",
  });
  const [currentUser, setCurrentUser] = useState("");
  const [categories, setCategories] = useState([]);
  const [updsub, setUpdsub] = useState(false);
  const locport = useLocation();
  const navi2 = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const userData = sessionStorage.getItem("UserData");

      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setCurrentUser(parsedUserData._id);
        setForms(prevForms => ({
          ...prevForms,
          createdBy: parsedUserData._id
        }));
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchPollData = async () => {
      if (editid && currentUser) {
        try {
          const response = await axios.post('http://localhost:5000/polls/getone', {
            poll_id: editid,
            user_id: currentUser
          });
          const pollData = response.data;
          setForms({
            title: pollData.title,
            question: pollData.question,
            options: pollData.options,
            duration: pollData.duration,
            category: pollData.category,
            createdBy: pollData.createdBy,
          });
          setUpdsub(true); // Set update state flag
        } catch (error) {
          console.error("Error fetching poll:", error);
        }
      }
    };

    if (currentUser) {
      fetchPollData();
    }
  }, [editid, currentUser]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/category/getall');
        const fetchedCategories = response.data;
        setCategories(fetchedCategories);

        if (fetchedCategories.length > 0) {
          setForms(prevForms => ({
            ...prevForms,
            category: fetchedCategories[0]._id
          }));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handlechange = (e) => {
    setForms(prevForms => ({
      ...prevForms,
      [e.target.name]: e.target.value
    }));
  };

  const handleInputChange = (index, value) => {
    const updatedOptions = [...forms.options];
    updatedOptions[index] = { option: value };
    setForms(prevForms => ({
      ...prevForms,
      options: updatedOptions
    }));
  };

  const Addinput = () => {
    setForms(prevForms => ({
      ...prevForms,
      options: [...prevForms.options, { option: "" }]
    }));
  };

  const Removeinput = (index) => {
    const updatedOptions = forms.options.filter((_, i) => i !== index);
    setForms(prevForms => ({
      ...prevForms,
      options: updatedOptions
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (updsub) {
        const response = await axios.post('http://localhost:5000/polls/update', {
          ...forms,
          poll_id: editid
        });
        if (response.status === 200) {
          Swal.fire({
            title: "Good job!",
            text: "Poll has been successfully updated!",
            icon: "success",
          });
          navi2('/HomePage', { state: {} });  // Clear state after navigating
        } else {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong!",
            icon: "error",
          });
        }
      } else {
        const resp = await axios.post('http://localhost:5000/polls/create', forms);
        if (resp.status === 201) {
          Swal.fire({
            title: "Good job!",
            text: "Poll has been successfully created!",
            icon: "success",
          });
          navi2('/HomePage');
        } else {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong!",
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue creating or updating the poll',
        icon: 'error',
        confirmButtonText: 'ok'
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <FormLabel>Title</FormLabel>
          <FormControl
            type='text'
            name="title"
            value={forms.title}
            placeholder='Title'
            onChange={handlechange}
            style={{ marginTop: "5vh", width: "50%", border: "solid", borderRadius: "10px" }}
          />
        </div>
        <div className='mb-3'>
          <FormLabel>Question</FormLabel>
          <FormControl
            type='text'
            name='question'
            value={forms.question}
            placeholder='Text your Question'
            onChange={handlechange}
            style={{ width: "70%", height: "20vh", border: "solid", borderRadius: "10px" }}
          />
        </div>
        {Array.isArray(forms.options) && forms.options.length > 0 ? (
          forms.options.map((option, index) => (
            <div key={index} className='mb-3'>
              <FormLabel>{`Option ${index + 1}`}</FormLabel>
              <FormControl
                name="options"
                value={option.option}
                type='text'
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                style={{ width: "50%", border: "solid", borderRadius: "10px" }}
              />
              {forms.options.length > 2 && (
                <BsTrash
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => Removeinput(index)}
                />
              )}
            </div>
          ))
        ) : (<p>No options</p>)}

        <Button type="button" onClick={Addinput}>Add Option</Button>
        <div className='mb-2'>
          <FormLabel>Duration</FormLabel>
          <FormControl
            type='number'
            name='duration'
            value={forms.duration}
            onChange={handlechange}
            style={{ width: "50%", border: "solid", borderRadius: "10px" }}
          />
        </div>
        <div className='mb-3'>
          <FormLabel>Category</FormLabel>
          <FormControl
            as="select"
            name="category"
            value={forms.category}
            onChange={handlechange}
            style={{ width: "50%", border: "solid", borderRadius: "10px" }}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </FormControl>
        </div>
        <Button type='submit'>
          {updsub ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default Addpoll;
