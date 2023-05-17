import React, { useState } from "react";
import {
  Collapse,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormFeedback,
  Container,
  Card,
  CardBody
} from "reactstrap";
import { getAllCompanies } from "../services/company-service";
import { createJobOpening } from "../services/job-opening-service";
import { getCurrentUserDetail } from "../auth";
import './styles/JobOpeningForm.css'
import { toast } from "react-toastify";

export const JobOpeningForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loadedCompanies, setLoadedCompanies] = useState(false);

  const [jobDetails, setJobDetails] = useState({
    jobId: "",
    jobDescription: "",
    jobProfile: "",
    // postedBy: "",
    cgpaCutoff: "",
    companyName: "",
    companyId: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const handleSelectCompany = (company) => {
    setJobDetails({
      ...jobDetails,
      companyName: company.companyName,
      companyId: company.id,
    });
    setSelectedCompany(company.companyName);
  };
  const handleSubmit = (event) => {

    if (error.isError) {
      toast.error("Form data is invalid");
      setError({ ...error, isError: false });
      return;
    }
    event.preventDefault();
    let jobOpeningDto = {
      company: {
        id: jobDetails.companyId,
        companyName: jobDetails.companyName
      },
      cgpaCutoff: jobDetails.cgpaCutoff,
      jobDescription: jobDetails.jobDescription,
      jobProfile: jobDetails.jobProfile,
      user: getCurrentUserDetail()
    }
    createJobOpening(jobOpeningDto).then((data) => {
      toast.success("Job Opening Posted successfully");
      console.log(data);
      // Clear form fields
      setJobDetails({
        jobId: "",
        jobDescription: "",
        // postedBy: "",
        cgpaCutoff: "",
        companyName: "",
        companyId: "",
        jobProfile: "",
      });
      setSelectedCompany("");
      setIsOpen(false);
    }).catch((error) => {
      console.log(error);
      toast.error("Invalid Form data !!");
      setError({
        errors: error,
        isError: true,
      });
      setSelectedCompany("");
      setIsOpen(false);
    })


  };

  const loadCompaniesFromDb = () => {
    getAllCompanies()
      .then((data) => {
        console.log(data);
        let oc = companies;
        data.forEach((company) => {
          oc.push({
            id: company.id,
            companyName: company.companyName,
          });
        });
        setCompanies(oc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!loadedCompanies) {
    loadCompaniesFromDb();
    setLoadedCompanies(true);
  }

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
          }}>Post a job</h1>
          {/* <Button color="" onClick={toggle} style={{ marginBottom: "1rem", width: "100%" }}>
            Add Job Opening
          </Button>
          <Collapse isOpen={isOpen}> */}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="jobProfile">Job Profile</Label>
              <Input
                type="text"
                name="jobProfile"
                id="jobProfile"
                value={jobDetails.jobProfile}
                onChange={(event) =>
                  setJobDetails({ ...jobDetails, jobProfile: event.target.value })
                }
                invalid={
                  error.errors?.response?.data?.jobProfile ? true : false
                }
              />
              <FormFeedback>
                {error.errors?.response?.data?.jobProfile}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="jobDescription">Job Description</Label>
              <Input
                type="textarea"
                name="jobDescription"
                id="jobDescription"
                value={jobDetails.jobDescription}
                onChange={(event) =>
                  setJobDetails({
                    ...jobDetails,
                    jobDescription: event.target.value,
                  })
                }
                invalid={
                  error.errors?.response?.data?.jobDescription ? true : false
                }
                style={{ height: "200px" }}
              />
              <FormFeedback>
                {error.errors?.response?.data?.jobDescription}
              </FormFeedback>
            </FormGroup>
            {/* <FormGroup>
            <Label for="postedBy">Posted By</Label>
            <Input
              type="text"
              name="postedBy"
              id="postedBy"
              value={jobDetails.postedBy}
              onChange={(event) =>
                setJobDetails({ ...jobDetails, postedBy: event.target.value })
              }
            />
          </FormGroup> */}
            <FormGroup>
              <Label for="cgpaCutoff">CGPA Cutoff</Label>
              <Input
                type="text"
                name="cgpaCutoff"
                id="cgpaCutoff"
                value={jobDetails.cgpaCutoff}
                onChange={(event) =>
                  setJobDetails({ ...jobDetails, cgpaCutoff: event.target.value })
                }
                invalid={
                  error.errors?.response?.data?.cgpaCutoff ? true : false
                }
              />
              <FormFeedback>
                {error.errors?.response?.data?.jobDescription}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="companyName">Company Name</Label>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} >
                <DropdownToggle caret color="">
                  {selectedCompany ? selectedCompany : "Select Company"}
                </DropdownToggle>
                <DropdownMenu>
                  {companies.map((company) => (
                    <DropdownItem
                      key={company.id}
                      onClick={() => handleSelectCompany(company)}
                    >
                      {company.companyName}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
            <div className="d-flex justify-content-center">
              <Button color="" type="submit" className="mt-3 btn-lg">
                Submit
              </Button>
            </div>

          </Form>
          {/* </Collapse> */}
        </CardBody>

      </Card>
    </Container>
  );
};
