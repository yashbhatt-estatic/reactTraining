import React, { Component } from 'react'
import './Table.css'
import Obj from './tableObj'

class Table extends Component {
  render() {
    return (
      <>
        <h1>Table Data</h1>
        <table className="Table">
          <tr>
            <th className="Table-Td">Id</th>
            <th className="Table-Td">Name</th>
          </tr>
          {Obj.map(Obj => {
            return (
              <tr>
                <td className="Table-Td">{Obj.Id}</td>
                <td className="Table-Td">{Obj.Name}</td>
              </tr>
            )
          }
          )
          }
        </table>
      </>
    )
  }
}

export default Table