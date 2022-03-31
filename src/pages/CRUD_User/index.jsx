import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from '../../redux/Actions/userAction';

function CrudUser() {
  const [user, setUser] = useState({
    id: 0,
    firstName: '',
    department: '',
  });
  const { employees } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const clearData = () => {
    setUser({
      id: 0,
      firstName: '',
      department: '',
    });
  };

  const submitData = () => {
    if (user.firstName && user.department && !user.id) {
      const newEmployee = {
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        firstName: user.firstName,
        department: user.department,
      };
      dispatch(addEmployee(newEmployee));
    } else if (user.firstName && user.department && user.id) {
      const updatedDetails = {
        id: user.id,
        firstName: user.firstName,
        department: user.department,
      };

      dispatch(editEmployee(updatedDetails));
    } else {
      alert('Enter Employee Details.');
    }

    clearData();
  };

  const editDetails = (data) => {
    setUser((prevState) => ({
      ...prevState,
      id: data.id,
      firstName: data.firstName,
      department: data.department,
    }));
  };

  const deleteEmployeeUser = (id) => {
    clearData();
    if (window.confirm('Are you sure?')) {
      dispatch(deleteEmployee(id));
    }
  };

  const handleNameChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      firstName: e.target.value,
    }));
  };

  const handleDepartmentChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      department: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(getEmployee());
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
            value={user.firstName}
            type="text"
            placeholder="Employee Name"
          />
          <br />
          Employee Department :
          <input
            onChange={handleDepartmentChange}
            value={user.department}
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
              {employees
                && employees.map((data, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{data.firstName}</td>
                    <td>{data.department}</td>
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

export default CrudUser;
