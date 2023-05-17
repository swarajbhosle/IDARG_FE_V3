import { Table } from 'reactstrap';

export const ScheduledInterviews = ({ interviews }) => {
  return (
    <Table>
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>Job ID</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Interviewer ID</th>

        </tr>
      </thead>
      <tbody>
        {interviews.map((interview) => (
          <tr key={interview.id}>
            {/* <td>{interview.id}</td> */}
            <td>{interview.jobId}</td>
            <td>{interview.date}</td>
            <td>{new Date(interview.start).toLocaleTimeString()}</td>
            <td>{new Date(interview.end).toLocaleTimeString()}</td>
            <td>{interview.interviewerId}</td>
            
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

