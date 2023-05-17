import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button, Container, Card, CardBody } from 'reactstrap';
import { JobOpeningForm } from './JobOpeningEditForm'
import { getAllJobOpenings, getSingleJobOpening, editJobOpening } from '../services/job-opening-service';
import { getCurrentUserDetail } from '../auth';
import { getUserByEmail } from '../services/user-service';

export const JobOpeningEditor = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobOpening, setSelectedJobOpening] = useState(null);
  const [postedUserDto, setPostedUserDto] = useState(null);




  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const fetchJobOpenings = async () => {
    try {
      const data = await getAllJobOpenings();
      //   const data = await response.json();
      let nj = [];
      data.forEach(((jobOpeningDto) => {
        nj.push({
          jobId: jobOpeningDto?.id,
          jobDescription: jobOpeningDto?.jobDescription,
          postedBy: jobOpeningDto?.user?.email,
          cgpaCutoff: jobOpeningDto?.cgpaCutoff,
          companyName: jobOpeningDto?.company?.companyName,
          companyID: jobOpeningDto?.company?.id,
          jobProfile: jobOpeningDto?.jobProfile,
        })
      }))

      setJobOpenings(nj);
      //   setJobOpenings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJobIdSelect = async (event) => {
    const jobId = parseInt(event.target.value);

    if (jobId) {
      try {
        const jobOpeningDto = await getSingleJobOpening(jobId);
        // const data = await response.json();
        setSelectedJobId(jobId);
        let sjo = {
          jobId: jobOpeningDto?.id,
          jobDescription: jobOpeningDto?.jobDescription,
          postedBy: jobOpeningDto?.user?.email,
          cgpaCutoff: jobOpeningDto?.cgpaCutoff,
          companyName: jobOpeningDto?.company?.companyName,
          jobProfile: jobOpeningDto?.jobProfile,
          companyId: jobOpeningDto?.company?.id
        }
        setPostedUserDto(jobOpeningDto?.user);
        setSelectedJobOpening(sjo);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedJobId(null);
      setSelectedJobOpening(null);
    }
  };





  const handleJobOpeningFormSubmit = async (formData) => {
    try {
      console.log(formData);
      // if(!fetchedUser){
      //     fetchUserByEmail(selectedJobOpening.postedBy);
      //     setFetchedUser(true);
      //   }
      console.log(postedUserDto);
      const jobOpeningDto = await editJobOpening({
        id: formData.jobId,
        company: {
          id: formData.companyId,
          companyName: formData.companyName
        },
        cgpaCutoff: formData.cgpaCutoff,
        jobDescription: formData.jobDescription,
        jobProfile: formData.jobProfile,
        user: postedUserDto,
      })
      setSelectedJobOpening(null);
      //   const response = await editJobOpening();

      //   if (response.ok) {
      //     // Clear the selected job opening state after submitting the form
      //     setSelectedJobOpening(null);
      //   } else {
      //     console.log(`Failed to submit job opening form`);
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          }}>Edit Job</h1>
          <FormGroup>
            <Label for="jobIdSelect">Select Job ID:</Label>
            <Input type="select" name="jobIdSelect" id="jobIdSelect" onChange={handleJobIdSelect}>
              <option value="">Select a job ID</option>
              {jobOpenings.map((jobOpening) => (
                <option key={jobOpening.jobId} value={jobOpening.jobId}>
                  {jobOpening.jobId}
                </option>
              ))}
            </Input>
          </FormGroup>
          {selectedJobOpening && (
            <div>
              <JobOpeningForm jobOpening={selectedJobOpening} onSubmit={handleJobOpeningFormSubmit} />
            </div>
          )}
        </CardBody>

      </Card>
    </Container>
  );
};

