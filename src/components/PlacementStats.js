import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { FormGroup, Label, Input, Button, Container, Table, Card, CardBody } from 'reactstrap';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { getCompanyStats } from '../services/company-service';
import { getAllPlacementStatus } from '../services/placement-status-service';
import { getAllJobOpenings, deleteJobOpening, searchJobOpening } from '../services/job-opening-service';


export const StudentPlacementTable = () => {

  const [data, setData] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCompanyStats();
        setData(response);
        console.log(response);
        // setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchData1 = async () => {
      const response = await getAllPlacementStatus();
      setStudents(response);
    };

    fetchData();
    fetchData1();
  }, []);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          type: 'category',
        },
      ],
    },
  };

  const [domain, setDomain] = useState('');
  const [response, setResponse] = useState([]);

  const handleDropdownChange = (event) => {
    setDomain(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = domain
    console.log(domain)

    searchJobOpening(domain).then((allJobOpeningDto) => {
      console.log("query result is ", allJobOpeningDto)
      // console.log()
      const njo = []
      allJobOpeningDto.foreach((jobOpeningDto) => {
        njo.push({ 
          jobId: jobOpeningDto?.id,
          jobDescription: jobOpeningDto?.jobDescription,
          postedBy: jobOpeningDto?.user?.email,
          cgpaCutoff: jobOpeningDto?.cgpaCutoff,
          companyName: jobOpeningDto?.company?.companyName,
        })
      })
      console.log(njo)
      setResponse(njo)
    })
  };


  return (
    <>
      <div>
        <Container className="d-flex justify-content-center align-items-center card-container">
          <Card className="card p-4 shadow" style={{
            overflow: "auto",
            width: "75vw",
            height: "95vh",
            borderRadius: "2rem",
            boxShadow: "0 0 10px 0 rgba(1, 0, 0, 1);",
            marginTop: "1rem"
          }}>
            <CardBody>
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Domain:
                      <select name="domain" value={domain} onChange={handleDropdownChange}>
                        <option value="">Select Domain</option>
                        <option value="sde">sde</option>
                        <option value="Doctor">Doctor</option>
                        <option value="CA">CA</option>
                      </select>
                    </label>
                  </div>
                  <button type="submit">Search Query</button>
                </form>

                <div>
                  <h3>Response:</h3>
                  <ul>
                    {response.map((jobOpening) => (
                      <li key={jobOpening.jobId}>{jobOpening.jobDescription}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};







