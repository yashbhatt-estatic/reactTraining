/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';
import Loader from '../../components/Loader';
import {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
  getEmployeeById,
} from '../../redux/Actions/userAction';
import './style.scss';

function AxiosUserCrud() {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [card, setCard] = useState(false);
  const [employee, setEmployee] = useState({});

  const { employees, employeeById } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      gender: 'male',
      department: 'MERN',
      city: '',
      state: '',
      country: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Only alphabets are allowed for this field ')
        .max(15, 'Must be 15 characters or less')
        .required('First name is Required'),
      lastName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Only alphabets are allowed for this field ')
        .max(20, 'Must be 20 characters or less')
        .required('Last name is Required'),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
      gender: Yup.string().required('Gender is Required'),
      department: Yup.string().required('Department is Required'),
    }),
    onSubmit: (values, event) => {
      if (!user.id) {
        event.preventDefault();
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/users`, values)
          .then((res) => {
            setUser(res.data.data);
            dispatch(addEmployee(res.data.data));
          })
          .then(() => {
            setTimeout(() => {
              handleClose();
              formik.resetForm();
            }, 3000);
          })
          .catch((err) => {
            alert(err.response.data.msg);
          });
      } else if (user.id) {
        event.preventDefault();
        axios
          .patch(`${process.env.REACT_APP_BASE_URL}/users/${user.id}`, values)
          .then((res) => {
            dispatch(editEmployee({ ...res.data.data }));
          })
          .then(() => {
            setTimeout(() => {
              handleClose();
              formik.resetForm();
            }, 3000);
          })
          .catch((err) => {
            alert(err.response.data.msg);
          });
      }
    },
  });

  const editDetails = (data) => {
    handleShow();
    formik.setFieldValue('firstName', data.firstName);
    formik.setFieldValue('lastName', data.lastName);
    formik.setFieldValue('email', data.email);
    formik.setFieldValue('department', data.department);
    formik.setFieldValue('gender', data.gender);
    formik.setFieldValue('city', data.city);
    formik.setFieldValue('state', data.state);
    formik.setFieldValue('country', data.country);
    setUser((prevState) => ({
      ...prevState,
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      department: data.department,
      gender: data.gender,
      city: data.city,
      state: data.state,
      country: data.country,
    }));
  };

  const deleteEmployeeUser = (id) => {
    setShowAlert(true);
    setUser({
      id,
    });
  };

  const handleShowAlert = (id) => deleteEmployeeUser(id);
  const handleCloseAlert = () => setShowAlert(false);

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/users/${user.id}`)
      .then((res) => {
        dispatch(deleteEmployee(res.data.data.result._id));
        setUser(res.data.data.result);
        handleCloseAlert();
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  const allUserData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users`)
      .then((res) => {
        dispatch(getEmployee(res.data.data));
        setUser(res.data.data);
        setCard(true);
        setEmployee(employees);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  useEffect(() => {
    allUserData();
  }, []);

  useEffect(() => {
    employeeById !== [] ? setEmployee(employeeById) : setEmployee(employees);
  }, [employees]);

  useEffect(() => {
    employeeById !== [] ? setEmployee(employeeById) : setEmployee(employees);
  }, [employeeById]);

  const addUser = () => {
    formik.resetForm();
    setUser({});
    handleShow();
  };

  const onUserChange = (event) => {
    if (event.target.value === 'all') {
      dispatch(getEmployeeById([]));
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/users/${event.target.value}`)
        .then((res) => {
          dispatch(getEmployeeById(res.data.data));
          setUser(res.data.data);
          setCard(true);
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    }

    employeeById !== [] ? setEmployee(employeeById) : setEmployee(employees);
  };
  return (
    <div className="userCrud">
      <header>
        <h1 className="text-center mt-3">CRUD opeartions for Employee Module</h1>
      </header>
      <div>
        <Container className="card d-flex flex-row mx-auto my-3 p-5">
          <Button className="mx-3" variant="primary" onClick={addUser}>
            Add User
          </Button>
          <Button className="mx-3" variant="primary" onClick={allUserData}>
            Show All Users
          </Button>
          <select
            className="mx-3 form-select form-select-md"
            id="id"
            name="id"
            onChange={onUserChange}
          >
            <option value="all" defaultValue>
              Select User
            </option>
            {employees.map((data) => (
              <option value={data._id}>{data.firstName}</option>
            ))}
          </select>
        </Container>
        <Modal show={showAlert} onHide={handleCloseAlert}>
          <Modal.Header closeButton>
            <Modal.Title>DELETE User</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAlert}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter User Details :- </Modal.Title>
          </Modal.Header>
          <form onSubmit={formik.handleSubmit} className="form">
            <Modal.Body>
              <Container className="bg-light border mx-auto p-1 text-dark">
                <Row>
                  <Col md="12" lg="3">
                    First Name :-
                    {' '}
                  </Col>
                  <Col md="12" lg="3">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="error">{formik.errors.firstName}</div>
                    ) : null}
                  </Col>
                  <Col md="12" lg="3">
                    Last Name :-
                    {' '}
                  </Col>
                  <Col md="12" lg="3">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="error">{formik.errors.lastName}</div>
                    ) : null}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md="12" lg="3">
                    Department :-
                  </Col>
                  <Col md="12" lg="3">
                    <select
                      className="form-select form-select-md"
                      value={formik.values.department}
                      id="department"
                      name="department"
                      onChange={formik.handleChange}
                    >
                      <option value="MEAN">MEAN</option>
                      <option value="MERN">MERN</option>
                      <option value="Full-Stack">Full-Stack</option>
                    </select>

                    {formik.touched.department && formik.errors.department ? (
                      <div className="error">{formik.errors.department}</div>
                    ) : null}
                  </Col>
                  <Col md="12" lg="3">
                    Gender :-
                    {' '}
                  </Col>
                  <Col md="12" lg="3">
                    <RadioGroup
                      defaultValue="male"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      name="gender"
                      id="gender"
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="error">{formik.errors.gender}</div>
                    ) : null}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md="12" lg="3">
                    Email :-
                    {' '}
                  </Col>
                  <Col md="12" lg="3">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </Col>
                  <Col md="12" lg="3">
                    City :-
                    {' '}
                  </Col>
                  <Col md="12" lg="3">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md="12" lg="3">
                    State :-
                  </Col>
                  <Col md="12" lg="3">
                    <input
                      id="state"
                      name="state"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.state}
                    />
                  </Col>
                  <Col md="12" lg="3">
                    Country :-
                  </Col>
                  <Col md="12" lg="3">
                    <Form.Select
                      type="select"
                      defaultValue="male"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="country"
                      name="country"
                    >
                      <option value=" ">Select Country</option>
                      <option value="MEAN">India</option>
                      <option value="MERN">US</option>
                      <option value="Full-Stack">Russia</option>
                    </Form.Select>
                  </Col>
                </Row>
                <br />
              </Container>
            </Modal.Body>
            <Modal.Footer>
              {user.id ? (
                <Button type="submit" variant="primary">
                  UPDATE
                </Button>
              ) : (
                <Button type="submit" variant="primary">
                  Save changes
                </Button>
              )}
              <Button type="reset" variant="secondary" onClick={formik.resetForm}>
                Reset
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        <div className="mt-5">
          {card
            ? employee
              && employee.map((data) => (
                <Card className="w-75 my-4 mx-auto card">
                  <Row>
                    <Col>
                      <Card.Body>
                        <Card.Title>User</Card.Title>
                        <ListGroup className="list-group-flush">
                          <ListGroupItem>
                            <Row>
                              <Col md="12" lg="3">
                                First Name :-
                                {' '}
                              </Col>
                              <Col md="12" lg="3">
                                {data.firstName}
                              </Col>
                              <Col md="12" lg="3">
                                Last Name :-
                              </Col>
                              <Col md="12" lg="3">
                                {data.lastName}
                              </Col>
                            </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Row>
                              <Col md="12" lg="3">
                                Email :-
                                {' '}
                              </Col>
                              <Col md="12" lg="3">
                                <span className="overflow w-50">
                                  <span>{data.email}</span>
                                </span>
                              </Col>
                              <Col md="12" lg="3">
                                Department :-
                              </Col>
                              <Col md="12" lg="3">
                                {data.department}
                              </Col>
                            </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Row>
                              <Col md="12" lg="3">
                                Gender :-
                                {' '}
                              </Col>
                              <Col md="12" lg="3">
                                {data.gender}
                              </Col>
                              <Col md="12" lg="3">
                                City :-
                              </Col>
                              <Col md="12" lg="3">
                                {data.city}
                              </Col>
                            </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Row>
                              <Col md="12" lg="3">
                                State :-
                                {' '}
                              </Col>
                              <Col md="12" lg="3">
                                {data.state}
                              </Col>
                              <Col md="12" lg="3">
                                Country :-
                              </Col>
                              <Col md="12" lg="3">
                                {data.country}
                              </Col>
                            </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Row>
                              <Col md="12" lg="6">
                                <Button type="button" onClick={() => editDetails(data)}>
                                  EDIT
                                </Button>
                              </Col>
                              <Col md="12" lg="6">
                                <Button type="button" onClick={() => handleShowAlert(data._id)}>
                                  DELETE
                                </Button>
                              </Col>
                            </Row>
                          </ListGroupItem>
                        </ListGroup>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Loader(AxiosUserCrud);
