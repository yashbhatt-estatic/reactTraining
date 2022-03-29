import {
  GET_EMPLOYEE, ADD_EMPLOYEE, EDIT_EMPLOYEE, DELETE_EMPLOYEE,
} from '../actionTypes';

const initialState = {
  employees: [
    {
      id: 1,
      firstName: 'Yash',
      lastName: 'Bhatt',
      email: 'yash.bhatt@estatic-infotech.com',
      department: 'IT',
      gender: 'male',
      city: 'Keshod',
      state: 'Gujrat',
      country: 'India',
    },
  ],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.concat(action.payload),
      };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((content) => (content.id === action.payload.id
          ? {
            ...content,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
          }
          : content)),
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
