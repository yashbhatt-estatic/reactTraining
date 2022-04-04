/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style.scss';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
  Stack,
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
      department: '',
      terms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Only alphabets are allowed for this field ')
        .max(15, 'Must be 15 characters or less')
        .required('First name isRequired'),
      lastName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Only alphabets are allowed for this field ')
        .max(20, 'Must be 20 characters or less')
        .required('Last name is Required'),
      password: Yup.string().required('Password is Required'),
      confirmPassword: Yup.string()
        .required('Password is Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
      gender: Yup.string().required('Gender is Required'),
      terms: Yup.boolean().oneOf([true], 'You should accept terms & condition'),
      department: Yup.string().required('Department is Required'),
    }),
    onSubmit: (values) => {
      setData(values);
      setCard(true);
    },
  });

  const resetForm = () => {
    formik.resetForm();
    setCard(false);
  };

  return (
    <Container className="bg-light border mx-auto w-50 p-4 text-dark text-start">
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" lg="4" sm="12">
            <Form.Label>First name</Form.Label>
            <Form.Control
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              isInvalid={!!formik.errors.firstName}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" lg="4" sm="12">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              isInvalid={!!formik.errors.lastName}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" lg="4" sm="12">
            <Form.Label>Email</Form.Label>
            <Form.Control
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isInvalid={!!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} sm="12" md="6" lg="6">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                id="password"
                name="password"
                type={showPass ? 'text' : 'password'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={!!formik.errors.password}
              />
              <InputGroup.Text>
                <span onClick={password} role="button">
                  {showPass ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </span>
              </InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm="12" md="6" lg="6">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              isInvalid={!!formik.errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" sm="12" lg="6">
            <Form.Label>Gender</Form.Label>
            <Form.Check
              defaultChecked
              value={formik.values.gender}
              type="radio"
              label="Male"
              onChange={formik.handleChange}
              name="gender"
              isInvalid={!!formik.errors.gender}
            />
            <Form.Check
              value={formik.values.gender}
              type="radio"
              label="Female"
              onChange={formik.handleChange}
              name="gender"
              isInvalid={!!formik.errors.gender}
            />
            <Form.Check
              value={formik.values.gender}
              type="radio"
              label="Other"
              onChange={formik.handleChange}
              name="gender"
              isInvalid={!!formik.errors.gender}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.gender}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" sm="12" lg="6">
            <Form.Label>Department</Form.Label>
            <Form.Select
              type="select"
              defaultValue="male"
              value={formik.values.department}
              onChange={formik.handleChange}
              id="department"
              name="department"
              isInvalid={!!formik.errors.department}
            >
              <option value=" ">Select Department</option>
              <option value="MEAN">Mean</option>
              <option value="MERN">Mern</option>
              <option value="Full-Stack">Full-Stack</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{formik.errors.department}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" md="6" sm="12" lg="6">
          <Form.Check
            inline
            required
            type="checkbox"
            name="terms"
            value={formik.values.terms}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.terms}
          />
          <Form.Label>Agree to terms and conditions</Form.Label>
        </Form.Group>
        <Form.Control.Feedback type="invalid">{formik.errors.terms}</Form.Control.Feedback>
        <Stack gap={2} className="stack">
          <Button className="mx-auto" variant="primary" type="submit">
            Submit
          </Button>
          <Button className="mx-auto" variant="outline-secondary" type="reset" onClick={resetForm}>
            Reset
          </Button>
        </Stack>
      </Form>
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
