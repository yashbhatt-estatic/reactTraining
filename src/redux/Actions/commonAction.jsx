import { START_LOADER, STOP_LOADER } from '../actionTypes';

export function startLoader() {
  return (dispatch) => dispatch({
    type: START_LOADER,
    payload: true,
  });
}

export function stopLoader() {
  return (dispatch) => dispatch({
    type: STOP_LOADER,
    payload: false,
  });
}
