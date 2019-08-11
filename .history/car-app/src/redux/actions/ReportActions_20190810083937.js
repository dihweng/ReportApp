import * as types from './types';
export const setReport = (reports) => dispatch => {
   dispatch({
    type: types.SET_PROFILE,
     reports
  });
}

  



