import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router'

const ResetPassword = () => {
    // states
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [showPass, setShowPass] = useState(true)
    const [showConfirm, setShowConfirm] = useState(true)

    // refs
    const inputPassword = useRef(null)
    const confirmPassword = useRef(null)

    // params
    const params = useParams()

    // functions
    const onSubmitPassword = () => {
        let password = inputPassword.current.value
        let confirm = confirmPassword.current.value

        if(password !== confirm){
            setError('Password yang kamu masukkan tidak sama')
        }else if(password.length < 6){
            setError('Panjang password minimal 6 karakter')
        }else{
            let dataToSend = {
                email: params.emailJWT,
                password: password
            }
            axios.patch('http://localhost:4000/authentication-system/reset-password', dataToSend)
            .then((res) => {
                console.log(res)
                setError(res.data.error)
                setMessage(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return(
        <>
            <div className="container">
                <div className="d-flex justify-content-center p-5">
                    <div className="card shadow-sm" style={{width: 620}}>
                        <div className="card-body row mb-3" style={{marginTop: 30}}>
                            <h5 className="card-title col-12 mt-n3">Set New Password</h5>
                            
                                {
                                    error === false && message?
                                        <>  
                                            <div className='col-12 d-flex justify-content-center'>
                                                <img src="https://i.ibb.co/Gcst1fx/undraw-secure-login-pdn4.png" alt="undraw-secure-login-pdn4" style={{width: 300, height: 200}}/>
                                            </div>
                                            <div className='col-12 d-flex justify-content-center'>
                                                <p className='text-success'>{message}</p>
                                            </div>
                                        </>

                                    :
                                        <>
                                            <div className='col-7'>
                                                <h6 className="card-subtitle mb-2 text-muted mt-3">New Password</h6>
                                                <input type={showPass? 'password': 'text'} ref={inputPassword} className='form form-control' onKeyPress={(e) => {if(e.key === 'Enter') onSubmitPassword()}} />
                                                <div className='d-flex justify-content-end mb-n4'>
                                                    <button 
                                                        className='btn shadow-none mt-n3' 
                                                        onClick={() => setShowPass(!showPass)} 
                                                        style={{position: 'relative', bottom:'23px'}}>
                                                        <FontAwesomeIcon icon={showPass? faEye : faEyeSlash} /> 
                                                    </button>
                                                </div>
                                                <h6 className="card-subtitle mb-2 text-muted mt-3">Confirm New Password</h6>
                                                <input type={showConfirm? 'password' : 'text'} ref={confirmPassword} className='form form-control' onKeyPress={(e) => {if(e.key === 'Enter') onSubmitPassword()}} />
                                                <div className='d-flex justify-content-end mb-n4'>
                                                    <button 
                                                        className='btn shadow-none mt-n3' 
                                                        onClick={() => setShowConfirm(!showConfirm)} 
                                                        style={{position: 'relative', bottom:'23px'}}>
                                                        <FontAwesomeIcon icon={showConfirm? faEye : faEyeSlash} /> 
                                                    </button>
                                                </div>
                                                <p className='text-danger mt-2'>{error}</p>
                                                <div className='d-flex mt-4'>
                                                    <input type='button' onClick={onSubmitPassword} className='btn btn-info' value='Set Password'/>
                                                </div>
                                            </div>
                                        </>
                                }

                            
                            {
                                error === false && message?
                                    null
                                :
                                    <div className="col-5 mt-3">
                                        <h6 className='text-muted'>
                                            Password must contain:
                                            <p className='mt-1'>
                                                - At least 6 characters
                                            </p>
                                            <p className='mt-n3'>
                                                - At least 1 upper case letter
                                            </p>
                                        </h6>
                                    </div>
                            }

                           
                                    
                                
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword