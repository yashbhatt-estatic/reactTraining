import React, { Component } from "react";
import User from "../User/user";
import Obj from "../User/userObj";

class App extends Component {
  render() {
    return (
      <>
        <h2>This is Parent class</h2>
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
            </tr>
          </thead>
          <tbody>
            <User userObj={Obj}></User>
          </tbody>
        </table>
      </>
    );
  }
}

export default App;