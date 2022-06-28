import { COMMENTS } from '../shared/comments';
import * as actionType from './ActionsTypes';
export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case actionType.ADD_COMMENT:
            return [...state, {
                id: state.length,
                date: new Date().toISOString(),
                ...action.payload,
            }]
        default:
            return state;
    }
}