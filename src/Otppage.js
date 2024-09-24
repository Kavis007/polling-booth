// import axios from 'axios'
// import React, { useState } from 'react'
// import { Button, Card, Col, Form, FormControl, FormLabel, Row } from 'react-bootstrap'
// import Swal from 'sweetalert2'
// import api from './api'
// import { useNavigate } from 'react-router-dom'

// const Otppage = () => {
    
//     const [state2, setState2] = useState({
//         number: null,
//         appName: "POLL APP"
//     })
//     let pat=useNavigate()
//     const [otp1, setOtp1] = useState("")
    
//     const handleChange = (e) => {
//         setState2({ ...state2, [e.target.name]: e.target.value });
//     };
//     const handlechange1 = (e) => {
//         setOtp1(e.target.value);
//     }
//     // const Genotp = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //         const response = await axios.post(`${api}/mobileauth/send-otp-sms`, state2)
//     //         if (response.status === 200) {

//     //             Swal.fire({
//     //                 title: "Good job!",
//     //                 text: "otp has been successfully sended!",
//     //                 icon: "success",

//     //             });
//     //             setVerify(true);
                
               
//     //         } else {
//     //             Swal.fire({
//     //                 title: "Oops!",
//     //                 text: "Something went wrong!",
//     //                 icon: "error",
//     //             });
//     //         }
//     //     } catch (error) {
//     //         Swal.fire({
//     //             title: "Oops!",
//     //             text: "An error occurred. Please try again later.",
//     //             icon: "error",
//     //         });
//     //     }

//     // }
//     // const Addphnum=async(e)=>{

//     // }
//     const VerifyOtp = async(e) => {
//         e.preventDefault()

//         try {
//             const response = await axios.post(`${api}/mobileauth/verify-otp-sms`, {
//                 number:state2.number,
//                 otp:otp1
//             })
//             if (response.status === 200) {

//                 Swal.fire({
//                     title: "Good job!",
//                     text: "otp has been successfully sended!",
//                     icon: "success",

//                 });
//                 setVerify(true);
//                 pat("/")
//             } else {
//                 Swal.fire({
//                     title: "Oops!",
//                     text: "Something went wrong!",
//                     icon: "error",
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 title: "Oops!",
//                 text: "An error occurred. Please try again later.",
//                 icon: "error",
//             });
//         }

//     }
//     return (
//         <div>
//             <Card>
//                 <Row style={{ height: "30vh" }}>
//                     SDjsb
//                 </Row>
//                 <Row style={{ height: '50vh' }}>
//                     <Col>

//                     </Col>
//                     <Col className='d-flex justify-content-center'>
//                         <Card style={{ width: "90vh", height: "40vh", padding: '2rem' }}>
//                             <form>
//                                 <div className='mb-3'>
//                                     <FormLabel>Phonenumber</FormLabel>
//                                     <input type='number' name="number" value={state2.number} style={{ width: "80vh" }} className='form-control' onChange={handleChange}></input>
//                                 </div>
//                                 <div className='mb-5 d-flex justify-content-center'>
//                                     {!verify &&
//                                         <Button onClick={Genotp}>Send OTP</Button>}
//                                 </div>
//                                 <div >
//                                     {verify &&
//                                         <>
//                                             <label>.</label>
//                                             <input type='number' placeholder='enter the otp' name="otp1" value={otp1} className='form-control' onChange={handlechange1} style={{ width: "vh" }}></input>
//                                             <div className=' md-3 d-flex justify-content-center'>
//                                                 <Button onClick={VerifyOtp} >Verify OTP</Button>
//                                             </div>
//                                         </>}
//                                 </div>
                                

//                             </form>
//                         </Card>
//                     </Col>
//                     <Col>

//                     </Col>
//                 </Row>
//                 <Row style={{ height: '20vh' }}>

//                 </Row>
//             </Card>
//         </div>
//     )
// }

// export default Otppage
