import {combineReducers} from 'redux'
import userReducer from './userReducer'
import todoReducer from './todoReducer'

const allRedducer = combineReducers({
    user: userReducer,
    todo: todoReducer
})

export default allRedducer