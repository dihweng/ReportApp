import * as types from '../actions/types';
import console = require('console');

const initialState = {
    allReports:[],
    report:{}
}
export default function ReportReducer(state = initialState, action) {
    switch(action.type){
        case types.SET_REPORT: 
            return Object.assign({}, state, {
                allReports:action.reports,      
            });
        case types.FIND_REPORT: 
            console.log({'this is the response.. ': allReports[action.reportIndex]})
            return Object.assign({}, state, {
                report:allReports[action.reportIndex],      
            });
         default:
            return state;

    }
}
