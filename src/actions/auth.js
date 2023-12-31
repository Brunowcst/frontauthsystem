import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_ACTIVATE_SUCCESS,
    SIGNUP_ACTIVATE_FAIL
} from '../actions/types'

import axios from 'axios'

export const check_authenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')})

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL_BASE}/auth/jwt/verify/`, body, config)

            if (res.data.code !== "token_not_valid") {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
            
        } catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL_BASE}/auth/users/me/`, config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: USER_LOADED_FAIL,
            })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        })
    }
}

export const login = (email, password) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL_BASE}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        console.log(res.data.detail)
        dispatch(load_user())
    } catch (error) {
        console.log(error.response.data.detail)
        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({email})

    try {
        await axios.post(`${process.env.REACT_APP_API_URL_BASE}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
};

export const signup = (email, name, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const body = JSON.stringify({email, name, password, re_password})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL_BASE}/auth/users/`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
        })
    }
};

export const user_activation = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({uid, token})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL_BASE}/auth/users/activation/`, body, config);
        dispatch({
            type: SIGNUP_ACTIVATE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: SIGNUP_ACTIVATE_FAIL,
        })
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({uid, token, new_password, re_new_password})

    try {
        await axios.post(`${process.env.REACT_APP_API_URL_BASE}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }
};

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
}