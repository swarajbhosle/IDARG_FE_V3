import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Container, CardSubtitle, Button } from 'reactstrap';
import { getMyPlacementStatus } from '../services/placement-status-service';
// import './styles/Placementstatus.css'

export const StudentPlacementStatus = ({ userEmail }) => {
  const [placementStatus, setPlacementStatus] = useState(null);

  useEffect(() => {
    // Fetch placement status data from backend using userEmail
    // Assume data is returned in the following format:
    // {
    //   isPlaced: boolean,
    //   company: string,
    //   jobProfile: string,
    // }
    const fetchData = async () => {
      const response = await getMyPlacementStatus(userEmail);
      setPlacementStatus(response);
    };
    fetchData();
  }, [userEmail]);

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center card-container">
        <Card className="card p-4 shadow" style={{
          overflow: "auto",
          width: "75vw",
          // height: "95vh",
          borderRadius: "2rem",
          boxShadow: "0 0 10px 0 rgba(1, 0, 0, 1);",
        }}>
          <CardBody>
            <h1 style={{
              color: "#7a92eb",
            }}>Placement Status</h1>
            <div>
              {placementStatus ? (
                <>
                <CardTitle>
                {placementStatus.isPlaced ? <h1 style={{
                  color: "green",
                }}>You are placed</h1> : <h1 style={{
                  color: "red",
                }}>Not Placed Yet</h1>}
                </CardTitle>
                  {placementStatus.isPlaced && (
                    <>
                      <p>Name: {placementStatus?.placedJobApplication?.user?.name != null ? placementStatus?.placedJobApplication?.user?.name  : "N/A"}</p>
                      <p>Roll No : {placementStatus?.placedJobApplication?.user?.rollNo != null ? placementStatus?.placedJobApplication?.user?.rollNo  : "N/A"}</p>

                      <p>Company: {placementStatus.placedJobApplication.jobOpening.company.companyName}</p>
                      <p>Job Profile: {placementStatus.placedJobApplication.jobOpening.jobProfile}</p>
                    </>
                  )}
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

