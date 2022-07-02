import * as actionType from './actionType';
import baseUrl from '../../shared/baseUrl';
export const staffsLoading = () => ({
    type: actionType.STAFFS_LOADING
})
export const staffFailed = (errMess) => ({
    type: actionType.STAFFS_FAILED,
    payload: errMess
})
export const addStaffs = (staffs) => ({
    type: actionType.ADD_STAFFS,
    payload: staffs
})
export const addSingleStaff = (staffs) => ({
    type: actionType.ADD_SINGLE_STAFF,
    payload: staffs
})
export const updateStaff = (staffs) => ({
    type: actionType.UPDATE_STAFF,
    payload: staffs
})
export const deletedStaff = (staffs) => ({
    type: actionType.DELETE_STAFF,
    payload: staffs
})
export const addStaffOfDepartment = (staffs) => ({
    type: actionType.STAFFS_OF_DEPARTMENT,
    payload: staffs
})
export const addStaffsSalary = (staffs) => ({
    type: actionType.STAFFS_SALARY,
    payload: staffs
})

export const fetchStaffs = () => async (dispatch) => {
    try {
        dispatch(staffsLoading());
        const response = await fetch(`${baseUrl}/staffsSalary`);
        if (!response.ok)
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        const staffs = await response.json();
        dispatch(addStaffs(staffs));
    } catch (error) {
        dispatch(staffFailed(error.message || 'Something went wrong, please try again'));
    }
}

export const postStaff = (staff) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/staffs`, {
            method: 'POST',
            body: JSON.stringify(staff),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        if (!response.ok)
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        const staffs = await response.json();
        dispatch(addSingleStaff(staffs));
    } catch (error) {
        dispatch(staffFailed(error.message || 'Something went wrong, please try again'));
    }
}

export const patchStaff = (staff) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/staffs`, {
            method: 'PATCH',
            body: JSON.stringify(staff),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });
        if (!response.ok)
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        const staffs = await response.json();
        dispatch(updateStaff(staffs));
    } catch (error) {
        dispatch(staffFailed(error.message || 'Something went wrong, please try again'));
    }
}

export const deleteStaff = (staffId) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/staffs/${staffId}`, {
            method: 'DELETE'
        });
        if (!response.ok)
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        const staffs = await response.json();
        dispatch(deletedStaff(staffs));
    } catch (error) {
        dispatch(staffFailed(error.message || 'Something went wrong, please try again'));
    }
}

export const fetchStaffsOfDepartment = (departmentId) => async (dispatch) => {
    try {
        dispatch(staffsLoading());
        const response = await fetch(`${baseUrl}/departments/${departmentId}`);
        if (!response.ok)
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        const staffs = await response.json();
        dispatch(addStaffOfDepartment(staffs));
    } catch (error) {
        dispatch(staffFailed(error.message || 'Something went wrong, please try again'));
    }
}
export const fetchStaffsSalary = () => async (dispatch) => {
    try {
        dispatch(staffsLoading());
        const response = await fetch(`${baseUrl}/staffsSalary`);
        if (!response.ok)
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        const staffs = await response.json();
        dispatch(addStaffsSalary(staffs));
    } catch (error) {
        dispatch(staffFailed(error.message || 'Something went wrong, please try again'));
    }
}