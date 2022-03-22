/* eslint-disable react/void-dom-elements-no-children */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Checkbox, FormControlLabel, Radio, RadioGroup, TextField,
} from '@mui/material';
import './style.scss';
import {
  Button, Card, Col, Container, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';

function SignupForm() {
  const [data, setData] = useState({});
  const [card, setCard] = useState(false);
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
    <Container className="bg-light border mx-auto w-50 p-5 text-dark">
      <form onSubmit={formik.handleSubmit} className="form">
        <Row>
          <Col md="12" lg="3">
            First Name :-
            {' '}
          </Col>
          <Col md="12" lg="3">
            <TextField
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </Col>
          <Col md="12" lg="3">
            Last Name :-
            {' '}
          </Col>
          <Col md="12" lg="3">
            <TextField
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
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
            <TextField
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </Col>
          <Col md="12" lg="3">
            Confirm Password :-
            {' '}
          </Col>
          <Col md="12" lg="3">
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
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
            <TextField
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
              <div>{formik.errors.gender}</div>
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
            {formik.touched.terms && formik.errors.terms ? <div>{formik.errors.terms}</div> : null}
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
              <div>{formik.errors.department}</div>
            ) : null}
          </Col>
        </Row>
        <br />
        <Container className="col-6 gap-2">
          <Button className="mx-2" type="submit">
            Submit
          </Button>
          <Button className="mx-2" type="reset" onClick={formik.resetForm}>
            Reset
          </Button>
        </Container>
      </form>
      {card ? (
        <Card className="w-75 my-3 mx-auto card">
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
                        {data.email}
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
