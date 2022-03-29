import {
  GET_EMPLOYEE, ADD_EMPLOYEE, EDIT_EMPLOYEE, DELETE_EMPLOYEE, STOP_LOADER,
} from '../actionTypes';

export function getEmployee() {
  return (dispatch) => dispatch({
    type: GET_EMPLOYEE,
  }, dispatch({
    type: STOP_LOADER,
  }));
}

export function addEmployee(data) {
  return (dispatch) => dispatch({
    type: ADD_EMPLOYEE,
    payload: data,
  });
}

export function editEmployee(data) {
  return (dispatch) => dispatch({
    type: EDIT_EMPLOYEE,
    payload: data,
  });
}

export function deleteEmployee(employeeId) {
  return (dispatch) => dispatch({
    type: DELETE_EMPLOYEE,
    payload: employeeId,
  });
}
