import { STAFFS, DEPARTMENTS } from '../shared/staffs';

export const initialState = {
    staffs: JSON.parse(localStorage.getItem('staffs')) || STAFFS,
    departments: JSON.parse(localStorage.getItem('departments')) || DEPARTMENTS
}

export const reducer = (state = initialState, action) => {
    return state;
}