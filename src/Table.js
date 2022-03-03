import React, {Component} from 'react'
import './Table.css'

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
            <tr>
            <td className="Table-Td">1</td>
            <td className="Table-Td">Yash</td>
          </tr>
            <tr>
            <td className="Table-Td">2</td>
            <td className="Table-Td">Vishal</td>
          </tr>
            <tr>
            <td className="Table-Td">3</td>
            <td className="Table-Td">Tejas</td>
          </tr>
            <tr>
            <td className="Table-Td">4</td>
            <td className="Table-Td">Poorav</td>
          </tr>
            <tr>
            <td className="Table-Td">5</td>
            <td className="Table-Td">Akshar</td>
          </tr>
        </table>
        </>
      )
    }
}

export default Table