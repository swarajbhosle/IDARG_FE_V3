// import Base from "../components/Base";
import { useState, useEffect } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import "./styles/AuthForms.css"
import { getAllInviteKeys } from "../services/user-service";
import { useNavigate } from "react-router-dom";
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

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
    inviteKey: ""
  });

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
      email: "",
      password: "",
      role: "",
      inviteKey: ""
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (error.isError) {
      toast.error("Form data is invalid");
      setError({ ...error, isError: false });
      return;
    }

    getAllInviteKeys().then((allKeys) => {
      let isKeyValid = false;
      console.log(allKeys);
      for (let key in allKeys) {
        console.log(allKeys[key], data.inviteKey);
        if (allKeys[key]?.inviteKey == data.inviteKey) {
          isKeyValid = true;
          break;
        }
      }
      if (isKeyValid) {
        //call server api for sending data
        signUp(data)
          .then((resp) => {
            console.log(resp);
            console.log("success log");
            toast.success("User is registered successfully!!");
            resetData();
            navigate("/studentlogin");
          })
          .catch((error) => {
            console.log(error);

            setError({
              errors: error,
              isError: true,
            });
          });
      }
      else {
        toast.error("Invalid invite key !!")
      }
    }).catch((error) => {
      console.log(error);
    })


  };

  return (
    <div className="position-relative container-fluid d-flex justify-content-center align-items-center bg-image bg-opacity">
      {/* White card */}
      <div
        className="card p-4 position-absolute top-50 start-50 translate-middle"
        style={{
          width: "50vw",
          height: "70vh",
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: "50px",
          overflow: "auto"
        }}
      >
        <div className="d-flex flex-column justify-content-center h-100" >
          <div className="d-flex justify-content-center align-items-center mb-3">
            <img
              src={require("./logo/logo_new.png")}
              alt="Logo"
              className="mr-2"
              style={{ width: "400px", marginTop: "15rem" }}
            />
          </div>
          <Form className="form-container">
            {/*email field */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input style={{ paddingLeft: "20px" }}
                type="email"
                placeholder="Enter email"
                id="email"
                onChange={(e) => handleChange(e, "email")}
                value={data.email}
                invalid={
                  error.errors?.response?.data?.email ? true : false
                }
              ></Input>
              <FormFeedback>
                {error.errors?.response?.data?.email}
              </FormFeedback>
            </FormGroup>

            {/*password field */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                style={{ paddingLeft: "20px" }}
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => handleChange(e, "password")}
                invalid={
                  error.errors?.response?.data?.password ? true : false
                }
                value={data.password}
              ></Input>

              <FormFeedback>
                {error.errors?.response?.data?.password}
              </FormFeedback>
            </FormGroup>

            {/*role field */}
            <FormGroup>
              <Label for="roleSelect">Register As</Label>
              <Input
                style={{ paddingLeft: "20px" }}
                id="roleSelect"
                name="select"
                type="select"
                onChange={(e) => handleChange(e, "role")}
                value={data.role}
              >
                <option value="">--Select role--</option>
                <option>Admin</option>
                {/* <option>Moderator</option> */}
                <option>Student</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="inviteKey">Invite Key</Label>
              <Input
                style={{ paddingLeft: "20px" }}
                type="text"
                placeholder="Invite Key"
                id="inviteKey"
                onChange={(e) => handleChange(e, "inviteKey")}
                value={data.inviteKey}
              ></Input>
            </FormGroup>

            <Container className="text-center">
              <Button onClick={handleSubmit} className="btn btn-lg">
                Register
              </Button>
            </Container>
          </Form>
          <div style={{
            height: "100px"
          }}>
            &nbsp;
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
