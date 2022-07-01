import * as actionType from './actionType';
import baseUrl from '../../shared/baseUrl';

export const departmentsLoading = () => ({
    type: actionType.DEPARTMENTS_LOADING
})
export const departmentsFailed = (errMess) => ({
    type: actionType.DEPARTMENTS_FAILED,
    payload: errMess
})
export const addDepartments = (departments) => ({
    type: actionType.ADD_DEPARTMENTS,
    payload: departments
})
export const updateDepartment = (departmentId, isAdd) => ({
    type: actionType.UPDATE_DEPARTMENT,
    payload: {
        id: departmentId,
        isAdd
    }
})
export const transferStaff = (prevDepartment, currentDepartment) => ({
    type: actionType.TRANSFER_STAFF_DEPARTMENT,
    payload: {
        prevDepartment, currentDepartment
    }
})

export const fetchDepartments = () => async (dispatch) => {
    try {
        dispatch(departmentsLoading());
        const response = await fetch(`${baseUrl}/departments`);
        if (!response.ok)
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        const departments = await response.json();
        dispatch(addDepartments(departments));
    } catch (error) {
        dispatch(departmentsFailed(error.message || 'Something went wrong, please try again'));
    }
}

export const addStaffToDepartment = (departmentId) => (dispatch) => {
    try {
        dispatch(updateDepartment(departmentId, true));
    } catch (error) {
        dispatch(departmentsFailed(error.message || 'Something went wrong, please try again'));
    }
}

export const removeStaffFromDepartment = (departmentId) => (dispatch) => {
    try {
        dispatch(updateDepartment(departmentId, false));
    } catch (error) {
        dispatch(departmentsFailed(error.message || 'Something went wrong, please try again'));
    }
}

export const transferStaffDepartment = (prevDepartment, currentDepartment) => (dispatch) => {
    try {
        dispatch(transferStaff(prevDepartment, currentDepartment));
    } catch (error) {
        dispatch(departmentsFailed(error.message || 'Something went wrong, please try again'));
    }
}