import React, { Component } from "react";
import User from "../User/user";
import Obj from "../User/assets/userObj";

class App extends Component {
  render() {
    return (
      <>
        <h2>This is Parent class</h2>
        <h1>Table Data</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>User Name</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            <User userObj={Obj}/>
          </tbody>
        </table>
      </>
    );
  }
}

export default App;