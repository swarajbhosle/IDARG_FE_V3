import React from "react";
import '../components/styles/StudentLogin.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import "./styles/AuthForms.css";
import { logIn } from "../services/user-service";
import { doLogin, isLoggedIn } from "../auth/index";
import { useNavigate } from "react-router-dom";
import { getCurrentUserDetail } from "../auth/index";
import { getUserByEmail } from "../services/user-service";

import { logoImage, shapeImage, PROJECT_NAME } from "../imports";
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

const StudentLogin = () => {

    const [loginDetail, setloginDetail] = useState({
        email: "",
        password: "",
        role: "",
      });
    
      const navigate = useNavigate();
      const [login, setLogin] = useState(false);
      const [user, setUser] = useState(undefined);
    
      const [error, setError] = useState({
        errors: {},
        isError: false,
      });
    
      useEffect(() => {
        console.log(loginDetail);
      }, [loginDetail]);
    
      useEffect(() => {
        setLogin(isLoggedIn());
        setUser(getCurrentUserDetail());
      }, [login]);
    
      //handle change event
      const handleChange = (event, property) => {
        setloginDetail({ ...loginDetail, [property]: event.target.value });
      };
    
      const resetloginDetail = () => {
        setloginDetail({
          email: "",
          password: "",
          role: "",
        });
      };
    
      if (isLoggedIn()) {
        toast.success("logged in successfully !!", {
          toastId: "alreadyLoggedIn"
        });
        if (user?.role[0]?.roleName === "STUDENT") {
          console.log("here");
          navigate("/student/dashboard");
        }
        else if (user?.role[0]?.roleName === "MODERATOR") {
          navigate("/moderator/dashboard");
        }
        else {
          navigate("/student/dashboard");
        }
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(loginDetail);
    
        //validate
        if (loginDetail.email.trim() == "") {
          toast.error("Valid email is required !!");
          return;
        }
        if (loginDetail.password.trim() == "") {
          toast.error("Valid password is required !!");
          return;
        }
    
        getUserByEmail(loginDetail.email)
          .then((UserDto) => {
            console.log(UserDto.role[0].roleName);
            if (UserDto?.role[0]?.roleName === loginDetail.role.toUpperCase()) {
              //send to server
              logIn(loginDetail)
                .then((data) => {
                  //save data to local storage
                  doLogin(data, () => {
                    console.log("Login detail is stored to local storage");
                    //redirect to user dashboard
                    if (data.user?.role[0]?.roleName === "STUDENT") {
                      navigate("/student/dashboard");
                    }
                    else if (data.user?.role[0]?.roleName === "MODERATOR") {
                      navigate("/moderator/dashboard");
                    }
                    else {
                      navigate("/admin/dashboard");
                    }
                  });
    
                  toast.success("Logged in successfully !!");
                })
                .catch((error) => {
                  console.log(error);
                  if (
                    error.response.status == 400 ||
                    error.response.status == 404
                  ) {
                    toast.error(error?.response?.data?.password);
                  } else {
                    toast.error("Invalid Credentials !!");
                  }
                });
            }
            else {
                loginDetail.role = 'STUDENT';
                logIn(loginDetail).then((data) => {
              //save data to local storage
              doLogin(data, () => {
                console.log("Login detail is stored to local storage");
                
                toast.success("Logged in successfully !!");
                navigate("/student/dashboard"); // redirecting here
                
              })});

              
            //   toast.error("Role not allowed !!");
            }
          })
          .catch((error) => {
            toast.error("Invalid credentials !!")
            console.log(error);
          });
      };

    return (
        <div class="big-wrapper light">
            <img src={shapeImage} alt="" class="shape" />
            <header>
                <div class="container">
                    <div class="logo">
                        <a href="/"><img src={logoImage} alt="Logo" /></a>
                        <a href="/"><h3>IDARG</h3></a>
                    </div>

                    <div class="links">
                        <ul>
                            <li><a href="/companylogin">Are you hiring?</a></li>
                            <li><a href="/aboutus">About Us</a></li>
                            <li><a href="/contactus">Contact Us</a></li>
                            {/* <li><a href="./index2.html"  class="btn">Login</a></li> */}
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

            <div class="showcase-area">
                <div class="container1">
                    <div class="wrapper">
                        <div class="title"><span>Login Form</span></div>
                        <form onSubmit={handleSubmit}>
                            <div class="row">
                                <i class="fas fa-user"></i>
                                <input type="email" id="email" placeholder="Email or Phone" required
                                    onChange={(e) => handleChange(e, "email")}
                                    value={loginDetail.email}
                                    invalid={
                                        error.errors?.response?.loginDetail?.email ? true : false
                                    }
                                />

                                <FormFeedback>
                                    {error.errors?.response?.loginDetail?.email}
                                </FormFeedback>

                            </div>
                            <div class="row">
                                <i class="fas fa-lock"></i>
                                <input type="password"
                                    placeholder="Password"
                                    id="password"
                                    onChange={(e) => handleChange(e, "password")}
                                    invalid={
                                        error.errors?.response?.loginDetail?.password ? true : false
                                    }
                                    value={loginDetail.password}
                                    required />

                                <FormFeedback>
                                    {error.errors?.response?.loginDetail?.password}
                                </FormFeedback>
                            </div>

                            <div class="row" style={{display: 'none'}}>
                                <i class="fas fa-lock"></i>
                                <input type="password"
                                    placeholder="role"
                                    id="role"
                                    onChange={(e) => handleChange(e, "role")}
                                    invalid={
                                        error.errors?.response?.loginDetail?.password ? true : false
                                    }
                                    defaultValue="student"
                                    value={loginDetail.role}
                                     />

                                <FormFeedback>
                                    {error.errors?.response?.loginDetail?.password}
                                </FormFeedback>
                            </div>
                            {/* <!-- <div class="pass"><a href="#">Forgot password?</a></div> --> */}
                            <div class="row button">
                                <input type="submit" value="Login" />
                            </div>
                            <div class="signup-link">Not a member? <a href="/uploadresume">Signup now</a></div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <!-- <div class="bottom-area">
            <div class="container">
                <button class="toggle-btn">
                    <i class="far fa-moon"></i>
                    <i class="far fa-sun"></i>
                </button>
            </div>
        </div> --> */}
        </div>
    )
}

export default StudentLogin

