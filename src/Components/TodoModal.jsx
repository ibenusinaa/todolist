import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'

import {onCreateTodo} from './../Redux/Actions/todoAction'

const TodoModal = ({user, onCreateTodo, todo}) => {

    // states
    const [modalOpen, setModalOpen] = useState({
        modal: false,
        error: false
    })
    

    // refs
    const title = useRef(null)
    const description = useRef(null)
    const date = useRef(null)

    const onSubmit = () => {
        if(!title.current.value || !description.current.value || !date.current.value) return setModalOpen({...modalOpen, error: 'I think you missed something...'})
        let token = localStorage.getItem('my-tkn')
        let dataToSend = {
            title: title.current.value,
            description: description.current.value,
            date: date.current.value,
            token: token
        }
        console.log(dataToSend)
        onCreateTodo(dataToSend)
        setModalOpen({modal: false, error: false})
    }

    return(
        <>
            <div>
                <button className ='button-task' onClick={() => setModalOpen({...modalOpen, modal: true})} disabled={user.is_email_confirmed === 0? true : false}>
                    <span style={{fontSize: 24}}>
                        +
                    </span>
                </button>
            </div>
            <Modal toggle={() => setModalOpen({modal: false, error: false})} isOpen={modalOpen.modal}>
            <ModalBody className="px-5 my-3">
                        <div className ='mb-4'>
                            <h3>
                                New Task
                            </h3>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" ref={title} placeholder="What is your task?" className="form-control" onKeyPress={(e) => {if(e.key === 'Enter') onSubmit()}}/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" ref={description} placeholder="Put the detail about your task here" className="form-control" onKeyPress={(e) => {if(e.key === 'Enter') onSubmit()}} />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="datetime-local" ref={date} placeholder="When you're gonna do the task?" className="form-control" onKeyPress={(e) => {if(e.key === 'Enter') onSubmit()}} />
                        </div>
                        <div>
                            <p className="text-danger mt-3">
                                {
                                    todo.message?
                                        todo.message
                                    :
                                        null
                                }
                                {
                                    modalOpen.error?
                                        modalOpen.error
                                    :
                                        null
                                }
                            </p>
                        </div>
                        <div>
                            <input type="button" onClick={onSubmit} value="Submit" className="btn button-get-started w-100" style={{fontSize: '1rem'}} />
                        </div>

                    </ModalBody>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        todo: state.todo
    }
}

const mapDispatchToProps = {
    onCreateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoModal)