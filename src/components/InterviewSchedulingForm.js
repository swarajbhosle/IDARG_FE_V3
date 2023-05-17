import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Table,
    Toast,
    ToastBody,
    ToastHeader,
} from "reactstrap";
import { getAllApplicationsForJobOpening, searchJobApplication, updateJobApplication } from '../services/job-application-service';
import { getAllJobOpenings } from '../services/job-opening-service';
import { getInterviewPlan } from "../services/interview-service";
import { InterviewTable } from "./ShowInterviewSchedules";


const InterviewPlanner = () => {
    const [selectedJobId, setSelectedJobId] = useState('');
    const [jobApplications, setJobApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [status, setStatus] = useState('');
    const [jobOpenings, setJobOpenings] = useState([]);
    const [plans, setPlans] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [interviews,setInterviews] = useState(null);

    const [currentPlan, setCurrentPlan] = useState({
        date: "",
        startTime: "",
        endTime: "",
        numInterviewers: "",
        duration: "",
    });


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



    const handleInputChange = (event) => {
        let { name, value } = event.target;
      
        // convert start and end time inputs to 24 hrs format
        if (name === "startTime" || name === "endTime") {
          let [hours, minutes] = value.split(":");
          hours = Number(hours);
          const suffix = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;
          value = `${hours}:${minutes} ${suffix}`;
        }
      
        setCurrentPlan({ ...currentPlan, [name]: value });
        console.log(currentPlan)
      };

    const handleAddPlan = () => {
        if (
            currentPlan.date === "" ||
            currentPlan.startTime === "" ||
            currentPlan.endTime === "" ||
            currentPlan.numInterviewers === "" ||
            currentPlan.duration === ""
        ) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return;
        }

        setPlans([...plans, currentPlan]);
        setCurrentPlan({
            date: "",
            startTime: "",
            endTime: "",
            numInterviewers: "",
            duration: "",
        });
    };

    function convertDateTime(dateTimeStr) {
        const dateTimeArr = dateTimeStr.split(' ');
        const date = dateTimeArr[0];
        const time = dateTimeArr[1] + ' ' + dateTimeArr[2];
        const [year, month, day] = date.split('-');
        const [hour, minute] = time.split(/:| /);
        let newHour = hour;
        if (time.includes('PM') && hour !== '12') {
          newHour = String(Number(hour) + 12);
        } else if (time.includes('AM') && hour === '12') {
          newHour = '00';
        }
        let arr = ['0','1','2','3','4','5','6','7','8','9'];
        for(let i=0;i<arr.length;i++){
            if(newHour === arr[i]){
                newHour = '0'+newHour;
                break;
            }
        }
        const newTime = newHour + ':' + minute + ':00.000';
        const isoDateTime = `${year}-${month}-${day}T${newTime}`;
        return isoDateTime;
      }
      


    const handleRemovePlan = (index) => {
        const updatedPlans = [...plans];
        updatedPlans.splice(index, 1);
        setPlans(updatedPlans);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (plans.length === 0) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return;
        }
        console.log("hi");
        let interviewPlanDto = []
        for(let i=0;i<plans.length;i++) {
            let o = plans[i];
            let st = convertDateTime(o.date+' '+o.startTime)
            let en = convertDateTime(o.date+' '+o.endTime)
            console.log(o);
            let cur = {
                "date":o.date,
                "interval":{
                    "start":st,
                    "end":en
                },
                "numberOfInterviewers":parseInt(o.numInterviewers),
                "interviewDuration":parseInt(o.duration)
            }
            console.log(cur)
            interviewPlanDto.push(cur)
        }
        let fin = {
            "interviewPlanList":interviewPlanDto
        }
        console.log(interviewPlanDto);
        getInterviewPlan(selectedJobId,fin).then((data)=>{
            console.log(data);
            setInterviews(data);
        }).catch((err)=>{
            console.log(err);
        })

        setShowToast(false);
    };


    return (
        <Container>
            <h1 style={{
                color: "#7a92eb",
            }}>Interview Planner</h1>

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

            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th># Interviewers</th>
                                    <th>Duration</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans.map((plan, index) => (
                                    <tr key={index}>
                                        <th scope="row">Plan {index + 1}</th>
                                        <td>{plan.date}</td>
                                        <td>{plan.startTime}</td>
                                        <td>{plan.endTime}</td>
                                        <td>{plan.numInterviewers}</td>
                                        <td>{plan.duration}</td>
                                        <td>
                                            <Button color="danger" onClick={() => handleRemovePlan(index)}>
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <th scope="row">{plans.length + 1}</th>
                                    <td>
                                        <Input
                                            type="date"
                                            name="date"
                                            id="date"
                                            value={currentPlan.date}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            type="time"
                                            name="startTime"
                                            id="startTime"
                                            value={currentPlan.startTime}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            type="time"
                                            name="endTime"
                                            id="endTime"
                                            value={currentPlan.endTime}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            type="number"
                                            name="numInterviewers"
                                            id="numInterviewers"
                                            placeholder="Number of Interviewers"
                                            value={currentPlan.numInterviewers}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            type="number"
                                            name="duration"
                                            id="duration"
                                            placeholder="Duration (in minutes)"
                                            value={currentPlan.duration}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Button color="success" onClick={handleAddPlan}>
                                            Add Plan
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <FormGroup>
                            <Button color="primary" type="submit">
                                Submit
                            </Button>
                        </FormGroup>
                    </Form>
                    <Toast isOpen={showToast}>
                        <ToastHeader>
                            Error
                        </ToastHeader>
                        <ToastBody>
                            Please fill in all fields for each interview plan.
                        </ToastBody>
                    </Toast>
                </Col>
            </Row>
            {interviews == null?<></>:
            <InterviewTable interviews = {interviews} jobId = {selectedJobId}></InterviewTable>
            }
        </Container>
    );

}

export default InterviewPlanner;