import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { deleteJobApplication, getAllApplicationsForUser, searchJobApplication } from '../services/job-application-service';
import { Button, InputGroup, InputGroupText, Input, Card, CardBody, Container } from 'reactstrap'
import { toast } from 'react-toastify'
import './styles/TabularView.css';
import { getCurrentUserDetail } from '../auth';
export const MyApplications = () => {
  const [myApplications, setMyApplications] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchMyApplications = async () => {
      const response = await getAllApplicationsForUser();
      console.log(response);
      setMyApplications(response);
    }
    fetchMyApplications();
    // fetch('https://example.com/api/applications')
    //   .then(response => response.json())
    //   .then(data => setApplications(data))
    //   .catch(error => console.error(error));
  }, []);

  const fetchMyApplications = async () => {
    const response = await getAllApplicationsForUser();
    console.log(response);
    setMyApplications(response);
  }
  const handleSearch = async () => {
    const resp = await searchJobApplication(searchText);
    let arr = [];
    resp.forEach((r) => {
      if (r.user.email == getCurrentUserDetail().email) arr.push(r);
    })
    if (arr.length) setMyApplications(arr);
  }

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const withdrawApplication = async (application) => {
    const resp = await deleteJobApplication(application.id);
    toast.success("Application withdrawl successfull !!");
    fetchMyApplications();
  }

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center card-container">
        <Card className="card p-4 shadow" style={{
          overflow: "auto",
          width: "75vw",
          height: "95vh",
          borderRadius: "2rem",
          boxShadow: "0 0 10px 0 rgba(1, 0, 0, 1);",
        }}>
          <CardBody>
            <h1 style={{
              color: "#7a92eb",
            }}>My Applications</h1>
            <InputGroup className="mb-3">
              <Input
                placeholder="Enter Search query"
                value={searchText}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
                className="mr-2"
              />
              <InputGroupText addonType="append" style={{
                backgroundColor: "white",
                border: "none"
              }}>
                <Button color="" className="ml-2" onClick={handleSearch}>
                  Search
                </Button>
              </InputGroupText>
            </InputGroup>
            <div className="table-responsive">
              {myApplications.length
                ?
                <Table responsive striped hover className="table-fixed">
                  <thead>
                    <tr>
                      <th>Application ID</th>
                      <th>Job ID</th>
                      <th>Company Name</th>
                      <th>Job Profile</th>
                      <th>Status</th>
                      <th>Applied At</th>
                      <th>Updated At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myApplications.map(application => (
                      <tr key={application.id}>
                        <td>{application?.id}</td>
                        <td>{application?.jobOpening?.id}</td>
                        <td>{application?.jobOpening?.company?.companyName}</td>
                        <td>{application?.jobOpening?.jobProfile}</td>
                        <td>{application?.status}</td>
                        <td>{new Date(application?.createdAt).toLocaleString("ru")}</td>
                        <td>{new Date(application?.updatedAt).toLocaleString("ru")}</td>
                        <td>
                          <Button onClick={() => withdrawApplication(application)} disabled={application.status != "APPLIED"}>Withdraw</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                :
                <p>You have no applications yet
                </p>
              }
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>

  );
};

