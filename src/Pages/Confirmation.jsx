import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

const Confirmation = () => {
    // states
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [value, setValue] = useState(null)
    
    useEffect(()=> {
        setValue(params.value)
        if(value === 'false'){
            onConfirmation()
        }
    },[])

    // params
    const params = useParams()

    // Refs
    const inputCode = useRef(null)


    // functions
    const onConfirmationCode = () => {
        let dataToSend = {
            id: Number(params.id),
            activation_code: inputCode.current.value
        }

        axios.patch('http://localhost:4000/authentication-system/code-confirmation', {dataToSend})
        .then((res)=>  {
            console.log(res)
            setError(res.data.error)
            setMessage(res.data.message)
        })
        .catch((err) => {
            console.log(err.response)
            setError(err.response.data.error)
            setMessage(err.response.data.message)
        })
    }

    const onConfirmation = () => {
        console.log('masuk confirm')
        let dataToSend = {
            id: Number(params.id),
            password: params.pass
        }

        axios.patch('http://localhost:4000/authentication-system/confirmation', {dataToSend})
        .then((res) => {
            console.log(res)
            setError(res.data.error)
            setMessage(res.data.message)
        })
        .catch((err) => {            
            console.log(err)
            setError(err.response.data.error)
            setMessage(err.response.data.message)
        })
    }

    if(value === null){
        return(
            <div className='container'>
                <div className='d-flex justify-content-center'>
                    <div class="spinner-grow text-info mt-5" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <>
            {
                value === 'true'?
                    <div className="container">
                        <div className='d-flex justify-content-center'>
                            <div className="card mt-5" style={{width: 400}}>
                                <h5 className="card-header">Welcome to To-Do-List!</h5>
                                <div className="card-body row justify-content-center align-items-center">
                                    {
                                        error === false && message?
                                            <>
                                                <img src="https://i.ibb.co/B6vNft6/undraw-Completed-re-cisp.png" alt="undraw-Completed-re-cisp" border="0" style={{width: 300, height: 200}}/>
                                                <div className='col-12 d-flex justify-content-center'>
                                                    <h5 className="card-title">{message}</h5>
                                                </div>
                                                <div className = 'd-flex justify-content-center my-2'>
                                                    <input type='button' className='btn btn-info' value='Login'/>   
                                                </div>
                                            </>
                                        :
                                            <>
                                                <h5 className="card-title">Input your activation code</h5>
                                                <input type='text' ref={inputCode} className='form form-control mx-5 col-6' style={{width: 100}}/>
                                                <p className ='my-2 text-align-center text-danger'>{message}</p>
                                                <div className = 'col-12 d-flex justify-content-center my-2'>
                                                    <input type='button' onClick={onConfirmationCode} className='btn btn-info' value='Submit' style={{width: 80}}/>
                                                </div>

                                                
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    <div className="container">
                        <div className='d-flex justify-content-center'>
                            <div className="card mt-5" style={{width: 400}}>
                                <h5 className="card-header">Hello!</h5>
                                <div className='d-flex justify-content-center'>
                                    <img src="https://i.ibb.co/B6vNft6/undraw-Completed-re-cisp.png" alt="undraw-Completed-re-cisp" border="0" style={{width: 300, height: 200}}/>
                                </div>
                                <div className="card-body row align-items-center justify-content-center">
                                    <div className='col-12 d-flex justify-content-center'>
                                        <h5>{message}</h5>
                                    </div>
                                    <div className = 'my-2'>
                                        <input type='button' className='btn btn-info' value='Login'/>   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }    
            
           
        </> 
        
    )
}

export default Confirmation