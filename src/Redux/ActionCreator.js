import * as ActionTypes from './ActionTypes';

export const addIngredient = ingredientID => {
    return dispatch => {
        dispatch({
            type: ActionTypes.addIngredient,
            payload: ingredientID
        })
    }
}

export const removeIngredient = ingredientID => {
    return dispatch => {
        dispatch({
            type: ActionTypes.removeIngredient,
            payload: ingredientID
        })
    }
}

export const updatePurchasable = () => {
    return dispatch => {
        dispatch({
            type: ActionTypes.updatePurchasable
        })
    }
}

export const resetPurchasable = () => {
    return dispatch => {
        dispatch({
            type: ActionTypes.resetPurchasable
        })
    }
}

export const FetchOrders = () => {
    return dispatch => {
        dispatch({
            type: ActionTypes.loadOrders,
        })
    }
}
