import React, { useState, useEffect } from 'react';
import { Table, Button, InputGroup, InputGroupText, Input, Container, Card, CardBody } from 'reactstrap';
import { getAllJobOpenings, deleteJobOpening, searchJobOpening } from '../services/job-opening-service';
import { toast } from 'react-toastify'
export const JobOpeningsList = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const fetchJobOpenings = async () => {
    try {
      //   const response = await fetch('/api/job-openings');
      //   const data = await response.json();
      //   setJobOpenings(data);
      const allJobOpeningDto = await getAllJobOpenings();
      console.log(allJobOpeningDto);
      const njo = []
      allJobOpeningDto.forEach((jobOpeningDto) => {
        njo.push({
          jobId: jobOpeningDto?.id,
          jobDescription: jobOpeningDto?.jobDescription,
          postedBy: jobOpeningDto?.user?.email,
          cgpaCutoff: jobOpeningDto?.cgpaCutoff,
          companyName: jobOpeningDto?.company?.companyName,
        })
      })
      console.log(njo)
      setJobOpenings(njo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    const resp = await searchJobOpening(searchText);
    const njo = []
    resp.forEach((jobOpeningDto) => {
      njo.push({
        jobId: jobOpeningDto?.id,
        jobDescription: jobOpeningDto?.jobDescription,
        postedBy: jobOpeningDto?.user?.email,
        cgpaCutoff: jobOpeningDto?.cgpaCutoff,
        companyName: jobOpeningDto?.company?.companyName,
      })
    })
    console.log(njo)
    setJobOpenings(njo);
  }

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  //   const handleEditJobOpening = (jobOpening) => {
  //     // handle edit job opening logic here
  //   };

  const handleDeleteJobOpening = async (jobOpeningId) => {
    // handle delete job opening logic here
    try {
      const resp = await deleteJobOpening(jobOpeningId);
      toast.success("Job Deleted Successfully");
      fetchJobOpenings();
      console.log(resp);
    }
    catch (err) {
      console.log(err);
    }

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
          }}>Job Openings</h1>
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
          <div>
            <div className="table-responsive">
              <Table responsive striped hover className="table-fixed">
                <thead>
                  <tr>
                    <th className="col-1">Job ID</th>
                    <th className="col-5">Job Description</th>
                    <th className="col-2">Posted By</th>
                    <th className="col-2">CGPA Cutoff</th>
                    <th className="col-2">Company Name</th>
                    <th className="col-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobOpenings.map((jobOpening) => (
                    <tr key={jobOpening.jobId}>
                      <td>{jobOpening.jobId}</td>
                      <td className="text-justify">{jobOpening.jobDescription}</td>
                      <td>{jobOpening.postedBy}</td>
                      <td>{jobOpening.cgpaCutoff}</td>
                      <td>{jobOpening.companyName}</td>
                      <td>
                        {/* <Button color="primary" onClick={() => handleEditJobOpening(jobOpening)}>
                  Edit
                </Button> */}
                        <Button color="" onClick={() => handleDeleteJobOpening(jobOpening.jobId)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>

  );
};

