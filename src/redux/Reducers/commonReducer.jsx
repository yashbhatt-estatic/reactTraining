import { START_LOADER, STOP_LOADER } from '../actionTypes';

const initialState = {
  loading: false,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    case STOP_LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
