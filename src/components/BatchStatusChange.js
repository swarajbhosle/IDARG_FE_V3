import React, { useState,useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getAllJobOpenings } from '../services/job-opening-service';
import { batchUpdateApplications } from '../services/job-application-service';
import {toast} from 'react-toastify'

export const ModeratorBatchUpdateStatus = () => {
  const [file, setFile] = useState(null);
  const [jobOptions, setJobOptions] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [previousStatusOptions, setPreviousStatusOptions] = useState([
    { label: "Applied", value: "APPLIED" },
    { label: "Shortlisted", value: "SHORTLISTED" },
    { label: "Interviewing", value: "INTERVIEWING" },
    { label: "Selected", value: "SELECTED" },
    { label: "Rejected", value: "REJECTED" },
    
  ]);
  const [selectedPreviousStatus, setSelectedPreviousStatus] = useState(null);
  const [updatedStatusOptions, setUpdatedStatusOptions] = useState([
    { label: "Applied", value: "APPLIED" },
    { label: "Shortlisted", value: "SHORTLISTED" },
    { label: "Interviewing", value: "INTERVIEWING" },
    { label: "Selected", value: "SELECTED" },
    { label: "Rejected", value: "REJECTED" },
  ]);
  const [selectedUpdatedStatus, setSelectedUpdatedStatus] = useState(null);
  const [previousStatusDropdownOpen, setPreviousStatusDropdownOpen] = useState(false);
  const [updatedStatusDropdownOpen, setUpdatedStatusDropdownOpen] = useState(false);

  useEffect(() => {
    getAllJobOpenings().then((data)=>{
        const options = data.map((job) => ({
                  label: `${job.id}`,
                  value: job.id,
                }));
                setJobOptions(options);
    }).catch((err)=>{
        console.log(err);
    })
    // fetch("/api/jobs")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const options = data.map((job) => ({
    //       label: `Job ${job.id}`,
    //       value: job.id,
    //     }));
    //     setJobOptions(options);
    //   })
    //   .catch((error) => console.log(error));
  }, []);

  const togglePreviousStatusDropdown = () => setPreviousStatusDropdownOpen(!previousStatusDropdownOpen);
  const toggleUpdatedStatusDropdown = () => setUpdatedStatusDropdownOpen(!updatedStatusDropdownOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('excelFile', file);
      console.log(selectedPreviousStatus,selectedUpdatedStatus);

      try {
        const response = await batchUpdateApplications(formData,selectedJob,selectedPreviousStatus.value,selectedUpdatedStatus.value);
        console.log(response);
        toast.success("Updated Successfully");

    //     if (response.ok) {
    //       console.log('Excel file uploaded successfully');
    //     } else {
    //       console.error('Error uploading Excel file');
    //     }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('No file selected');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Form onSubmit={handleSubmit}>
        <h3>Note:</h3>
        <ul>
            <li>  Here you can batch update status of applicants</li>
            <li>Provide as input an excel file contaning email of students , job id for which you want to update, old status and updated status.</li>
            <li> All other applicants for that job opening would be automatically marked rejected.</li>
        </ul>
      
      <FormGroup>
        <Label for="excelFile">Select excel file</Label>
        <Input type="file" name="excelFile" id="excelFile" onChange={handleFileChange} />
        </FormGroup>
        <FormGroup>
      <Input type="select" name="job" id="job" value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
      <option value="">Select a job ID</option>
        {jobOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </Input>
      </FormGroup>
      <FormGroup>
      <Dropdown isOpen={previousStatusDropdownOpen} toggle={togglePreviousStatusDropdown}>
        <DropdownToggle caret>
          {selectedPreviousStatus ? selectedPreviousStatus.label : "Select Previous Status"}
        </DropdownToggle>
        <DropdownMenu>
          {previousStatusOptions.map((option) => (
            <DropdownItem key={option.value} onClick={() => setSelectedPreviousStatus(option)}>{option.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      </FormGroup>
      <FormGroup>
      <Dropdown isOpen={updatedStatusDropdownOpen} toggle={toggleUpdatedStatusDropdown}>
        <DropdownToggle caret>
          {selectedUpdatedStatus ? selectedUpdatedStatus.label : "Select Updated Status"}
        </DropdownToggle>
        <DropdownMenu>
          {updatedStatusOptions.map((option) => (
            <DropdownItem key={option.value} onClick={() => setSelectedUpdatedStatus(option)}>{option.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      </FormGroup>
      <Button type="submit">Submit</Button>
     
    </Form>
  );
};


