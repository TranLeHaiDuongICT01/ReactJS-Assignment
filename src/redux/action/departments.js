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
export const updateDepartment = (department) => ({
    type: actionType.UPDATE_DEPARTMENT,
    payload: department
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

export const patchDepartment = (department) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/departments`, {
            method: 'PATCH',
            body: JSON.stringify(department),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });
        if (!response.ok)
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        const updatedDepartment = await response.json();
        dispatch(updateDepartment(updatedDepartment));
    } catch (error) {
        dispatch(departmentsFailed(error.message || 'Something went wrong, please try again'));
    }
}