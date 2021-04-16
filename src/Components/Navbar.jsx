import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

import {onUserLogin} from './../Redux/Actions/userAction'

const Navbar = ({onUserLogin, user}) => {

    // refs
    const inputEmail = useRef(null)
    const inputPassword = useRef(null)

    // states
    const [modal, setModal] = useState(false)
    // const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(null)

    // functions
    const onLogin = () => {
        console.log(inputEmail.current.value, inputPassword.current.value)
        let dataToSend = {
            email: inputEmail.current.value,
            password: inputPassword.current.value
        }

        onUserLogin(dataToSend)
    }

    if(user.isRedirect === true){
        window.location ='/'
    }

    return(
        <div style={{backgroundColor: '#695cff'}}>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className = 'col-6 my-2'>
                        <div className='funniture-font-size-18'>
                            <Link to='/'className='text-white'>
                                To-Do-List
                            </Link>
                        </div>
                    </div>
                    <div className= 'col-6 d-flex justify-content-end'>
                        <div onClick={() => setModal(true) } className='funniture-clickable-element funniture-font-size-18 text-white'>
                            Login
                        </div>
                        <div className= 'ml-4 funniture-font-size-18'>
                            <Link to ='/Register' className ='text-white'>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* MODAL */}
            <Modal toggle={() => setModal(false)} isOpen={modal}>
            <ModalHeader className='d-flex justify-content-center'>Login</ModalHeader>
                        <ModalBody>
                            <div>
                                <h6>Email/Phone Number</h6>
                                <input type='text' className='form form-control' ref={inputEmail} />
                            </div>
                            <div className='mt-2'>
                                <h6>Password</h6>
                                <input 
                                    type={showPassword? 'text' : 'password'} className='form form-control' ref={inputPassword}  />                            
                                <div className ='d-flex justify-content-end'>
                                    <button 
                                        className='btn shadow-none mt-n3' 
                                        onClick={() => setShowPassword(!showPassword)} 
                                        style={{position: 'relative', bottom:'25px'}}>
                                        <FontAwesomeIcon icon={showPassword? faEyeSlash : faEye}  /> 
                                    </button>
                                </div>
                                <p className='text-danger mt-n3'>
                                    {
                                        user.message?
                                            user.message
                                        :
                                            null
                                    }
                                </p>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <input onClick={onLogin} type='button' value='Login' className='btn mt-3 text-white' style={{backgroundColor: '#695cff'}} />
                            </div>
                        </ModalBody>
                    <ModalFooter>
                            Forgot your password? Click <span className='funniture-clickable-element' onClick={()=> setModal(false)}><Link to='/forgot-password' >here</Link>  </span>
                    </ModalFooter>
            </Modal>
        </div>

    )
}

const mapDispatchToProps = {
    onUserLogin
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)