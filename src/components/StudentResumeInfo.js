import React from "react";
import '../components/styles/StudentResumeInfo.css'

import { useState, useEffect } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
// import "./styles/AuthForms.css"
import { getAllInviteKeys } from "../services/user-service";
import { useNavigate } from "react-router-dom";

import { logoImage, PROJECT_NAME } from '../imports'
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
    FormFeedback,
} from "reactstrap";

const StudentResumeInfo = () => {
    const userData = JSON.parse(localStorage.getItem("data"));
    console.log(userData);
    const [data, setData] = useState({
        name: `${userData?.name}`,
        email: `${userData?.email}`,
        phone: `${userData?.phone}`,
        resume: `${userData?.resume}`,
        skills: `${userData?.skills}`,
        college: `${userData?.college}`,
        degree: `${userData?.degree}`,
        designation: `${userData?.designation}`,
        domain: `${userData?.domain}`,
        companies: `${userData.companies}`,
        tot_exp: `${userData.tot_exp}`,
        summary: `${userData.summary}`,
        password: `${userData.password}`,
    });

    // useEffect(()=>{
    //     console.log(userData);
    //     setData({...data,["name"]:userData.name});
    //     setData({...data,["email"]:userData.email});
    //     setData({...data,["phone"]:userData.phone});
    //     setData({...data,["resume"]:userData.resume});
    //     setData({...data,["skills"]:userData.skills});
    //     setData({...data,["college"]:userData.college});
    //     setData({...data,["degree"]:userData.degree});
    //     setData({...data,["desgination"]:userData.designation});
    //     setData({...data,["domain"]:userData.domain});
    //     setData({...data,["companies"]:userData.companies});
    //     setData({...data,["tot_exp"]:userData.tot_exp});
    //     setData({...data,["summary"]:userData.summary});
    //     setData({...data,["password"]:userData.password});
    // },[])

    const navigate = useNavigate();

    const [error, setError] = useState({
        errors: {},
        isError: false,
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    //handle change event
    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value });
    };

    const resetData = () => {
        setData({
            name: "",
            email: "",
            phone: "",
            resume: "",
            skills: [],
            college: "",
            degree: "",
            designation: [],
            domain: "",
            companies: [],
            tot_exp: 0,
            summary: "",
            password: "",
            school: ""
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("email: ", data?.email);
        console.log("password : ", data?.password);

        if (data.email.trim() == "") {
            toast.error("Valid email is required !!");
            return;
        }
        if (data.password.trim() == "") {
            toast.error("Valid password is required !!");
            return;
        }

        if (error.isError) {
            toast.error("Form data is invalid");
            setError({ ...error, isError: false });
            return;
        }
        console.log("data is ", data.email)
        localStorage.clear();
        console.log("data is ", data.email)
        localStorage.setItem('data', JSON.stringify(data))
        console.log("data is ", data.email)
        navigate("/studentlogin");

        // signUp(data)
        //     .then((resp) => {
        //         console.log(resp);
        //         console.log("success log");
        //         toast.success("User is registered successfully!!");
        //         resetData();
        //         navigate("/studentlogin");
        //     })
        //     .catch((error) => {
        //         console.log(error);

        //         setError({
        //             errors: error,
        //             isError: true,
        //         });
        //     });
    };

    return (
        <div class="big-wrapper light">
            <header>
                <div class="container">
                    <div class="logo">
                        <a href="/"><img src={logoImage} alt="Logo" /></a>
                        <a href="/"><h3>{PROJECT_NAME}</h3></a>
                    </div>

                    <div class="links">
                        <ul>
                            <li><a href="/companylogin">Are you hiring?</a></li>
                            <li><a href="/aboutus">About Us</a></li>
                            <li><a href="/contactus">Contact Us</a></li>
                            {/* <li><a href="./index2.html" class="btn">Login</a></li> */}
                            <li>
                                <button class="toggle-btn">
                                    <i class="far fa-moon"></i>
                                    <i class="far fa-sun"></i>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div class="overlay"></div>

                    <div class="hamburger-menu">
                        <div class="bar"></div>
                    </div>
                </div>
            </header>

            <div class="login-root">
                {/* <!-- <h1 style="color: black;">swaraj bhosle</h1> --> */}
                <div class="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: '1' }}>

                    <div class="box-root padding-top--24 flex-flex flex-direction--column"
                        style={{ flexGrow: '1', zIndex: '9' }}>
                        <div class="box-root padding-top--24 padding-bottom--24 flex-flex flex-justifyContent--center">
                            <h1><a href="#" rel="dofollow">{PROJECT_NAME}</a></h1>
                        </div>
                        <div class="formbg-outer">
                            <div class="formbg-first">
                                <div class="formbg-inner padding-horizontal--48">
                                    {/* <span class="padding-bottom--15">Check your details</span>  */}
                                    <form id="stripe-login" onSubmit={handleSubmit}>

                                        <div class="field padding-bottom--24">
                                            <h3 style={{ marginTop: '0px', color: 'brown' }}>Personal Information</h3>
                                        </div>

                                        <div class="horizontal-group">
                                            <div class="field padding-bottom--24 left">
                                                <label for="name">First Name</label>
                                                <input id="name" type="name" name="name"
                                                    onChange={(e) => handleChange(e, "name")}
                                                    value={data.name.split(' ')[0]} />
                                            </div>

                                            <div class="field padding-bottom--24 right">
                                                <label for="name">Last Name</label>
                                                <input type="name" name="name" value={data?.name.split(' ')[1]} />
                                            </div>
                                        </div>


                                        <div class="field padding-bottom--24">
                                            <label for="email" style={{ marginTop: '100px' }}>Email</label>
                                            <input id="email" type="email"
                                                onChange={(e) => handleChange(e, "email")} name="email" value={data?.email} />
                                        </div>

                                        <div class="field padding-bottom--24" >
                                            <label for="phone">Phone Number</label>
                                            <input id="phone" type="phone" name="phone" onChange={(e) => handleChange(e, "phone")} value={data.phone.slice(5)} />
                                        </div>

                                        <div id="karan">
                                            <div class="field padding-bottom--24">
                                                <label for="gender" >Gender</label>
                                                {/* <!-- <input type="email" name="gender"> --> */}
                                                <select name="gender" id="gender" onChange={(e) => handleChange(e, "gender")}>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                            </div>
                                        </div>



                                        <div class="field padding-bottom--24">
                                            <h3 style={{ marginTop: "50px", color: "brown" }}>Graduation</h3>
                                        </div>

                                        <div class="field padding-bottom--24">
                                            <label for="college">College Name</label>
                                            <input id="college" type="college" name="college" onChange={(e) => handleChange(e, "college")} value={data?.college} />
                                        </div>

                                        <div class="field padding-bottom--24">
                                            <label for="degree">Degree</label>
                                            <input id="degree" type="Degree" name="degree" onChange={(e) => handleChange(e, "degree")} value={data?.degree} />
                                        </div>

                                        {/* <div class="field padding-bottom--24">
                                            <label for="email">CGPA</label>
                                            <input id="cgpa" type="email" name="email" style={{ width: '30%' }} />
                                        </div> */}

                                        {/* <div class="field padding-bottom--24">
                                            <h3 style={{ marginTop: '50px', color: 'brown' }}>Highschool</h3>
                                        </div>

                                        <div class="field padding-bottom--24">
                                            <label for="email">Highschool Name</label>
                                            <input id = "highschool" type="text" name="email" onChange={(e) => handleChange(e, "highschool")} />
                                        </div>

                                        <div class="field padding-bottom--24">
                                            <label for="email">Marks</label>
                                            <input id = "highmarks" type="text" name="email" style={{ width: '30%' }} onChange={(e) => handleChange(e, "highmarks")} />
                                        </div> */}

                                        {/* <div class="field padding-bottom--24">
                                            <h3>School</h3>
                                        </div> */}

                                        {/* <div class="field padding-bottom--24">
                                            <label for="email">School Name</label>
                                            <input type="text" name="email" onChange={(e) => handleChange(e, "school")}/>
                                        </div>

                                        <div class="field padding-bottom--24">
                                            <label for="marks">Marks</label>
                                            <input id = "marks" type="email" name="email" style={{ width: '30%' }} onChange={(e) => handleChange(e, "marks")}/>
                                        </div> */}

                                        <div class="field padding-bottom--24">
                                            <h3 style={{
                                                marginTop: '50px',
                                                color: 'brown'
                                            }}>Skills</h3>
                                        </div>

                                        <div class="horizontal-group">
                                            <div class="field padding-bottom--24" style={{
                                                float: 'left',
                                                width: '20%', // please check here for margin
                                            }}>
                                                {/* <!-- <label for="name">One</label> --> */}
                                                <input type="name" name="name" value="Web Development" onChange={(e) => handleChange(e, "skills")} />
                                            </div>

                                            <div class="field padding-bottom--24 right" style={{
                                                float: 'left',
                                                width: '20%',
                                                marginLeft: '50px'
                                            }}>
                                                {/* <!-- <label for="name">Two</label> --> */}
                                                <input type="name" name="name" value="Javascript" onChange={(e) => handleChange(e, "skills")} />
                                            </div>

                                            <div class="field padding-bottom--24 right" style={{
                                                float: 'left',
                                                width: '20%',
                                                marginLeft: '50px'
                                            }}>
                                                {/* <!-- <label for="name">Three</label> --> */}
                                                <input type="name" name="name" value="Machine Learning" onChange={(e) => handleChange(e, "skills")} />
                                            </div>

                                            <div class="field padding-bottom--24 right" style={{
                                                float: 'left',
                                                width: '20%',
                                                marginLeft: '50px'
                                            }
                                            }>
                                                {/* <!-- <label for="name">Four</label> --> */}
                                                <input type="name" name="name" value="Servers" />
                                            </div>

                                        </div>

                                        {/* <!-- <div class="field padding-bottom--24">
                                            <label for="email">Python</label>
                                            <input type="email" name="email">
                                            <input type="email" name="email">
                                        </div> --> */}

                                        <div class="field padding-bottom--24">
                                            <label for="experience" style={{ marginTop: "100px" }}>Total Experience</label>
                                            <input id="tot_exp" type="number" name="email" value={data?.tot_exp} onChange={(e) => handleChange(e, "tot_exp")} />
                                        </div>

                                        <div class="field padding-bottom--24">
                                            <label for="summary" style={{ marginTop: "10px" }}>Summary</label>
                                            <textarea id="summary" type="text" name="summary" style={{ width: '600px', height: '100px' }} value={data?.summary} onChange={(e) => handleChange(e, "experience")} />
                                        </div>

                                        <div class="field padding-bottom--24">
                                            <div class="grid--50-50">
                                                <label for="password">Password</label>
                                            </div>
                                            <input type="password" name="password"
                                                placeholder="Password"
                                                id="password"
                                                onChange={(e) => handleChange(e, "password")}
                                                invalid={
                                                    error.errors?.response?.data?.password ? true : false
                                                }
                                            />
                                            <FormFeedback>
                                                {error.errors?.response?.data?.password}
                                            </FormFeedback>
                                        </div>

                                        <div class="field padding-bottom--24">
                                            <input type="submit" name="submit" value="Signup" />
                                        </div>

                                        {/* <div class="field">
                                            <a class="ssolink" href="#">please recheck your information</a>
                                        </div> */}
                                    </form>
                                </div>
                            </div>


                            <div class="footer-link padding-top--24">
                                {/* <span>Don't have an account? <a href="">Sign up</a></span> */}
                                <div class="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                    <span><a href="#">©{PROJECT_NAME} </a></span>
                                    <span><a href="/contactus">Contact</a></span>
                                    <span><a href="#">Privacy & terms</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default StudentResumeInfo
