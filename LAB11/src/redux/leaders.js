import * as actionType from './ActionsTypes';
export const Leaders = (state = {
    leaders: [],
    errMess: null,
    isLoading: true
}, action) => {
    switch (action.type) {
        case actionType.LEADERS_LOADING:
            return {
                ...state,
                leaders: [],
                errMess: null,
                isLoading: true
            }
        case actionType.ADD_LEADERS:
            return {
                ...state,
                leaders: action.payload,
                errMess: null,
                isLoading: false
            }
        case actionType.LEADER_FAILED:
            return {
                ...state,
                errMess: action.payload,
                leaders: [],
                isLoading: false
            }
        default:
            return state;
    }
}