import * as actionType from './ActionsTypes';

export const Feedback = (state = { feedbacks: [], isLoading: true, errMess: null }, action) => {
    switch (action.type) {
        case actionType.ADD_FEEDBACKS:
            return {
                ...state,
                feedbacks: action.payload,
                isLoading: false,
                errMess: null
            }
        case actionType.FEEDBACKS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                feedbacks: []
            }
        case actionType.FEEDBACKS_FAILED:
            return {
                ...state,
                errMess: action.payload,
                isLoading: false,
                feedbacks: []
            }
        case actionType.ADD_FEEDBACK:
            return {
                ...state,
                feedbacks: state.feedbacks.concat(action.payload),
                isLoading: false,
                errMess: null
            }
        default:
            return state;
    }
}