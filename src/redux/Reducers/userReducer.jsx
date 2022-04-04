/* eslint-disable no-underscore-dangle */
import {
  GET_EMPLOYEE, ADD_EMPLOYEE, EDIT_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEE_BY_ID,
} from '../actionTypes';

const initialState = {
  employees: [],
  employeeById: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employees: action.payload,
      };
    case GET_EMPLOYEE_BY_ID:
      return {
        ...state,
        employeeById: action.payload,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.concat(action.payload),
      };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((content) => (content._id === action.payload._id
          ? {
            ...action.payload,
          }
          : content)),
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
