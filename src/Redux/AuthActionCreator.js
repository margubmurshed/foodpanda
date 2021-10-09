import axios from 'axios';
import * as ActionTypes from './ActionTypes';

const AuthLoading = (isLoading, message = "") => {
    return {
        type: ActionTypes.authLoading,
        payload: { isLoading, message }
    }
}

const AuthSuccess = (token, userId) => {
    return {
        type: ActionTypes.authSuccess,
        payload: { token, userId }
    }
}

const SetLocalStore = (token, userId, expiresIn) => {
    let expTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expTime", expTime);
}

export const Authenticator = (email, password, mode, name) => {
    return dispatch => {
        dispatch(AuthLoading(true));
        const data = { email, password, returnSecureToken: true };
        let WEB_API_KEY = "AIzaSyAkBY-J8RbtM9DyzmV29pnlYzpvsG_1NXk";

        if (mode === 'Login') {
            axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + WEB_API_KEY, data)
                .then(({ data: { idToken, localId, expiresIn } }) => {
                    SetLocalStore(idToken, localId, expiresIn);
                    dispatch(AuthSuccess(idToken, localId));
                    loadUsers();
                    dispatch(AuthLoading(false));
                })
                .catch(err => dispatch(AuthLoading(false, err.response.data.error.message)))
        } else {
            axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + WEB_API_KEY, data)
                .then(({ data: { idToken, localId, expiresIn } }) => {
                    SetLocalStore(idToken, localId, expiresIn);
                    dispatch(AuthSuccess(idToken, localId));
                    AddUser(name, email, localId, idToken);
                    dispatch(AuthLoading(false))
                })
                .catch(err => dispatch(AuthLoading(false, err.response.data.error.message)))
        }

        const AddUser = (name, email, userId, token) => {
            const user = { name, email, userId, orders: '' };
            axios.post("https://margubpanda-default-rtdb.asia-southeast1.firebasedatabase.app/users.json", user)
                .then(() => {
                    dispatch({ type: ActionTypes.addUser, payload: { userId, token } })
                    loadUsers();
                })
        }

        const loadUsers = () => {
            axios.get("https://margubpanda-default-rtdb.asia-southeast1.firebasedatabase.app/users.json")
                .then(({ data }) => dispatch({ type: ActionTypes.loadUsers, payload: data }))
        }
    }
}

export const LoadUsers = () => {
    return dispatch => {
        axios.get("https://margubpanda-default-rtdb.asia-southeast1.firebasedatabase.app/users.json")
            .then(response => dispatch({ type: ActionTypes.loadUsers, payload: response.data }))
    }
}

export const AuthCheck = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        let expTime = localStorage.getItem('expTime');

        if (!!token && !!userId) {
            if (new Date().getTime() <= expTime) {
                dispatch(AuthSuccess(token, userId))
                axios.get("https://margubpanda-default-rtdb.asia-southeast1.firebasedatabase.app/users.json")
                    .then(response => dispatch({ type: ActionTypes.loadUsers, payload: response.data }))
            } else {
                Logout();
            }
        } else {
            Logout();
        }
    }
}

export const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expTime');
    return {
        type: ActionTypes.authRemove
    }
}

export const RemoveErrMessage = () => {
    return {
        type: ActionTypes.removeErrMessage
    }
}