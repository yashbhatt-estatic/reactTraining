/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import {
  Button, Card, Col, Container, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import './assets/user.css';
import Loader from '../../components/Loader';

function User() {
  const [users, setUsers] = useState([]);
  const [fetchUser, setFetchUser] = useState([]);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  function getUser() {
    fetch('https://reqres.in/api/users?page=2')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setDetailsLoaded(true);
      });
  }

  function updateDimensions() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    getUser();
    window.addEventListener('resize', updateDimensions());
    return (window.removeEventListener('resize', updateDimensions()));
  });

  function handler(id) {
    const data = users.data.filter((item) => item.id === id).map((user) => user);
    setFetchUser(data);
  }

  return (
    <>
      <Container className="border mx-auto w-50 my-5">
        {detailsLoaded && (
          users.data.map((Obj) => (
            <Row md="2" className="justify-content-md-center border p-2" key={Obj.id} id={Obj.id}>
              <Col xs lg="4">
                {Obj.first_name}
              </Col>
              <Button
                as={Col}
                md="2"
                variant="dark"
                size="md"
                onClick={() => handler(Obj.id)}
              >
                Show
              </Button>
            </Row>
          ))
        )}
      </Container>
      {width < 480 ? null : (
        <>
          <hr className="my-5 border text-primary border-primary border-5" />
          {fetchUser.map((data) => (
            <Card className="w-50 mx-auto p-3" key={data.id}>
              <Row className="p-2">
                <Col lg="3" md="5" className="p-2">
                  <Card.Img variant="top" src={data.avatar} alt="pic" />
                </Col>
                <Col lg="9" md="7">
                  <Card.Body>
                    <Card.Title>
                      User
                      {data.id}
                    </Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        <Row>
                          <Col md="12" lg="5">
                            First Name :-
                            {' '}
                          </Col>
                          <Col md="12" lg="7">
                            {data.first_name}
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col md="12" lg="5">
                            Last Name :-
                          </Col>
                          <Col md="12" lg="7">
                            {data.last_name}
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col md="12" lg="5">
                            Email :-
                            {' '}
                          </Col>
                          <Col md="12" lg="7">
                            {data.email}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </>
      )}
    </>
  );
}

export default Loader(User);
