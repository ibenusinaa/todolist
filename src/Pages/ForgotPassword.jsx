import axios from 'axios'
import React, { useRef, useState } from 'react'
import validator from 'validator'

const ForgotPasswword = () => {
    // states
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [done, setDone] = useState(null)
    // refs
    const inputEmail = useRef(null)

    // functions
    const onSubmitEmail = () =>{
        let email = inputEmail.current.value

        if(validator.isEmail(email)){
            axios.patch('http://localhost:4000/authentication-system/forgot-password', {email: email})
            .then((res) => {
                console.log(res)
                setError(res.data.error)
                setMessage(res.data.message)
                setDone(true)
                
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return(
        <>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="card mt-5 shadow-sm" style={{width: '22rem'}}>
                        <div className="card-body">
                            <div className='d-flex justify-content-center'>
                            <img src={done? "https://i.ibb.co/rGtNFtB/undraw-Envelope-re-f5j4.png" : "https://i.ibb.co/fkP7gm9/undraw-searching-p5ux.png" } alt="undraw-searching-p5ux" style={{width: 200, height: 150}} />
                            </div>
                            <h5 className="card-title">Trouble Logging In?</h5>
                            {
                                error === false && message?
                                    <p className='text-muted'>{message}</p>
                                :
                                    <>
                                        <h6>Enter your email here and we'll send you a link to reset your password</h6>
                                        <h6 className="card-subtitle mb-2 text-muted mt-3">Email</h6>
                                        <input type='text' ref={inputEmail} className='form form-control' />
                                        <p className='mt-2 text-danger'>{message}</p>
                                        <div className='d-flex mt-4'>
                                            <button onClick={onSubmitEmail} className='btn btn-info'>
                                                Reset Password
                                            </button>
                                        </div>
                                    </>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswword