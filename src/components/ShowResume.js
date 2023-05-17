import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, Table, List } from 'reactstrap';
import { getCurrentUserDetail } from '../auth';

export const ResumeDisplay = () => {
  // const stringsss = ["help", "me", "please"];
  return (
    // isLoading ? (<h1>....Loading</h1>) :
      <Container>

        {/* <Row>
          <Col sm="12" md={{ size: 12, offset: 0 }}> */}
        <Card>
          <CardHeader>
            {/* <div class="d-flex justify-content-around align-items-center">
              <h2>{resume?.name}</h2>
              <h5>+91 {resume?.phoneNumber}</h5>
              <h5>{getCurrentUserDetail().email}</h5>
            </div> */}
          </CardHeader>
          <CardBody>
            <Table className='table-fixed'>
              {/* <thead>
                    <tr>
                      <th className='col-2'></th>
                      <th></th>
                    </tr>
                  </thead> */}
              <tbody>
                <h2 style={{ "marginTop": "2rem" }}>Personal</h2>
                <tr>
                  <td className='col-3'>Name:</td>
                  <td>Harsh Meena</td>
                </tr>

                <tr>
                  <td className='col-3'>Email:</td>
                  <td>harshmeena908@gmail.com</td>
                </tr>

                <tr>
                  <td className='col-3'>Phone:</td>
                  <td>9330319099</td>
                </tr>

                <tr>
                  <td className='col-3'>Gender:</td>
                  <td>Male</td>
                </tr>

                <tr>
                  <td>Address:</td>
                  <td>.</td>
                </tr>

                <h2 style={{ "marginTop": "2rem" }}>Education</h2>

                <tr>
                  <td>College Name:</td>
                  <td>IIIT Allahabad</td>
                </tr>

                <tr>
                  <td>Degree :</td>
                  <td>B.Tech in Information Technology</td>
                </tr>

                <tr>
                  <td className='col-3'>CGPA:</td>
                  <td>8.76</td>
                </tr>

                <h2 style={{ "marginTop": "2rem" }}>Skills</h2>
                <tr>
                  <td>Skills:</td>
                  <td>Information Technology, Javascript, Machine Learning, Servers</td>
                </tr>

                <h2 style={{ "marginTop": "2rem" }}>Work Experience</h2>

                <tr>
                  <td>Work Experience:</td>
                  <td>NA</td>
                </tr>
                <tr>
                  <td>Socials:</td>
                  <td>NA</td>
                </tr>
                {/* <tr>
                  <td>Education:</td>
                  <td>{resume?.education?.join(',\n')}</td>
                </tr> */}

                <h2 style={{ "marginTop": "2rem" }}>Projects</h2>
                <tr>
                  <td>Projects:</td>
                  <td>NA</td>
                </tr>
                <h2 style={{ "marginTop": "2rem" }}>Achievements</h2>
                <tr>
                  <td>Achievements:</td>
                  <td>NA</td>
                </tr>
                <h2 style={{ "marginTop": "2rem" }}>Internships</h2>
                <h2 style={{ "marginTop": "2rem" }}>Coding Profiles</h2>
              </tbody>

            </Table>
          </CardBody>
        </Card>
        {/* </Col>
        </Row> */}
      </Container>

  );
};


