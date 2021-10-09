import * as ActionTypes from './ActionTypes';
import Cheese from '../assets/images/cheese.png';
import Meat from '../assets/images/meat.png';
import Salad from '../assets/images/salad.png';

const INITIAL_STATE = {
    ingredients: [
        { id: 1, type: 'cheese', img: Cheese, price: 40, amount: 0 },
        { id: 2, type: 'meat', img: Meat, price: 120, amount: 0 },
        { id: 3, type: 'salad', img: Salad, price: 20, amount: 0 }
    ],
    orderState: {
        orders: [],
        isLoading: true,
        alerts: []
    },
    total: 0,
    purchasable: false,
    token: null,
    userId: null,
    user: null,
    authLoading: false,
    authErrMessage: ''
};

const totalAmountFinder = (ingredients) => {
    let sumAmount = 0;
    ingredients.forEach(({ amount }) => sumAmount += amount);
    return sumAmount;
}

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.addIngredient:
            const totalAmount = totalAmountFinder(state.ingredients);
            if (totalAmount < 10) {
                let totalPrice = state.total;
                const updatedIngredients = state.ingredients.map(ingredient => {
                    if (ingredient.id === action.payload) {
                        ingredient.amount++;
                        totalPrice += ingredient.price
                        return ingredient;
                    } else return ingredient;
                })
                return { ...state, ingredients: updatedIngredients, total: totalPrice };
            } else return state;

        case ActionTypes.removeIngredient:
            let copyTotal = state.total;
            const updatedIngredients = state.ingredients.map(item => {
                if (item.id === action.payload) {
                    if (item.amount) {
                        let mapItem = item;
                        mapItem.amount--;
                        copyTotal -= mapItem.price;
                        return mapItem;
                    } else return item
                } else return item;
            })
            return { ...state, ingredients: updatedIngredients, total: copyTotal };

        case ActionTypes.updatePurchasable:
            const amount = state.ingredients.reduce((previous, currentIngredient) => previous + currentIngredient.amount, 0);
            return {
                ...state,
                purchasable: !!amount
            }

        case ActionTypes.resetPurchasable:
            return {
                ...state,
                ingredients: [
                    { id: 1, type: 'cheese', img: Cheese, price: 40, amount: 0 },
                    { id: 2, type: 'meat', img: Meat, price: 120, amount: 0 },
                    { id: 3, type: 'salad', img: Salad, price: 20, amount: 0 }
                ],
                total: 0,
                purchasable: false
            }

        case ActionTypes.orderError:
            return {
                ...state,
                orderState: {
                    ...state.orderState,
                    isLoading: false
                }
            };

        case ActionTypes.authLoading:
            return {
                ...state,
                authLoading: action.payload.isLoading,
                authErrMessage: action.payload.message
            }

        case ActionTypes.authSuccess:
            return { ...state, token: action.payload.token, userId: action.payload.userId };

        case ActionTypes.addUser:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId
            }

        case ActionTypes.loadUsers:
            let myUser;
            for (let docID in action.payload) {
                let user = action.payload[docID];
                if (state.userId === user.userId) {
                    user.docID = docID;
                    myUser = user;
                };
            }
            const myAllOrders = myUser ? myUser.orders : [];
            return { ...state, user: myUser, orderState: { ...state.orderState, orders: myAllOrders, isLoading: false } };

        case ActionTypes.authRemove:
            return {
                ingredients: [
                    { id: 1, type: 'cheese', img: Cheese, price: 40, amount: 0 },
                    { id: 2, type: 'meat', img: Meat, price: 120, amount: 0 },
                    { id: 3, type: 'salad', img: Salad, price: 20, amount: 0 }
                ],
                orderState: {
                    orders: [],
                    isLoading: true
                },
                total: 0,
                purchasable: false,
                token: null,
                userId: null,
                user: null
            }

        case ActionTypes.removeErrMessage:
            return { ...state, authErrMessage: '' }

        default: return state;
    }
}

export default Reducer;