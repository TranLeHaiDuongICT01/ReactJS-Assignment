import * as actionType from '../action/actionType';
const calculateSalary = (salaryScale, overTime) => {
    return Math.round(salaryScale * 3000000 + overTime * 200000);
}
const staffReducer = (state = {
    staffs: [],
    staffsSalary: [],
    staffsOfDepartment: [],
    isLoading: true,
    errMess: null
}, action) => {
    switch (action.type) {
        case actionType.STAFFS_LOADING:
            return {
                ...state,
                staffs: state.staffs,
                staffsSalary: state.staffsSalary,
                staffsOfDepartment: state.staffsOfDepartment,
                isLoading: true,
                errMess: null
            }
        case actionType.STAFFS_FAILED:
            return {
                ...state,
                staffs: [],
                staffsOfDepartment: [],
                staffsSalary: [],
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
                staffsSalary: action.payload.map(staff => {
                    staff.salary = calculateSalary(staff.salaryScale, staff.overTime);
                    return staff;
                }),
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
                staffsSalary: action.payload,
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
        case actionType.STAFFS_SALARY:
            return {
                ...state,
                staffsSalary: action.payload,
                isLoading: false,
                errMess: null
            }
        default:
            return state
    }
}

export default staffReducer;