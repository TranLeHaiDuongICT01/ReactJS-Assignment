import * as actionType from '../action/actionType';

const staffReducer = (state = {
    staffs: [],
    staffsOfDepartment: [],
    isLoading: true,
    errMess: null
}, action) => {
    switch (action.type) {
        case actionType.STAFFS_LOADING:
            return {
                ...state,
                staffs: state.staffs,
                staffsOfDepartment: state.staffsOfDepartment,
                isLoading: true,
                errMess: null
            }
        case actionType.STAFFS_FAILED:
            return {
                ...state,
                staffs: [],
                staffsOfDepartment: [],
                isLoading: false,
                errMess: action.payload
            }
        case actionType.ADD_STAFFS:
            return {
                ...state,
                staffs: action.payload,
                isLoading: false,
                errMess: null
            }
        case actionType.ADD_SINGLE_STAFF:
            return {
                ...state,
                staffs: action.payload,
                isLoading: false,
                errMess: null
            }
        case actionType.UPDATE_STAFF:
            return {
                ...state,
                staffs: action.payload,
                isLoading: false,
                errMess: null
            }
        case actionType.DELETE_STAFF:
            return {
                ...state,
                staffs: action.payload,
                isLoading: false,
                errMess: null
            }
        case actionType.STAFFS_OF_DEPARTMENT:
            return {
                ...state,
                staffsOfDepartment: action.payload,
                isLoading: false,
                errMess: null
            }
        default:
            return state
    }
}

export default staffReducer;