import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/AuthForms.css";
import { logIn } from "../services/user-service";
import { doLogin, isLoggedIn } from "../auth/index";
import { useNavigate } from "react-router-dom";
import { getCurrentUserDetail } from "../auth/index";
import { getUserByEmail } from "../services/user-service";

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

const RoleSelection = () => {
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
    toast.success("Already logged in !!", {
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
      navigate("/admin/dashboard");
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
          console.log(loginDetail);
          toast.error("Role not allowed !!");
        }
      })
      .catch((error) => {
        toast.error("Invalid credentials !!")
        console.log(error);
      });
  };

  return (
    <div className="position-relative container-fluid d-flex justify-content-center align-items-center bg-image bg-opacity">
      {/* White card */}
      <div
        className="card p-4 position-absolute top-50 start-50 translate-middle"
        style={{
          width: "50%",
          height: "70%",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: "50px",
          overflow: "auto",
        }}
      >
        <div className="d-flex flex-column justify-content-center h-100">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <img
              src={require("./logo/logo_new.png")}
              alt="Logo"
              className="mr-2"
              style={{ width: "400px", marginTop: "15rem" }}
            />
          </div>
          {/* <h3 className="text-center mb-3 discord-text">Sign In</h3> */}
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="email" style={{ marginBottom: "0.5rem" }}>
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
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
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="password" style={{ marginBottom: "0.5rem" }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e, "password")}
                  invalid={
                    error.errors?.response?.loginDetail?.password ? true : false
                  }
                  value={loginDetail.password}
                />
                <FormFeedback>
                  {error.errors?.response?.loginDetail?.password}
                </FormFeedback>
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="role" style={{ marginBottom: "0.5rem" }}>
                  Select your role:
                </label>
                <select
                  className="form-control"
                  id="role"
                  onChange={(e) => handleChange(e, "role")}
                  value={loginDetail.role}
                >
                  <option value="">--Select role--</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="form-group d-flex justify-content-center">
                <button type="submit" className="btn btn-lg">
                  Sign In
                </button>
              </div>
            </div>
          </form>
          <div className="row mt-3">
            <div className="col d-flex justify-content-center">
              <Link
                to="/register"
                className="btn btn-lg "
                style={{ marginBottom: "1rem" }}
              >
                New user? Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
