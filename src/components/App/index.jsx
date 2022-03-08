import React, { PureComponent } from "react";
import User from "../User/user";
import Obj from "../User/userObj";
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { firstName: "" };
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    this.setState({ firstName: "Admin" });
  }

  getSnapshotBeforeUpdate(prevState) {
    return prevState;
  }

  componentDidUpdate(prevState, snapshot) {
    if (snapshot !== null && this.state.firstName !== "Admin") {
      alert(
        " User Changed \n previous user : " +
          snapshot.firstName +
          "\n Changed to : " +
          this.state.firstName
      );
    }
  }

  componentWillUnmount() {
    this.setState({ firstName: "" });
  }

  handler(id) { 

    const elements = document.getElementsByClassName("activeClass"); 
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('activeClass')
    }

    const element = document.getElementById(id);
    element.className = "activeClass";

    var data = Obj.filter(function (item) {
      return item.id === id;
    }).map(function ({ firstName }) {
      return firstName;
    });

    this.setState({ firstName: data[0] });
  }

  render() {
    return (
      <>
        <h1>Welcome to the page {this.state.firstName}</h1>
        <h1>Table Data</h1>
        <table className="Table">
          <thead>
            <tr>
              <th className="Table-Td">Id</th>
              <th className="Table-Td">First Name</th>
              <th className="Table-Td">Last Name</th>
              <th className="Table-Td">Email</th>
              <th className="Table-Td">User Name</th>
              <th className="Table-Td">City</th>
              <th className="Table-Td">State</th>
              <th className="Table-Td">Button</th>
            </tr>
          </thead>
          <tbody>
            <User userObj={Obj} handler={this.handler}></User>
          </tbody>
        </table>
      </>
    );
  }
}

export default App;