import { Alert } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink, Container, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './styles/Dashboard.css';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth/index';
import { toast } from 'react-toastify';
import { ResumeCard } from './Resume'
import { JobOpeningsTable } from './JobOpeningStudentView'
import { MyApplications } from './MyApplicationsViewStudent';
import { getUserByEmail } from '../services/user-service';
import { StudentPlacementStatus } from './StudentPlacementStatus';
import { StudentPlacementTable } from './PlacementStats';

// import { SearchBar } from './Search';

const StudentDashboard = () => {
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
        const fetchUserDetails = async () => {
            const response = await getUserByEmail(getCurrentUserDetail().email);
            console.log(response);
            setUser(response);
        }
        fetchUserDetails();
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
        // Save updated form values
        // setName(event.target.elements.name.value);
        // setEmail(event.target.elements.email.value);
        // setPhone(event.target.elements.phone.value);
    };

    return (
        <div className="dashboard-wrapper">
            {showNavbar && (
                <div className="sidenav">
                    <Navbar className="navbar-light">
                        <Nav vertical >
                            <NavItem className="sidenav-item">
                                <img
                                    src={require("./logo/logo_new.png")}
                                    alt="Logo"
                                    className="mr-2"
                                    style={{ width: "200px", marginTop: "1rem", marginBottom: "3rem" }}
                                />
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('profile')}
                                    className={active === 'profile' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3"></i>
                                    Profile
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('jobopenings')}
                                    className={active === 'jobopenings' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3"></i>
                                    Job openings
                                </NavLink>
                            </NavItem>
                            {/* <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('search')}
                                    className={active === 'search' ? 'active' : ''}
                                >
                                    <i className="fas fa-cog fa-lg mr-3"></i>
                                    Search
                                </NavLink>
                            </NavItem> */}

                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('applications')}
                                    className={active === 'applications' ? 'active' : ''}
                                >
                                    <i className="far fa-file-alt fa-lg mr-3"></i>
                                    My Applications
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('myresume')}
                                    className={active === 'myresume' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3"></i>
                                    My Resume
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('placementstatus')}
                                    className={active === 'placementstatus' ? 'active' : ''}
                                >
                                    <i className="fas fa-cog fa-lg mr-3"></i>
                                    Placement Status
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('placementstats')}
                                    className={active === 'placementstats' ? 'active' : ''}
                                >
                                    <i className="fas fa-cog fa-lg mr-3"></i>
                                    Placement Statistics
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item mt-auto">
                                <NavLink href="#" onClick={signOut}>
                                    <i className="fas fa-sign-out-alt fa-lg mr-3"></i>
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
                            width: "75vw",
                            // marginRight:"100px",
                            // padding: "15rem",
                            borderRadius: "2rem",
                            boxShadow: "0 0 50px 0 rgba(1, 0, 0, 1);"
                        }}>
                            <CardBody>
                                <h1>My Profile</h1>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input type="text" name="name" id="name" defaultValue="hello" />
                                        <FormText color="muted">
    Enter your full name (e.g. John Smith)
  </FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" defaultValue="lol" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone">Phone</Label>
                                        <Input type="text" name="phone" id="phone" defaultValue="lol" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="message">Message</Label>
                                        <Input type="textarea" name="message" id="message" defaultValue="lol" disabled />
                                    </FormGroup>
                                    <div className="d-flex justify-content-center">
                                        <Button type="submit" className="mt-3 btn-lg">Submit</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Container>
                    // <div>
                    //     <h1>Profile</h1>
                    //     <p>Name : {user?.email.split('@')[0].toUpperCase()}</p>
                    //     <p>Email : {user?.email}</p>
                    //     <p>Phone : +91 8457459455</p>
                    //     <p>Role : {user?.role[0]?.roleName}</p>
                    //     <p>College: {user?.college}</p>
                    // </div>
                )}
                {active === 'jobopenings' && (
                    // <div>
                    //     <h1>Job Posts</h1>
                    //     <p>There is no job post yet.</p>
                    // </div>
                    <JobOpeningsTable />
                )}
                {active === 'applications' && (
                    // <div>
                    //     <h1>Applications</h1>
                    //     <p>You have no applications.</p>
                    // </div>
                    <MyApplications />
                )}
                {active === 'myresume' && (
                    <ResumeCard />
                    // <div>
                    //     <h1>My resume</h1>
                    //     <p>You have no resume saved.</p>
                    // </div>
                )}
                {active === 'placementstatus' && (
                    <StudentPlacementStatus userEmail={user.email} />
                )}
                {active === 'placementstats' && (
                    <StudentPlacementTable />
                )}
                {/* {active === 'search' && (
                    <SearchBar />
                )} */}
            </div>
        </div>
    );
};

export default StudentDashboard;
