import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {checkUserVerified} from './../Redux/Actions/userAction'
import { onGetTodo } from './../Redux/Actions/todoAction'
import TodoModal from './../Components/TodoModal'


const ToDoList = ({checkUserVerified, onGetTodo, user, todo}) => {

    // states

    useEffect(()=> {
        isUserVerified()
        getTodoLists()
    },[])

    const isUserVerified = () => {
        let token = localStorage.getItem('my-tkn')

        checkUserVerified(token)
    }

    const getTodoLists = () => {
        let token = localStorage.getItem('my-tkn')
        let data = {
            token
        }
        onGetTodo(data)
    }

    if(todo.data === null){
        return(
            <div>
                loading....
            </div>
        )
    }

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className='col-8 border border-black rounded shadow-sm mt-5'>
                {
                            user.is_email_confirmed === 0?
                                <div class="alert alert-danger mt-3" role="alert">
                                    Activate Your Account!
                                </div>
                            :
                                null
                        }
                    <div className='d-flex justify-content-between align-items-center mb-n2 px-3 mt-3'>
                        <div>
                            <h4>
                                Task
                            </h4>
                        </div>
                    <TodoModal />
                    </div>
                    <hr/>
                    <div className='mx-3'>
                        {
                            todo.data.map((value, index) => {
                                return(
                                    <>
                                        <div key={index} className='my-2'>
                                            <h5>
                                                {value.date}
                                            </h5>
                                        </div>
                                        {
                                            value.todolists.map((val, ind) => {
                                                return(
                                                    <div key={ind} className='d-flex border border-black rounded align-items-center my-2'>
                                                        <span className='col-8' style={{fontSize: '16px'}}>
                                                            {val.title}
                                                        </span>
                                                        <div className='col-4 d-flex justify-content-end my-2'>
                                                            <button className='btn btn-success' style={{fontSize: 12}}>
                                                                Done
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        } 
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        todo: state.todo
    }
}

const mapDispatchToProps = {
    checkUserVerified, onGetTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)