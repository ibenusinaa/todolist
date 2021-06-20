import React, { useRef, useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

// redux
import { onUserLogin } from '../Redux/Actions/userAction'

const LandingPage = ({user}) => {

    // refs
    const inputEmail = useRef(null)
    const inputPassword = useRef(null)

    // states
    const [modal, setModal] = useState({
        modal: false,
        error: null
    })
    const [showPassword, setShowPassword] = useState(null)

    // functions
    const onLogin = () => {
        console.log('masuk login')
        console.log(inputEmail.current.value, inputPassword.current.value)
        if(!inputEmail.current.value || !inputPassword.current.value) return setModal({...modal, error: 'Email dan password harus diisi'})
        let dataToSend = {
            email: inputEmail.current.value,
            password: inputPassword.current.value
        }

        onUserLogin(dataToSend)

    }

    return(
        <div className='d-flex jumbotron-landing-page'>
            <div className="container" style={{position: 'relative'}}>
                    <div className='header-primary-todolist'>
                        <p className='my-5' style={{fontSize: '40px', fontWeight: 600}}>
                            Organize your work with <br></br>
                            To-Do-List!
                        </p>
                    </div>
                    <div className='header-secondary-todolist' style={{position: 'absolute', bottom: '4rem', right: '.5rem'}}>
                        <div className='d-flex justify-content-end align-items-end'>
                            <h1>
                                Accomplish More Everyday
                            </h1>
                        </div>
                        <div className='d-flex justify-content-end align-items-end mt-2'>
                            {
                                user.email?
                                    <Link to ='/todolist'>
                                        <button className='btn button-get-started'>
                                            Get Started
                                        </button>
                                    </Link>
                                :
                                    <button onClick={() => setModal({...modal, modal: true})} className='btn button-get-started'>
                                        Get Started
                                    </button>
                            }

                            <button className='btn btn-outline-dark' style={{fontSize: 20}}>
                                Download
                            </button>
                        </div>
                    </div>
                
            </div>
            {/* MODAL */}
            <Modal toggle={() => setModal({modal: false, error:null})} isOpen={modal.modal}>
            <ModalHeader className='d-flex justify-content-center'>Login</ModalHeader>
                        <ModalBody>
                            <div>
                                <h6>Email/Phone Number</h6>
                                <input type='text' className='form form-control' ref={inputEmail} onKeyPress={(e) => {if(e.key === 'Enter') onLogin()}} />
                            </div>
                            <div className='mt-2'>
                                <h6>Password</h6>
                                <input 
                                    type={showPassword? 'text' : 'password'} className='form form-control' ref={inputPassword} onKeyPress={(e) => {if(e.key === 'Enter') onLogin()}}  />                            
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
                                    {
                                        modal.error?
                                            modal.error
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
                            Forgot your password? Click <span className='funniture-clickable-element' onClick={()=> setModal({modal: false})}><Link to='/forgot-password' >here</Link>  </span>
                    </ModalFooter>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    onUserLogin
}

export default connect(mapStateToProps, '')(LandingPage)