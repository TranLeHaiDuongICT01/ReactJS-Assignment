import * as actionType from '../action/actionType';

const departmentReducer = (state = {
    departments: [],
    isLoading: true,
    errMess: null
}, action) => {
    switch (action.type) {
        case actionType.DEPARTMENTS_LOADING:
            return {
                ...state,
                departments: [],
                isLoading: true,
                errMess: null
            }
        case actionType.DEPARTMENTS_FAILED:
            return {
                ...state,
                departments: [],
                isLoading: false,
                errMess: action.payload
            }
        case actionType.ADD_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload,
                isLoading: false,
                errMess: null
            }
        case actionType.UPDATE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments
                    .map(department => {
                        if (String(department.id) === String(action.payload.id)) {
                            if (action.payload.isAdd) department.numberOfStaff++;
                            else department.numberOfStaff--;
                        }
                        return department;
                    }),
                isLoading: false,
                errMess: null
            }
        case actionType.TRANSFER_STAFF_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.map(department => {
                    if (department.id === action.payload.prevDepartment)
                        department.numberOfStaff--;
                    if (department.id === action.payload.currentDepartment)
                        department.numberOfStaff++;
                    return department;
                }),
                isLoading: false,
                errMess: null
            }
        default:
            return state;
    }
}

export default departmentReducer;