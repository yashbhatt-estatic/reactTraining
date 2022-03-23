import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Checkbox, FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import './style.scss';
import {
  Button, Card, Col, Container, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function SignupForm() {
  const [data, setData] = useState({});
  const [card, setCard] = useState(false);
  const [showPass, setShowPass] = useState();

  const password = () => {
    setShowPass(!showPass);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'male',
      department: 'MEAN',
      terms: true,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      email: Yup.string().email('Invalid email address').required('Required'),
      gender: Yup.string().required('Required'),
      terms: Yup.boolean().oneOf([true], 'You should accept terms & condition'),
      department: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      setData(values);
      setCard(true);
    },
  });
  return (
    <Container className="bg-light border mx-auto w-50 p-4 text-dark">
      <form onSubmit={formik.handleSubmit} className="form">
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
            Password :-
            {' '}
          </Col>
          <Col md="12" lg="3">
            <div className="form-control d-inline-flex p-1">
              <input
                id="password"
                name="password"
                type={showPass ? 'text' : 'password'}
                className="border-0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button type="button" id="btn" onClick={password}>{showPass ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}</button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </Col>
          <Col md="12" lg="3">
            Confirm Password :-
            {' '}
          </Col>
          <Col md="12" lg="3">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error">{formik.errors.confirmPassword}</div>
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
            {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
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
          <Col md="12" lg="6">
            <Checkbox
              defaultChecked
              name="terms"
              id="terms"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            Accept terms & Condition
            {formik.touched.terms && formik.errors.terms ? <div className="error">{formik.errors.terms}</div> : null}
          </Col>
          <Col md="12" lg="3">
            Department :-
            {' '}
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
        </Row>
        <br />
        <Container className="col-6 text-center">
          <Button className="me-md-2" type="submit">
            Submit
          </Button>
          <Button type="reset" onClick={formik.resetForm}>
            Reset
          </Button>
        </Container>
      </form>
      {card ? (
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
                </ListGroup>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ) : null}
    </Container>
  );
}

export default SignupForm;
