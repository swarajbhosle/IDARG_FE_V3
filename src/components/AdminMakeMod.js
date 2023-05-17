import React, { useState } from 'react';
import { Input, Button, Container, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import { makeModerator } from '../services/email-service';
import {toast} from 'react-toastify'

export const MakeModForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    makeModerator(email).then((resp)=>{
        toast.success("Success !!");
        setEmail('');
        
    }).catch((err) => {
        console.log(err);
    })
    // try {
    //   const response = await axios.post('/api/submit-email', { email });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

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
            }}>Mod update</h1>
            <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Enter student email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className='d-flex justify-content-center'>
      <Button color='' type="submit" style={{
        marginTop: "1rem",
      }}>Make Placement Moderator</Button>
      </div>
      
    </form>
          </CardBody>
        </Card>
      </Container>
    </div>
    
  );
};

