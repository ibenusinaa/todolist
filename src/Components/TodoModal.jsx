import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'

import {onCreateTodo} from './../Redux/Actions/todoAction'

const TodoModal = ({user, onCreateTodo, todo}) => {

    // states
    const [modalOpen, setModalOpen] = (useState(false))

    // refs
    const title = useRef(null)
    const description = useRef(null)
    const date = useRef(null)

    const onSubmit = () => {

        let token = localStorage.getItem('my-tkn')
        let dataToSend = {
            title: title.current.value,
            description: description.current.value,
            date: date.current.value,
            token: token
        }
        console.log(dataToSend)
        onCreateTodo(dataToSend)
        setModalOpen(false)
    }

    return(
        <>
            <div>
                <button className='btn' onClick={() => setModalOpen(true)} disabled={user.is_email_confirmed === 0? true : false}>
                    <span style={{fontSize: 24}}>
                        +
                    </span>
                </button>
            </div>
            <Modal toggle={() => setModalOpen(false)} isOpen={modalOpen}>
            <ModalBody className="px-5 py-5">
                        <div>
                            <h3>
                                New Task
                            </h3>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" ref={title} placeholder="Enter Title" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" ref={description} placeholder="Enter Description" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="datetime-local" ref={date} placeholder="Enter Date" className="form-control" />
                        </div>
                        <div>
                            <input type="button" onClick={onSubmit} value="Submit" className="btn btn-info w-100" />
                        </div>
                        <div>
                            <h6 className="text-danger">
                                {
                                    todo.message?
                                        todo.message
                                    :
                                        null
                                }
                            </h6>
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