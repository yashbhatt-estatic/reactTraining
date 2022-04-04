/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import {
  Button, Container, Stack, Table,
} from 'react-bootstrap';
import {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from '../../redux/Actions/userAction';

function CrudUser() {
  const [user, setUser] = useState({
    _id: 0,
    firstName: '',
    department: '',
  });
  const { employees } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const clearData = () => {
    setUser({
      _id: 0,
      firstName: '',
      department: '',
    });
  };

  const submitData = () => {
    if (user.firstName && user.department && !user._id) {
      const newEmployee = {
        _id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        firstName: user.firstName,
        department: user.department,
      };
      dispatch(addEmployee(newEmployee));
    } else {
      const updatedDetails = {
        _id: user._id,
        firstName: user.firstName,
        department: user.department,
      };

      dispatch(editEmployee(updatedDetails));
    }

    clearData();
  };

  const editDetails = (data) => {
    setUser((prevState) => ({
      ...prevState,
      _id: data._id,
      firstName: data.firstName,
      department: data.department,
    }));
  };

  const deleteEmployeeUser = (id) => {
    clearData();
    if (window.confirm('Are you sure?')) {
      dispatch(deleteEmployee(id));
    }
  };

  const handleNameChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      firstName: e.target.value,
    }));
  };

  const handleDepartmentChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      department: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(getEmployee([]));
  }, []);

  return (
    <Container className="userCrud">
      <header>
        <h1 className="text-center mt-3">CRUD opeartions for Employee Module</h1>
      </header>
      <Container>
        <Container className="card mx-auto my-3 p-5">
          Employee Name :
          <input
            onChange={handleNameChange}
            value={user.firstName}
            type="text"
            placeholder="Employee Name"
            className="p-2"
          />
          <br />
          Employee Department :
          <input
            onChange={handleDepartmentChange}
            value={user.department}
            type="text"
            placeholder="Employee Department"
            className="p-2"
          />
          <br />
          <Container>
            <Stack gap={2} className="stack">
              {user._id ? (
                <Button type="button" variant="primary" onClick={submitData}>
                  UPDATE
                </Button>
              ) : (
                <Button type="button" variant="primary" onClick={submitData}>
                  ADD
                </Button>
              )}
              <Button type="button" variant="outline-secondary" onClick={clearData}>
                CLEAR
              </Button>
            </Stack>
          </Container>
        </Container>

        {employees
          && employees.map((data, index) => (
            <Container className="mt-5">
              <Table striped bordered hover size="lg" responsive="md">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Depatment Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{data.firstName}</td>
                    <td>{data.department}</td>
                    <td>
                      <Button type="button" onClick={() => editDetails(data)}>
                        EDIT
                      </Button>
                    </td>
                    <td>
                      <Button type="button" onClick={() => deleteEmployeeUser(data._id)}>
                        DELETE
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Container>
          ))}
      </Container>
    </Container>
  );
}

export default CrudUser;
