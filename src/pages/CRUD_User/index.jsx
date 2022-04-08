/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import * as Yup from 'yup';
import {
  Button, Container, Stack, Table,
} from 'react-bootstrap';
import { useFormik } from 'formik';
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
  const [update, setUpdate] = useState(false);
  const [container, setContainer] = useState(false);
  const { employees } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      _id: '',
      firstName: '',
      department: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Only alphabets are allowed for this field ')
        .max(15, 'Must be 15 characters or less')
        .required('First name is Required'),
      department: Yup.string().required('Department is Required'),
    }),
    onSubmit: (values) => {
      if (!update) {
        const newEmployee = {
          _id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
          firstName: values.firstName,
          department: values.department,
        };
        dispatch(addEmployee(newEmployee));
        setUpdate(false);
        setContainer(true);
      } else {
        const updatedDetails = {
          _id: user._id,
          firstName: values.firstName,
          department: values.department,
        };

        dispatch(editEmployee(updatedDetails));
      }

      formik.resetForm();
    },
  });

  const clearData = () => {
    formik.resetForm();
    setContainer(false);
  };

  const editDetails = (data) => {
    formik.setFieldValue('firstName', data.firstName);
    formik.setFieldValue('department', data.department);
    setUser((prevState) => ({
      ...prevState,
      _id: data._id,
      firstName: data.firstName,
      department: data.department,
    }));
    setUpdate(true);
  };

  const deleteEmployeeUser = (id) => {
    formik.resetForm();
    if (window.confirm('Are you sure?')) {
      dispatch(deleteEmployee(id));
    }
  };

  useEffect(() => {
    dispatch(getEmployee([]));
  }, []);

  useEffect(() => {
    employees[0] === undefined ? setContainer(false) : setContainer(true);
  }, [employees]);

  return (
    <Container className="userCrud">
      <header>
        <h1 className="text-center mt-3">CRUD opeartions for Employee Module</h1>
      </header>
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <Container className="card mx-auto my-3 p-5">
            Employee Name :
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              type="text"
              placeholder="Employee Name"
              className="p-2"
              name="firstName"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error">{formik.errors.firstName}</div>
            ) : null}
            <br />
            Employee Department :
            <select
              onChange={formik.handleChange}
              value={formik.values.department}
              className="p-2"
              name="department"
            >
              <option value=" ">Select Department</option>
              <option value="Mean">Mean</option>
              <option value="Mern">Mern</option>
              <option value="Full-Stack">Full-Stack</option>
            </select>
            {formik.touched.department && formik.errors.department ? (
              <div className="error">{formik.errors.department}</div>
            ) : null}
            <br />
            <Container>
              <Stack gap={2} className="stack">
                {update ? (
                  <Button type="submit" variant="primary">
                    UPDATE
                  </Button>
                ) : (
                  <Button type="submit" variant="primary">
                    ADD
                  </Button>
                )}
                <Button type="button" variant="outline-secondary" onClick={clearData}>
                  CLEAR
                </Button>
              </Stack>
            </Container>
          </Container>
        </form>
        {container ? (
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
              {employees
          && employees.map((data, index) => (
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
          ))}
            </Table>
          </Container>
        ) : null}
      </Container>
    </Container>
  );
}

export default CrudUser;
