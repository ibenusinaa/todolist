import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import {checkUserVerified} from './../Redux/Actions/userAction'
import { onGetTodo, onUpdateStatus, onDeleteTask } from './../Redux/Actions/todoAction'
import TodoModal from './../Components/TodoModal'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faChevronDown, faCircleNotch, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


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
        swal({
            title: "Have you finished your task?",
            text: "If you say so, i'm gonna checklist the task!",
            icon: "warning",
            buttons: true,
            dangerMode: false,
          })
          .then((willDelete) => {
            if (willDelete) {
                onUpdateStatus(data)
                swal("Poof! Task has been checked!", {
                    icon: "success",
                });
            }
          });
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
    
    if(user.email === null){
        return(
            <div className = 'container'>
                <div className ='d-flex justify-content-center align-items-center' style={{height: '50vh'}}>
                    <div>
                        Login dulu
                    </div>
                </div>
            </div>
        )
    }

    if(todo.data === null){
        return(
            <div className = 'container'>
                <div className ='d-flex justify-content-center align-items-center' style={{height: '50vh'}}>
                    <div class="spinner-border" role="status" style={{color: '#695cff'}}>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }


    return(
        <div className="container" style={{minHeight: '70vh'}}>
            <div className="row justify-content-center p-5">
                <div className='col-8 border border-black rounded shadow-sm'>
                {
                            user.is_email_confirmed === 0?
                                <div class="alert alert-danger mt-3" role="alert">
                                    Please activate your account to use our To-Do-List app
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
                            todo.data.length === 0?
                                <div className = 'd-flex justify-content-center my-5'>
                                    <span className='text-muted' style={{fontStyle: 'italic'}}>you have zero task at the moment...</span>
                                </div>
                            :
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
                                                        <div key={ind} className='row border border-black rounded align-items-center my-2 mx-1' style={{overflow: 'hidden'}}>
                                                            <input type="checkbox" id={ind + `${val.title} ${val.time}`} className='boxcheck col-12' />
                                                            
                                                            <label className={val.status === 0? 'col-6 text-muted mb-n1' : 'col-6 mb-n1'} for={ind + `${val.title} ${val.time}`} style={{fontSize: '16px', textDecoration: val.status === 0? 'line-through' : 'none', cursor: 'pointer'}}>
                                                                <FontAwesomeIcon icon= {faChevronDown} size='1x' className='todolist-icon' />{val.title}
                                                            </label>
                                                              
                                                            <div className='col-6 d-flex justify-content-end my-2'>
                                                                {
                                                                    val.status === 1?
                                                                        <div className='d-flex align-items-center'>
                                                                            <span className='mr-3 text-muted'>
                                                                                {val.time}
                                                                            </span>
                                                                            <button onClick={() => onUpdate(val.id)} className='icon-selected' style={{fontSize: 12, marginRight: '.35rem'}}>
                                                                                <FontAwesomeIcon icon ={faCircleNotch} size='2x' color='#695cff' />
                                                                            </button>
                                                                            <button onClick={() => onDelete(val.id)} className='icon-selected mr-2' style={{fontSize: 12}}>
                                                                                <FontAwesomeIcon icon ={faTrashAlt} size='2x'/>
                                                                            </button>
                                                                        </div>
                                                                    :
                                                                        <div className='d-flex align-items-center'>
                                                                            <button className='btn' style={{fontSize: 12}}>
                                                                                <FontAwesomeIcon icon ={faCheckCircle} size='2x' color='#695cff' />
                                                                            </button>
                                                                            <button onClick={() => onDelete(val.id)} className='icon-selected mr-2' style={{fontSize: 12}}>
                                                                                <FontAwesomeIcon icon ={faTrashAlt} size='2x'/>
                                                                            </button>
                                                                        </div>
                                                                }
                                                                
                                                            </div>
                                                            
                                                            <div className="desc col-12" style={{textDecoration: val.status === 0? 'line-through' : 'none'}}>
                                                                {val.description}
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