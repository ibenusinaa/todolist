import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return(
        <div className='d-flex jumbotron-landing-page'>
            <div className="container" style={{height: '100vh'}}>
                    <div>
                        <p className='my-5' style={{fontSize: '40px', fontWeight: 600}}>
                            Organize your work with <br></br>
                            To-Do-List!
                        </p>
                    </div>
                    <div className='d-flex justify-content-end align-items-end' style={{height: '55vh'}}>
                        <h1>
                            Accomplish More Everyday
                        </h1>
                    </div>
                    <div className='d-flex justify-content-end align-items-end mt-2'>
                        <Link to ='/todolist'>
                            <button className='btn btn-info mr-3' style={{fontSize: 20}}>
                                Get Started
                            </button>
                        </Link>
                        <button className='btn btn-outline-dark' style={{fontSize: 20}}>
                            Download
                        </button>
                    </div>
                
            </div>
        </div>
    )
}

export default LandingPage