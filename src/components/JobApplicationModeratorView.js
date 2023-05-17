import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button, Table, InputGroup, InputGroupText, Container, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import { getAllApplicationsForJobOpening, searchJobApplication, updateJobApplication } from '../services/job-application-service';
import { getAllJobOpenings } from '../services/job-opening-service';
import { toast } from 'react-toastify'

export const JobApplications = () => {
  const [selectedJobId, setSelectedJobId] = useState('');
  const [jobApplications, setJobApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [status, setStatus] = useState('');
  const [jobOpenings, setJobOpenings] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchJobApplications = async () => {
      const response = await getAllApplicationsForJobOpening(selectedJobId);
      console.log(response);
      setJobApplications(response)
      //   const response = await axios.get(`/api/jobApplications/${selectedJobId}`);
      //   setJobApplications(response.data);
    };
    const fetchJobOpenings = async () => {
      const response = await getAllJobOpenings();
      setJobOpenings(response);
    }
    fetchJobOpenings();

    if (selectedJobId) {
      fetchJobApplications();
    }
  }, [selectedJobId]);

  const fetchJobApplications = async () => {
    const response = await getAllApplicationsForJobOpening(selectedJobId);
    console.log(response);
    setJobApplications(response)
    //   const response = await axios.get(`/api/jobApplications/${selectedJobId}`);
    //   setJobApplications(response.data);
  };

  const handleJobIdChange = (event) => {
    setSelectedJobId(event.target.value);
  };

  const handleApplicationClick = (application) => {
    console.log(application);
    setSelectedApplication(application);
    setStatus(application.status);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSearch = async () => {
    const resp = await searchJobApplication(searchText);
    let arr = [];
    resp.forEach((a) => {
      if (a.jobOpening.id == selectedJobId) arr.push(a);
    })
    setJobApplications(arr);
  }

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleUpdateStatus = async () => {
    // const response = await axios.patch(`/api/jobApplications/${selectedApplication.id}`, {
    //   status: status,
    // });
    let jobApplicationDto = { ...selectedApplication }
    jobApplicationDto.status = status;
    const response = await updateJobApplication(jobApplicationDto);
    fetchJobApplications();
    toast.success("Status successfully updated !!");
    setSelectedApplication(null);
  };

  return (
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
          }}>Applications</h1>
          <div>
            <FormGroup>
              <Label for="jobId">Select Job ID:</Label>
              <Input type="select" name="jobId" id="jobId" onChange={handleJobIdChange}>
                <option value="">Select a job ID</option>
                {jobOpenings.map((jobOpening) => (
                  <option key={jobOpening.id} value={jobOpening.id}>
                    {jobOpening.id}
                  </option>
                ))}
              </Input>
            </FormGroup>

            {jobApplications.length > 0 && (
              <>
                <InputGroup className="mb-3">
                  <Input
                    placeholder="Enter Search query"
                    value={searchText}
                    onChange={handleSearchInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <InputGroupText addonType="append" style={{
                    backgroundColor: "white",
                    border: "none"
                  }}>
                    <Button color="" onClick={handleSearch}>
                      Search
                    </Button>
                  </InputGroupText>
                </InputGroup>
                {selectedApplication && (
                  <FormGroup>
                  <Label for="status">Select Updated Status for Application Id : {selectedApplication.id}</Label>
                  <InputGroup className="mb-3">
                    <Input type="select" name="status" id="status" value={status} onChange={handleStatusChange}>
                      <option value="APPLIED">Applied</option>
                      <option value="SHORTLISTED">Shortlisted</option>
                      <option value="INTERVIEWING">Interviewing</option>
                      <option value="SELECTED">Selected</option>
                      <option value="REJECTED">Rejected</option>
                    </Input>
                    <InputGroupText addonType="append" style={{
                      backgroundColor: "white",
                      border: "none"
                    }}>
                      <Button color="" onClick={handleUpdateStatus}>
                        Confirm
                      </Button>
                    </InputGroupText>
                  </InputGroup>
                  </FormGroup>
                )}
                <Table responsive striped hover className="table-fixed">
                  <thead>
                    <tr>
                      <th>Application Id</th>
                      <th>Applicant Name</th>
                      <th>Applied Company</th>
                      <th>Applied Profile</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobApplications.map((application) => (
                      
                      <tr key={application.id} >
                        <td>{application.id}</td>
                        <td>{application.user.email.split('@')[0].toUpperCase()}</td>
                        <td>{application.jobOpening.company.companyName}</td>
                        <td>{application.jobOpening.jobProfile}</td>
                        <td>{application.user.email}</td>
                        <td>{application.status}</td>
                        <td>
                          <Button color="" onClick={() => handleApplicationClick(application)}>
                            Change Status
                          </Button>
                        </td>
                      </tr>
                      
                    ))}
                  </tbody>
                </Table>
              </>
            )}

          </div>
        </CardBody>
      </Card>
    </Container>

  );
};

