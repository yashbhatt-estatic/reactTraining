import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from '../../redux/Actions/userAction';
import './style.scss';
// import { startLoader, stopLoader } from '../../redux/Actions/commonAction';

function AxiosUserCrud() {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [card, setCard] = useState(true);

  const { employees } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clearData = () => {
    setUser({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      gender: '',
      city: '',
      state: '',
      country: '',
    });
  };

  const formik = useFormik({
    initialValues: {
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
      firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      gender: Yup.string().required('Required'),
      department: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      if (!user.id) {
        setUser(values);
        dispatch(addEmployee(values));
      } else if (user.id) {
        setUser(values);
        dispatch(editEmployee(values));
      }
      setTimeout(() => {
        handleClose();
        clearData();
        setCard(true);
      }, 3000);
    },
  });

  const editDetails = (data) => {
    setUser((prevState) => ({
      ...prevState,
      id: data.id,
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
    clearData();
    if (window.confirm('Are you sure?')) {
      dispatch(deleteEmployee(id));
    }
  };

  useEffect(() => {
    // dispatch(startLoader());
    dispatch(getEmployee());
    // setTimeout(() => {
    //   dispatch(stopLoader());
    // }, 3000);
  }, []);

  return (
    <div className="userCrud">
      <header>
        <h1 className="text-center mt-3">CRUD opeartions for Employee Module</h1>
      </header>
      <div>
        <div className="card w-25 mx-auto my-3 p-5">
          <Button className="mx-auto" variant="primary" onClick={handleShow}>
            Add User
          </Button>
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
                      <input
                        id="country"
                        name="country"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                      />
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
                <Button type="reset" onClick={formik.resetForm}>
                  Reset
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
        <div className="mt-5">
          {card
            ? employees
              && employees.map((data) => (
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
                                Password :-
                                {' '}
                              </Col>
                              <Col md="12" lg="3">
                                {data.password}
                              </Col>
                              <Col md="12" lg="3">
                                Gender :-
                              </Col>
                              <Col md="12" lg="3">
                                {data.gender}
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
                              <Col md="12" lg="6">
                                <button type="button" onClick={() => editDetails(data)}>
                                  EDIT
                                </button>
                              </Col>
                              <Col md="12" lg="6">
                                <button type="button" onClick={() => deleteEmployeeUser(data.id)}>
                                  DELETE
                                </button>
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

export default AxiosUserCrud;
