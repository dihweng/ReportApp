import * as types from './types';
export const setReport = (reports) => dispatch => {
   dispatch({
    type: types.SET_REPORT,
     reports
  });
}

export const setReportId = (reportId) => dispatch => {
   dispatch({
    type: types.SET_REPORT_ID,
     reportId
  });
}

// export const getReport = (report) => dispatch => {
//    dispatch({
//     type: types.SET_PROFILE,
//      reports
//   });
// }

  



