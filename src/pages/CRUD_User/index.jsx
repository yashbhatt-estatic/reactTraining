import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from '../../redux/Actions/user_action';

function crudUser(props) {
  const [user, setUser] = useState({
    id: 0,
    employeeName: '',
    employeeDepartment: '',
  });

  const clearData = () => {
    setUser({
      id: 0,
      employeeName: '',
      employeeDepartment: '',
    });
  };

  const submitData = () => {
    if (user.employeeName && user.employeeDepartment && !user.id) {
      const newEmployee = {
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        employeeName: user.employeeName,
        employeeDepartment: user.employeeDepartment,
      };
      props.addEmployee(newEmployee);
    } else if (user.employeeName && user.employeeDepartment && user.id) {
      const updatedDetails = {
        id: user.id,
        employeeName: user.employeeName,
        employeeDepartment: user.employeeDepartment,
      };

      props.editEmployee(updatedDetails);
    } else {
      alert('Enter Employee Details.');
    }

    clearData();
  };

  const editDetails = (data) => {
    setUser((prevState) => ({
      ...prevState,
      id: data.id,
      employeeName: data.employeeName,
      employeeDepartment: data.employeeDepartment,
    }));
  };

  const deleteEmployeeUser = (id) => {
    clearData();
    if (window.confirm('Are you sure?')) {
      props.deleteEmployee(id);
    }
  };

  const handleNameChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      employeeName: e.target.value,
    }));
  };

  const handleDepartmentChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      employeeDepartment: e.target.value,
    }));
  };

  useEffect(() => {
    props.getEmployee();
  }, []);

  return (
    <div className="userCrud">
      <header>
        <h1 className="text-center mt-3">CRUD opeartions for Employee Module</h1>
      </header>
      <div>
        <div className="card w-50 mx-auto my-3 p-5">
          Employee Name :
          <input
            onChange={handleNameChange}
            value={user.employeeName}
            type="text"
            placeholder="Employee Name"
          />
          <br />
          Employee Department :
          <input
            onChange={handleDepartmentChange}
            value={user.employeeDepartment}
            type="text"
            placeholder="Employee Department"
          />
          <br />
          <div>
            {user.id ? (
              <button type="button" onClick={submitData}>
                UPDATE
              </button>
            ) : (
              <button type="button" onClick={submitData}>
                ADD
              </button>
            )}
            <button type="button" style={{ marginLeft: '15px' }} onClick={clearData}>
              CLEAR
            </button>
          </div>
        </div>
        <div className="mt-5">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Depatment Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {props.employees
                && props.employees.map((data, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{data.employeeName}</td>
                    <td>{data.employeeDepartment}</td>
                    <td>
                      <button type="button" onClick={() => editDetails(data)}>
                        EDIT
                      </button>
                    </td>
                    <td>
                      <button type="button" onClick={() => deleteEmployeeUser(data.id)}>
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

crudUser.propTypes = {
  getEmployee: PropTypes.func.isRequired,
  addEmployee: PropTypes.func.isRequired,
  editEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employees: state.employees,
});

export default connect(mapStateToProps, {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
})(crudUser);
