import axios from 'axios'

export const onUserSignUp = (email, password) => {
    return(dispatch) => {
        dispatch(
            {
                type: 'LOADING'
            }
        )

        axios.post(`http://localhost:4000/authentication-system/register`, {email: email, password: password})
        .then((res) => {
            dispatch(
                {
                    type: 'AUTH_SUCCESS',
                    payload: res.data.message
                }
            )
        })
        .catch((err) => {
            dispatch(
                {
                    type: 'AUTH_ERROR',
                    payload: err.message
                }
            )
        })
    }
}

export const onUserLogin = (data) => {
    return(dispatch) => {

        axios.post('http://localhost:4000/authentication-system/login', data)
        .then((res) => {
            console.log(res)
            if(res.data.error === false){
                localStorage.setItem('my-tkn', res.data.data.token)
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data.data.token,
                })
            }else if(res.data.error === true){
                dispatch({
                    type: 'LOGIN_FAILED',
                    payload: res.data.message
                })
            }
        })
        .catch((err) => {
            console.log(err)
            // dispatch({
            //     type: 'LOGIN_FAILED',
            //     payload: err.response.message
            // })
        })
    }
}

export const checkUserVerified = (token) => {
    return(dispatch) => {

        axios.post(`http://localhost:4000/authentication-system/user-verify`, {token})
        .then((res) => {
            dispatch({
                type: 'CHECK_USER_VERIFIED_SUCCESS',
                payload: res.data.is_email_confirmed
            })
        })
        .catch((err) => {
            dispatch({
                type: 'CHECK_USER_VERIFIED_FAILED',
                payload: err.response.data.message
            })
        })
    }
}

export const getEmail = (token) => {
    return(dispatch) => {
        axios.post('http://localhost:4000/authentication-system/get-email', {token})
        .then((res) => {
            dispatch({
                type: 'GET_EMAIL_SUCCESS',
                payload: res.data.email
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}