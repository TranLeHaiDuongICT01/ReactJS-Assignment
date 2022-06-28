import * as actionTypes from './ActionsTypes';

export const addComment = (dishId, rating, author, comment) => ({
    type: actionTypes.ADD_COMMENT,
    payload: {
        dishId, rating, author, comment
    }
})