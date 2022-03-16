import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import React, { Component } from 'react';
import './assets/user.css';
import { LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      fetchUser: [],
      detailsLoaded: false,
    };
    this.getUser = this.getUser.bind(this);
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    setTimeout(this.getUser, 1000 * 2);
  }

  handler(id) {
    const { users } = this.state;

    const data = users.data
      .filter((item) => item.id === id)
      .map((user) => user);

    this.setState({
      fetchUser: data,
    });
  }

  getUser() {
    fetch('https://reqres.in/api/users?page=2')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          users: data,
          detailsLoaded: true,
        });
      });
  }

  render() {
    const { users, detailsLoaded, fetchUser } = this.state;
    const { width } = this.props;

    return (
      <>
        <Container className="bg-light border w-75">
          {detailsLoaded === false ? (
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                No Data Available
                <LinearProgress color="inherit" />
              </Col>
            </Row>
          ) : (
            users.data.map((Obj) => (
              <Row
                md="2"
                className="justify-content-md-center border p-2"
                key={Obj.id}
                id={Obj.id}
              >
                <Col xs lg="4">
                  {Obj.first_name}
                </Col>
                <Button
                  as={Col}
                  md="2"
                  variant="dark"
                  size="md"
                  onClick={() => this.handler(Obj.id)}
                >
                  Show
                </Button>
              </Row>
            ))
          )}
        </Container>
        {width < 480 ? null : (
          <>
          <hr className="my-4 border text-primary border-primary border-5" />
        {fetchUser.map((data) => {
          return (
            <Card className="mt-4 w-75 mx-auto p-3" key={data.id}>
              <Row className='p-4'>
                <Col lg='3' md='5' className='p-2'>
                  <Card.Img
                    variant="top"
                    src={data.avatar}
                    alt="pic"
                  />
                </Col>
                <Col lg='9' md='7'>
                  <Card.Body>
                    <Card.Title>User {data.id}</Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        <Row>
                          <Col md='12' lg='5'>First Name :- </Col>
                          <Col md='12' lg='7'>{data.first_name}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col md='12' lg='5'>Last Name :-</Col>
                          <Col md='12' lg='7'>{data.last_name}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                      <Row>
                      <Col md='12' lg='5'>Email :- </Col>
                      <Col md='12' lg='7'>{data.email}</Col>
                      </Row>
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
              );
            })}
          </>
        )}
      </>
    );
  }
}

User.propTypes = {
  width: PropTypes.number,
};

User.defaultProps = {
  width: window.innerWidth,
};

export default User;
