let initialState = {
    loading: false,
    token: null,
    message: null,
    isRedirect: null,
    is_email_confirmed: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOADING':
            return{...state, loading: true}
        case 'AUTH_SUCCESS':
            return {...state, message: action.payload, loading: false}
        case 'AUTH_ERROR':
            return {...state, message: action.payload, loading: false}
        case 'LOGIN_SUCCESS':
            return {...state, token: action.payload, isRedirect: true}
        case 'LOGIN_FAILED':
            return {...state, message: action.payload}
        case 'CHECK_USER_VERIFIED_SUCCESS':
            return {...state, is_email_confirmed: action.payload}
        case 'CHECK_USER_VERIFIED_ERROR':
            return {...state, message: action.payload}
        default:
            return state
    }   

}

export default userReducer