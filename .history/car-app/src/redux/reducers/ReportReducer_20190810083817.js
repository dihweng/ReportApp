import * as types from '../actions/types';

const initialState = {
    allReports:[],
    report:{}
}
export default function ProfileReducer(state = initialState, action) {
    switch(action.type){
        case types.SET_PROFILE: 
            return Object.assign({}, state, {
                allReports:action.reports,      
            });
        case types.GET_REPORT: 
            return Object.assign({}, state, {
                report: action.report,      
            });
         default:
            return state;

    }
}
