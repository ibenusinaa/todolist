import axios from 'axios'

export const onCreateTodo = (dataToSend) => {
    return (dispatch) => {
        let data = {
            token: dataToSend.token
        }
    

    axios.post('http://localhost:4000/todo/create', dataToSend)
    .then((res)=> {
        axios.post('http://localhost:4000/todo/get', data)
        .then((response) => {
            console.log(response)
            dispatch({
                type: 'TODO_SUCCESS',
                payload: response.data.data
            })
        })
        .catch((error) => {
            console.log(error)
            dispatch({
                type: 'TODO_ERROR',
                payload: error.response.data.message
            })
        })
    })
    .catch((err) => {
        console.log(err)
        dispatch({
            type: 'TODO_ERROR',
            payload: err.response.data.message
        })
    })
    }
}

export const onGetTodo = (data) => {
    return(dispatch) => {
        console.log('masuk getTodo')
        axios.post('http://localhost:4000/todo/get', data)
            .then((response) => {
                dispatch({
                    type: 'TODO_SUCCESS',
                    payload: response.data.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'TODO_ERROR',
                    payload: error.response.data.message
                })
            })

    }
}