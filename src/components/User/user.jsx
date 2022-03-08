import React, { Component } from "react";
import "./user.css";

class User extends Component {
  
  render() {
    return (
      <>
        {this.props.userObj.map((Obj) => {
          return (
            <tr>
              <td className="Table-Td">{Obj.id}</td>
              <td className="Table-Td">{Obj.firstName}</td>
              <td className="Table-Td">{Obj.lastName}</td>
              <td className="Table-Td">{Obj.email}</td>
              <td className="Table-Td">{Obj.userName}</td>
              <td className="Table-Td">{Obj.city}</td>
              <td className="Table-Td">{Obj.state}</td>
              <td className="Table-Td">
                <div onClick={() => this.props.handler(Obj.id)}>
                  <button>Show</button>
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  }
}

export default User;