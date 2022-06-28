import * as actionType from './ActionsTypes';
export const Dishes = (state = { dishes: [], isLoading: true, errMess: null }, action) => {
    switch (action.type) {
        case actionType.ADD_DISHES:
            return {
                ...state,
                dishes: action.payload,
                isLoading: false,
                errMess: null
            }
        case actionType.DISHES_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                dishes: []
            }
        case actionType.DISHES_FAILED:
            return {
                ...state,
                errMess: action.payload,
                isLoading: false,
                dishes: []
            }
        default:
            return state;
    }
}