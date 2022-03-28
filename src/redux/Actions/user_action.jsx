export function getEmployee() {
  return (dispatch) => dispatch({
    type: 'GET_EMPLOYEE',
  });
}

export function addEmployee(data) {
  return (dispatch) => dispatch({
    type: 'ADD_EMPLOYEE',
    payload: data,
  });
}

export function editEmployee(data) {
  return (dispatch) => dispatch({
    type: 'EDIT_EMPLOYEE',
    payload: data,
  });
}

export function deleteEmployee(employeeId) {
  return (dispatch) => dispatch({
    type: 'DELETE_EMPLOYEE',
    payload: employeeId,
  });
}
