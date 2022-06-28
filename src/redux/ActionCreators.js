import * as actionTypes from './ActionsTypes';
import { DISHES } from '../shared/dishes';
export const addComment = (dishId, rating, author, comment) => ({
    type: actionTypes.ADD_COMMENT,
    payload: {
        dishId, rating, author, comment
    }
})

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    setTimeout(() => { dispatch(addDishes(DISHES)); }, 1000);


}

export const dishesLoading = () => ({
    type: actionTypes.DISHES_LOADING,
})

export const addDishes = (dishes) => ({
    type: actionTypes.ADD_DISHES,
    payload: dishes
})

export const dishesFailed = (errmess) => ({
    type: actionTypes.DISHES_FAILED,
    payload: errmess
})