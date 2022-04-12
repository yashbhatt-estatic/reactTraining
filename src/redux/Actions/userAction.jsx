import {
  GET_EMPLOYEE, ADD_EMPLOYEE, EDIT_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEE_BY_ID,
} from '../actionTypes';

export function getEmployee(data) {
  return (dispatch) => dispatch({
    type: GET_EMPLOYEE,
    payload: data,
  });
}

export function getEmployeeById(data) {
  return (dispatch) => dispatch({
    type: GET_EMPLOYEE_BY_ID,
    payload: data,
  });
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

export function deleteEmployee(data) {
  return (dispatch) => dispatch({
    type: DELETE_EMPLOYEE,
    payload: data,
  });
}
