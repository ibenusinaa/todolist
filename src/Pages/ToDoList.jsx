import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {checkUserVerified} from './../Redux/Actions/userAction'
import { onGetTodo, onUpdateStatus, onDeleteTask } from './../Redux/Actions/todoAction'
import TodoModal from './../Components/TodoModal'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircleNotch, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


const ToDoList = ({checkUserVerified, onGetTodo, onUpdateStatus, onDeleteTask, user, todo}) => {

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

    const onUpdate = (id) => {
        let token = localStorage.getItem('my-tkn')
        let data = {
            token: token,
            idTodolist: id
        }
        
        onUpdateStatus(data)
    }

    const onDelete = (id) => {
        let token = localStorage.getItem('my-tkn')
        let data = {
            token: token,
            idTodolist: id
        }


        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to see this task anymore!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                onDeleteTask(data)
                swal("Poof! Task has been deleted!", {
                    icon: "success",
                });
            }
          });
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
                                        <div key={index} className='mb-2 mt-4'>
                                            <h5>
                                                {
                                                    value.date === (new Date().toDateString())?
                                                        'Today'
                                                    :
                                                        (value.date).split(' ')[1] === (new Date().toDateString().split(' ')[1]) && Number((value.date).split(' ')[2]) - (Number(new Date().toDateString().split(' ')[2])) === 1?
                                                            'Tomorrow'
                                                        :
                                                            value.date
                                                }
                                            </h5>
                                        </div>
                                        {
                                            value.todolists.map((val, ind) => {
                                                return(
                                                    <div key={ind} className='d-flex border border-black rounded align-items-center my-2'>
                                                        <span className={val.status === 0? 'col-8 text-muted' : 'col-8'} style={{fontSize: '16px', textDecoration: val.status === 0? 'line-through' : 'none'}}>
                                                            {val.title}
                                                        </span>
                                                        <div className='col-4 d-flex justify-content-end my-2'>
                                                            {
                                                                val.status === 1?
                                                                    <div className='d-flex align-items-center'>
                                                                        <span className='mr-3 text-muted'>
                                                                            {value.time}
                                                                        </span>
                                                                        <button onClick={() => onUpdate(val.id)} className='btn' style={{fontSize: 12}}>
                                                                            <FontAwesomeIcon icon ={faCircleNotch} size='2x' color='#695cff' />
                                                                        </button>
                                                                        <button onClick={() => onDelete(val.id)} className='btn' style={{fontSize: 12}}>
                                                                            <FontAwesomeIcon icon ={faTrashAlt} size='2x'/>
                                                                        </button>
                                                                    </div>
                                                                :
                                                                    <div className='d-flex align-items-center'>
                                                                        <button className='btn' style={{fontSize: 12}}>
                                                                            <FontAwesomeIcon icon ={faCheckCircle} size='2x' color='#695cff' />
                                                                        </button>
                                                                        <button onClick={() => onDelete(val.id)} className='btn' style={{fontSize: 12}}>
                                                                            <FontAwesomeIcon icon ={faTrashAlt} size='2x'/>
                                                                        </button>
                                                                    </div>
                                                            }
                                                            
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
    checkUserVerified, onGetTodo, onUpdateStatus, onDeleteTask
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)