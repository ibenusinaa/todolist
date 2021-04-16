import React, { useRef, useState } from 'react'
import validator from 'validator'

// import redux
import { connect } from 'react-redux'
import {onUserSignUp} from './../Redux/Actions/userAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Register = ({onUserSignUp, user}) => {

    // refs
    const inputEmail = useRef(null)
    const inputPassword = useRef(null)
    const confirmPassword = useRef(null)

    // states
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showPass, setShowPass] = useState(true)
    const [showConfirm, setShowConfirm] = useState(true)

    // functions
    const onSignUp = () => {
        setLoading(true)

        let email = inputEmail.current.value
        let password = inputPassword.current.value
        let confirm = confirmPassword.current.value
        console.log(email, password, confirm)

        if(!email || !password){
            setError('Kamu belum mengisi semua data')
        }
        if(!(validator.isEmail(email))){
            setError('Email kamu tidak sesuai')
        }
        if(password.length < 6 ){
            setError('Password harus memiliki minimal 6 karakter')
        }
        if(password !== confirm){
            setError('Password kamu tidak sama!')
        }
        if(email && password && validator.isEmail(email) && password.length >= 6 && password === confirm){
            setError(null)
            onUserSignUp(email, password)
        }
    }    
    
 
    return(
        <>    
            <div style={{backgroundColor: '#F3EAFF'}}>
            <div className="container">
                <div className='d-flex justify-content-center'>
                    <div className="card my-5" style={{width: 450}}>
                        {
                            user.message === 'Registration Success! We have sent an email to your email address, please kindly check your email to confirm your account :)'?
                                <>
                                    <h5 className="card-header mx-3" style={{backgroundColor: 'white'}}>Verify your email address</h5>
                                    <div className="card-body mx-3">
                                        <div className='d-flex justify-content-center'>
                                            <img src="https://i.ibb.co/25hL37Z/undraw-Mail-sent-re-0ofv.png" alt="undraw-Mail-sent-re-0ofv" border="0" style={{width: 200, height: 150}} />
                                        </div>
                                        <h6 className='text-muted'>
                                            {user.message}
                                        </h6>
                                        <hr>
                                        </hr>
                                        <p className='text-center mb-n2'>
                                            Already signed up? Login here
                                        </p>
                                    </div>
                                </>
                            :
                                <>
                                    <h5 className="card-header mx-3" style={{backgroundColor: 'white'}}>Sign Up</h5>
                                    <div className="card-body mx-3">
                                        <h6>Email</h6>
                                        <input type='text' ref={inputEmail} className='form form-control'/>
                                        {/* pass */}
                                        <h6 className='my-2' >Password</h6>
                                        <input type={showPass? 'password' : 'text'} ref={inputPassword}  className='form form-control'/>
                                        <div className='d-flex justify-content-end mb-n4'>
                                            <button 
                                                className='btn shadow-none mt-n3' 
                                                onClick={() => setShowPass(!showPass)} 
                                                style={{position: 'relative', bottom:'23px'}}>
                                                <FontAwesomeIcon icon={showPass? faEye : faEyeSlash} /> 
                                            </button>
                                        </div>
                                        {/* confirm pass */}
                                        <h6 className='my-2'>Confirm your password</h6>
                                        <input type={showConfirm? 'password' : 'text'} ref={confirmPassword}  className='form form-control'/>
                                        <div className='d-flex justify-content-end mb-n4'>
                                            <button 
                                                className='btn shadow-none mt-n3' 
                                                onClick={() => setShowConfirm(!showConfirm)} 
                                                style={{position: 'relative', bottom:'23px'}}>
                                                <FontAwesomeIcon icon={showConfirm? faEye : faEyeSlash} /> 
                                            </button>
                                        </div>
            
                                        <input type ='button' disabled={user.loading} onClick={onSignUp} value={user.loading? 'Please Wait...' : 'Sign Up'} className='btn btn-info mt-4 form form-control' />
            
                                        <p className='text-center text-danger mt-3'>
                                            {error}  
                                        </p>
                                        <p className='text-center text-success mt-3'>
                                            {user.message}
                                        </p>
                                        <hr>
                                        </hr>
                                        <p className='text-center mb-n2'>
                                            Already signed up? Login here
                                        </p>
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

const mapDispatchToProps = {
    onUserSignUp
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)