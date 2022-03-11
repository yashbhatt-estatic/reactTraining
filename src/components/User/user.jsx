import { Button, Card, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import React, { Component } from "react";
import "./assets/user.css";

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

  handler(id) {
    const users = this.state.users;

    var data = users.data
      .filter(function (item) {
        return item.id === id;
      })
      .map(function (user) {
        return user;
      });

    this.setState({
      fetchUser: data
    });
  }

  componentDidMount() {
    setTimeout(this.getUser, 1000 * 2);
  }

  getUser() {
    fetch("https://reqres.in/api/users?page=2")
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

    return (
      <>
        <Container className="bg-light border">
          {detailsLoaded === false ? (
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                No Data Available
              </Col>
            </Row>
          ) : (
            users.data.map((Obj) => {
              return (
                <Row
                  md="2"
                  className="justify-content-md-center border p-3"
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
              );
            })
          )}
        </Container>
        <hr className="mt-5 mb-3 border text-primary border-primary border-5" />
          {fetchUser.map((data) => {
            return (
              <Card className="mt-5" key={data.id}>
                <Card.Img
                  variant="top"
                  className="h-3 w-3"
                  src={data.avatar}
                  alt="pic"
                />
                <Card.Body>
                  <Card.Title>User {data.id}</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>First Name :- {data.first_name}</ListGroupItem>
                  <ListGroupItem>Last Name :- {data.last_name}</ListGroupItem>
                  <ListGroupItem>Email :- {data.email}</ListGroupItem>
                </ListGroup>
                </Card.Body>
              </Card>
            );
          })
        }
      </>
    );
  }
}

export default User;
