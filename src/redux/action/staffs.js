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
export const addSingleStaff = (staff) => ({
    type: actionType.ADD_SINGLE_STAFF,
    payload: staff
})
export const updateStaff = (staff) => ({
    type: actionType.UPDATE_STAFF,
    payload: staff
})
export const deletedStaff = (staffId) => ({
    type: actionType.DELETE_STAFF,
    payload: staffId
})

export const fetchStaffs = () => async (dispatch) => {
    try {
        dispatch(staffsLoading());
        const response = await fetch(`${baseUrl}/staffs`);
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
                'Content_Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        if (!response.ok)
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        const newStaff = await response.json();
        dispatch(addSingleStaff(newStaff));
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
        const updatedStaff = await response.json();
        dispatch(updateStaff(updatedStaff));
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
        const staff = await response.json();
        dispatch(deletedStaff(staff));
    } catch (error) {
        dispatch(staffFailed(error.message || 'Something went wrong, please try again'));
    }
}
