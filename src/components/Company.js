import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupText,
  Table
} from "reactstrap";
import "./styles/CompanyList.css";
import { toast } from 'react-toastify'
import { getAllCompanies, addCompanyToDb, deleteCompanyToDb, editCompanyToDb } from "../services/company-service";
export const CompanyList = () => {
  const [companiesLoaded, setCompaniesLoaded] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [nextCompanyId, setNextCompanyId] = useState(1);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [editingCompanyName, setEditingCompanyName] = useState("");

  //   useEffect(()=>{
  //     getAllCompanies().then((data)=>{
  //         let nc = []
  //         data.forEach((company)=>{
  //             nc.push({
  //                 id: company.id,
  //                 name: company.companyName
  //             })
  //         })
  //         setCompanies(nc);
  //     }).catch((err)=>{
  //         console.log(err);
  //     })
  //   },);

  const loadCompaniesFromDb = async () => {
    getAllCompanies()
      .then((data) => {
        let nc = [];
        data.forEach((company) => {
          nc.push({
            id: company.id,
            name: company.companyName,
          });
        });
        setCompanies(nc);

      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (companiesLoaded === false) {
    loadCompaniesFromDb();
    setCompaniesLoaded(true);
  }


  const addCompany = (e) => {
    e.preventDefault();
    if (!newCompanyName.trim()) return;

    addCompanyToDb({ companyName: newCompanyName }).then((data) => {
      const newCompany = {
        id: data.id,
        name: data.companyName,
      };
      setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
      setNewCompanyName("");
    }).catch((error) => {
      console.log(error);
    })

  };

  const startEditingCompany = (id, name) => {
    setEditingCompanyId(id);
    setEditingCompanyName(name);
  };

  const cancelEditingCompany = () => {
    setEditingCompanyId(null);
    setEditingCompanyName("");
  };

  const saveEditingCompany = (id) => {
    editCompanyToDb({ id: id, companyName: editingCompanyName }).then((data) => {
      setEditingCompanyId(null);
      setEditingCompanyName("");
      loadCompaniesFromDb();
    }).catch((error) => {
      console.log(error);
    })

    // setCompanies((prevCompanies) => {
    //   const updatedCompanies = prevCompanies.map((company) => {
    //     if (company.id === id) {
    //       company.name = editingCompanyName.trim()
    //         ? editingCompanyName
    //         : company.name;
    //     }
    //     return company;
    //   });
    //   return updatedCompanies;
    // });
    // setEditingCompanyId(null);
    // setEditingCompanyName("");
  };

  const deleteCompany = (id) => {
    // setCompanies((prevCompanies) => {
    //   const updatedCompanies = prevCompanies.filter(
    //     (company) => company.id !== id
    //   );
    //   return updatedCompanies;
    // });
    deleteCompanyToDb(id).then(() => {
      toast.success("Company deleted successfully");
      loadCompaniesFromDb();
    }).catch((err) => {
      console.log(err);
    })
  };

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
          }}>Companies</h1>
          <InputGroup className="mb-3">
            <Input
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Enter company name"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
            />
            <InputGroupText addonType="append" style={{
              backgroundColor: "white",
              border: "none"
            }}>
              <Button color="" className="ml-2" onClick={addCompany}>
                Add Company
              </Button>
            </InputGroupText>
          </InputGroup>
          <h4>Company List</h4>
          <Table responsive striped hover className="table-fixed">
            <thead>
              <tr>
                <th className="col-1">Company ID</th>
                <th className="col-2">Company Name</th>
                <th className="col-1">Edit</th>
                <th className="col-1">Delete</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td >
                    {editingCompanyId === company.id ? (
                      <Form onSubmit={() => saveEditingCompany(company.id)}>
                        <FormGroup>
                          <Label for={`companyName_${company.id}`}>Name:</Label>
                          <Input
                            type="text"
                            name={`companyName_${company.id}`}
                            id={`companyName_${company.id}`}
                            value={editingCompanyName}
                            onChange={(e) =>
                              setEditingCompanyName(e.target.value)
                            }
                          />
                        </FormGroup>
                        <div>
                          <Button
                            color=""
                            onClick={cancelEditingCompany}
                          >
                            Cancel
                          </Button>
                          <Button
                            color=""
                            onClick={() => saveEditingCompany(company.id)}
                            style={{
                              marginLeft: "10px",
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      </Form>
                    ) : (
                      company.name
                    )}

                  </td>
                  <td>
                    <Button
                      color="white"
                      onClick={() =>
                        startEditingCompany(company.id, company.name)
                      }
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="white"
                      onClick={() => deleteCompany(company.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>

      </Card>
    </Container>
  );
};
