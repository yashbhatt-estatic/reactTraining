import React, { Component } from "react";
import "./assets/user.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], detailsLoaded: false };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    setTimeout(this.getUser, 1000 * 2);
  }

  getUser() {
    fetch("https://61f28d022219930017f50701.mockapi.io/user")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          users: data,
          detailsLoaded: true,
        });
      });
  }

  render() {
    const { users, detailsLoaded } = this.state;
    console.log(users, detailsLoaded);
    return (
      <>
        {detailsLoaded === false ? (
          <tr>
            <td colSpan="99">No Data Available</td>
          </tr>
        ) : (
          users.map((Obj) => {
            return (
              <tr key={Obj.id} id={Obj.id}>
                <td>{Obj.id}</td>
                <td>{Obj.first_name}</td>
                <td>{Obj.last_name}</td>
                <td>{Obj.email}</td>
                <td>{Obj.userName}</td>
                <td>{<img src={Obj.avatar} width={100} height={100} alt={"avatar"}/>}</td>
                <td>
                  <button onClick={() => this.props.handler(Obj.id)}>
                    Show
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </>
    );
  }
}

export default User;
