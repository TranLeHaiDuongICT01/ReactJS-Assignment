import * as actionType from './ActionsTypes';
export const Comments = (state = { comments: [], errMess: null }, action) => {
    switch (action.type) {
        case actionType.ADD_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                errMess: null
            }
        case actionType.COMMENTS_FAILED:
            return {
                ...state,
                errMess: action.payload,
                comments: []
            }
        case actionType.ADD_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(action.payload)
            }
        default:
            return state;
    }
}