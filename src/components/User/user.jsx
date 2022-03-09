import React, { Component } from 'react'
import './assets/user.css'

class User extends Component {
  render() {
    return (
      <>
        {this.props.userObj.map(Obj => {
          return (
            <tr>
              <td>{Obj.id}</td>
              <td>{Obj.firstName}</td>
              <td>{Obj.lastName}</td>
              <td>{Obj.email}</td>
              <td>{Obj.userName}</td>
              <td>{Obj.city}</td>
              <td>{Obj.state}</td>
            </tr>
          )
        }
        )
        }
      </>
    )
  }
}

export default User