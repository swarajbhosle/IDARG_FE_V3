import { Alert } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink, Container, Card, CardBody, Form, FormGroup, FormText, Label, Input, Button } from 'reactstrap';
import './styles/Dashboard.css';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth/index';
import { toast } from 'react-toastify';
import { ResumeCard } from './Resume'
import { CompanyList } from './Company'
import { JobOpeningForm } from './JobOpeningModeratorAdd';
import { JobOpeningsList } from './JobOpeningModeratorView';
import { JobOpeningEditor } from './JobOpeningModeratorEdit';
import { JobApplications } from './JobApplicationModeratorView';
import { EmailSendForm } from './ModeratorSendEmail';
import { StudentPlacementTable } from './PlacementStats';
import { getUserByEmail, updateUser } from '../services/user-service';
import { ModeratorBatchUpdateStatus } from './BatchStatusChange';
import InterviewPlanForm from './InterviewSchedulingForm';
import InterviewPlanner from './InterviewSchedulingForm';

const ModeratorDashboard = () => {
    const [active, setActive] = useState('profile');
    const [showNavbar, setShowNavbar] = useState(true);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();

    const handleNavItemClick = (item) => {
        setActive(item);
    };

    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    }

    useEffect(() => {
        setLogin(isLoggedIn());
        setUser(getCurrentUserDetail());
    }, [login])

    const signOut = () => {
        doLogout(() => {
            setLogin(false);
            toast.success("Logged out !!");
            navigate("/")
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let old_usr = getCurrentUserDetail();
        old_usr.rollNo = event.target.elements.rollno.value;
        old_usr.phoneNumber = event.target.elements.phone.value;
        old_usr.college = event.target.elements.college.value;
        old_usr.name = event.target.elements.name.value;
        console.log('hello', old_usr);

        updateUser(old_usr).then((resp) => {
            toast.success("Updated Successfully");
            // localStorage.removeItem("data");
            // localStorage.setItem("data",JSON.stringify(resp));
            // setUser(resp);
            toast.success("Since user details updated, Please Login Again !!");
            signOut();

        }).catch((err) => {
            console.log(err);
        })


        // console.log(event.target.elements.name.value);
        // console.log(event.target.elements.email.value);
        // console.log(event.target.elements.phone.value);
        // console.log(event.target.elements.rollno.value);
        // console.log(event.target.elements.college.value);
        // Save updated form values
        // setName(event.target.elements.name.value);
        // setEmail(event.target.elements.email.value);
        // setPhone(event.target.elements.phone.value);
    };
    if (user?.role[0]?.roleName != 'MODERATOR') {
        return (<>
            <div>Not authorized</div>
        </>)
    }

    return (
        <div className="dashboard-wrapper">
            {showNavbar && (
                <div className="sidenav">
                    <Navbar className="navbar-light">
                        <Nav vertical >
                            <NavItem className="sidenav-item" style={{ marginRight: "1rem", marginBottom: "3rem" }}>
                                {/* <img
                                    src={require("./logo/logo_new.png")}
                                    alt="Logo"
                                    className="mr-2"
                                    style={{ width: "200px", marginTop: "1rem", marginBottom: "3rem" }}
                                /> */}
                                <h1 style={{ "color": "black" }}>IDARG</h1>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    hre f="#"
                                    onClick={() => handleNavItemClick('profile')}
                                    className={active === 'profile' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }} ></i>
                                    Profile
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('jobopenings')}
                                    className={active === 'jobopenings' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }}></i>
                                    Post Job opening
                                </NavLink>
                            </NavItem>
                            
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('company')}
                                    className={active === 'company' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }}></i>
                                    Company
                                </NavLink>
                            </NavItem>
                            

                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('viewjobopenings')}
                                    className={active === 'viewjobopenings' ? 'active' : ''}
                                >
                                    <i className="far fa-file-alt fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }}></i>
                                    View Job Openings
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('editjobopenings')}
                                    className={active === 'editjobopenings' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }}></i>
                                    Edit Job Opening
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('viewapplications')}
                                    className={active === 'viewapplications' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }}></i>
                                    View Applications
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('statuschange')}
                                    className={active === 'statuschange' ? 'active' : ''}
                                >
                                    <i className="fas fa-cog fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }}></i>
                                    Batch Update Application Status
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('sendemail')}
                                    className={active === 'sendemail' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }}></i>
                                    Send Email
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('scheduleinterviews')}
                                    className={active === 'scheduleinterviews' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }}></i>
                                    Schedule Interviews
                                </NavLink>
                            </NavItem>
                            {/* <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('placementstatus')}
                                    className={active === 'placementstatus' ? 'active' : ''}
                                >
                                    <i className="fas fa-cog fa-lg mr-3"></i>
                                    Placement Status
                                </NavLink>
                            </NavItem> */}
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('placementstats')}
                                    className={active === 'placementstats' ? 'active' : ''}
                                >
                                    <i className="fas fa-cog fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }}></i>
                                    Placement Statistics
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item mt-auto">
                                <NavLink href="#" onClick={signOut}>
                                    <i className="fas fa-sign-out-alt fa-lg mr-3" style={{ marginRight: "1rem", marginBottom: "1rem" }}></i>
                                    Sign out
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
            )}

            <div className="content-wrapper">
                {active === 'profile' && (
                    <Container className="d-flex justify-content-center align-items-center card-container">
                        <Card className="card p-4 shadow" style={{
                            overflow: "auto",
                            width: "75vw",
                            height: "95vh",
                            // marginRight:"100px",
                            // padding: "15rem",
                            borderRadius: "2rem",
                            boxShadow: "0 0 50px 0 rgba(1, 0, 0, 1);",
                        }}>
                            <CardBody>
                                <h1 style={{
                                    color: "#7a92eb",
                                }}>My Profile</h1>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input type="text" name="name" id="name" defaultValue={user?.name} />
                                        <FormText color="muted">
                                            Change your full name (e.g. Divyesh Rana)
                                        </FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" defaultValue={user?.email} disabled />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone">Phone</Label>
                                        <Input type="text" name="phone" id="phone" defaultValue={user?.phoneNumber} disabled={user?.phoneNumber != null} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="college">College/University</Label>
                                        <Input type="text" name="college" id="college" defaultValue={user?.college} />
                                        <FormText color="muted">
                                            Change your college (e.g. IIIT Allahabad)
                                        </FormText>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="rollno">Roll number</Label>
                                        <Input type="text" name="rollno" id="rollno" defaultValue={user?.rollNo} disabled={user?.phoneNumber != null} />
                                        <FormText color="muted">
                                            Change your roll no. (e.g. IIT2019063)
                                        </FormText>
                                    </FormGroup>
                                    <div className="d-flex justify-content-center">
                                        <Button type="submit" className="mt-3 btn-lg">Update</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Container>
                )}
                {active === 'company' && (
                    <CompanyList />
                )}
                {active === 'jobopenings' && (
                    <JobOpeningForm />
                )}
                {active === 'viewjobopenings' && (
                    <JobOpeningsList />
                )}
                {active === 'editjobopenings' && (
                    <JobOpeningEditor />
                )}
                {active === 'viewapplications' && (
                    <JobApplications />
                )}
                {active === 'statuschange' && (
                    <ModeratorBatchUpdateStatus />
                )}
                {active === 'sendemail' && (
                    <EmailSendForm />
                )}
                {active === 'placementstats' && (
                    <StudentPlacementTable />
                )}
                {active === 'scheduleinterviews' && (
                    <InterviewPlanner />
                )}


                {/* {active === 'myresume' && (
                    <ResumeCard/>
                    // <div>
                    //     <h1>My resume</h1>
                    //     <p>You have no resume saved.</p>
                    // </div>
                )} */}
                {/* {active === 'placementstatus' && (
                    <div>
                        <h1>Placement Status</h1>
                        <p>All placed</p>
                    </div>
                )} */}

            </div>
        </div>
    );
};

export default ModeratorDashboard;
