import React, { useState } from 'react';
import { Table, Input, Button } from 'reactstrap';
import { saveInterviewPlan } from '../services/interview-service';
import {toast} from 'react-toastify'

export const InterviewTable = ({ interviews,jobId }) => {
  const [editedInterviews, setEditedInterviews] = useState([]);
  if(editedInterviews.length == 0){
    setEditedInterviews(interviews);
  }
 

  const handleStartChange = (index, e) => {
    const newInterviews = [...editedInterviews];
    newInterviews[index].start = e.target.value;
    setEditedInterviews(newInterviews);
  };

  const handleEndChange = (index, e) => {
    const newInterviews = [...editedInterviews];
    newInterviews[index].end = e.target.value;
    setEditedInterviews(newInterviews);
  };

  const handleSave = () => {
    console.log('Edited interviews:', editedInterviews);
    let dto = {
        "scheduleList":editedInterviews
    }

    saveInterviewPlan(jobId,dto).then((data)=>{
        toast.success("Saved Successfully");
        console.log("success");
    }).catch((err)=>{
        console.log(err);
    })
    
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Student Email</th>
            <th>Interviewer ID</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview, index) => (
            <tr key={index}>
              <td>{interview.studentEmail}</td>
              <td>{interview.interviewerId}</td>
              <td>
                <Input
                  type="datetime-local"
                  value={editedInterviews[index]?.start ?? interview.start}
                  onChange={(e) => handleStartChange(index, e)}
                />
              </td>
              <td>
                <Input
                  type="datetime-local"
                  value={editedInterviews[index]?.end ?? interview.end}
                  onChange={(e) => handleEndChange(index, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button color="primary" onClick={handleSave}>
        Save
      </Button>
    </>
  );
};

