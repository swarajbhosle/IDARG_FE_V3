import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const JobOpeningForm = ({ jobOpening, onSubmit }) => {
  const [jobId, setJobId] = useState(jobOpening.jobId || '');
  const [jobDescription, setJobDescription] = useState(jobOpening.jobDescription || '');
  const [postedBy, setPostedBy] = useState(jobOpening.postedBy || '');
  const [cgpaCutoff, setCgpaCutoff] = useState(jobOpening.cgpaCutoff || '');
  const [companyName, setCompanyName] = useState(jobOpening.companyName || '');
  const [jobProfile, setJobProfile] = useState(jobOpening.jobProfile || '');
  const [companyId, setCompanyId] = useState(jobOpening.companyId || '');

  useEffect(() => {
    setJobId(jobOpening.jobId || '');
    setJobDescription(jobOpening.jobDescription || '');
    setPostedBy(jobOpening.postedBy || '');
    setCgpaCutoff(jobOpening.cgpaCutoff || '');
    setCompanyName(jobOpening.companyName || '');
    setJobProfile(jobOpening.jobProfile || '');
    setCompanyId(jobOpening.companyId || '');
  }, [jobOpening]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      jobId,
      jobDescription,
      postedBy,
      cgpaCutoff,
      companyName,
      jobProfile,
      companyId,
    };

    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormGroup>
        <Label for="jobId">Job ID:</Label>
        <Input type="text" name="jobId" id="jobId" value={jobId} onChange={(event) => setJobId(event.target.value)} disabled />
      </FormGroup>
      <FormGroup>
        <Label for="jobDescription">Job Description:</Label>
        <Input type="textarea" name="jobDescription" style={{height:"200px"}} id="jobDescription" value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="jobProfile">Job Profile:</Label>
        <Input type="text" name="jobProfile" id="jobProfile" value={jobProfile} onChange={(event) => setJobProfile(event.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="postedBy">Posted By:</Label>
        <Input type="text" name="postedBy" id="postedBy" value={postedBy} onChange={(event) => setPostedBy(event.target.value)} required disabled />
      </FormGroup>
      <FormGroup>
        <Label for="cgpaCutoff">CGPA Cutoff:</Label>
        <Input type="number" name="cgpaCutoff" id="cgpaCutoff" value={cgpaCutoff} onChange={(event) => setCgpaCutoff(event.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="jobId">Company ID:</Label>
        <Input type="text" name="companyId" id="companyId" value={companyId} onChange={(event) => setCompanyId(event.target.value)} disabled />
      </FormGroup>
      <FormGroup>
        <Label for="companyName">Company Name:</Label>
        <Input type="text" name="companyName" id="companyName" value={companyName} onChange={(event) => setCompanyName(event.target.value)} required disabled />
      </FormGroup>
      <div className="d-flex justify-content-center">
        <Button color="" type="submit">Submit</Button>
      </div>
    </Form>
  );
};

