import * as actionTypes from './ActionsTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: actionTypes.ADD_COMMENT,
    payload: comment
})

export const postComment = (dishId, rating, author, comment) => async (dispatch) => {
    const newComment = {
        dishId,
        rating,
        author,
        comment
    }
    newComment.date = new Date().toISOString();
    return fetch(`${baseUrl}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) return response;
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(comment => dispatch(addComment(comment)))
        .catch(err => {
            alert('Your comment could not be posted\nError:' + err.message)
        })
}

export const fetchDishes = () => async (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(`${baseUrl}/dishes`)
        .then(response => {
            if (response.ok) return response;
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(err => dispatch(dishesFailed(err.message)))

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

export const fetchComments = () => async (dispatch) => {
    return fetch(`${baseUrl}/comments`)
        .then(response => {
            if (response.ok) return response;
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(err => {
            dispatch(commentsFailed(err.message))
        })
}

export const addComments = (comments) => ({
    type: actionTypes.ADD_COMMENTS,
    payload: comments
})
export const commentsFailed = (errmess) => ({
    type: actionTypes.COMMENTS_FAILED,
    payload: errmess
})


export const fetchPromos = () => async (dispatch) => {
    dispatch(promoLoading(true));

    return fetch(`${baseUrl}/promotions`)
        .then(response => {
            if (response.ok) return response;
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(err => dispatch(promosFailed(err.message)))
}

export const promoLoading = () => ({
    type: actionTypes.PROMOS_LOADING,
})

export const addPromos = (promos) => ({
    type: actionTypes.ADD_PROMOS,
    payload: promos
})

export const promosFailed = (errmess) => ({
    type: actionTypes.PROMOS_FAILED,
    payload: errmess
})


export const fetchLeaders = () => async (dispatch) => {
    dispatch(leadersLoading(true));
    return fetch(`${baseUrl}/leaders`)
        .then(response => {
            if (response.ok) return response;
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(err => dispatch(leadersFailed(err.message)))
}

export const leadersLoading = () => ({
    type: actionTypes.LEADERS_LOADING,
})

export const addLeaders = (leaders) => ({
    type: actionTypes.ADD_LEADERS,
    payload: leaders
})
export const leadersFailed = (errmess) => ({
    type: actionTypes.LEADER_FAILED,
    payload: errmess
})