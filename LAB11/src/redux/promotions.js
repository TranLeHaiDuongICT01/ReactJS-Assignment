import * as actionType from './ActionsTypes';
export const Promotions = (state = {
    promotions: [],
    isLoading: true,
    errMess: null
}, action) => {
    switch (action.type) {
        case actionType.ADD_PROMOS:
            return {
                ...state,
                promotions: action.payload,
                isLoading: false,
                errMess: null
            }
        case actionType.PROMOS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                promotions: []
            }
        case actionType.PROMOS_FAILED:
            return {
                ...state,
                errMess: action.payload,
                isLoading: false,
                promotions: []
            }
        default:
            return state;
    }
}