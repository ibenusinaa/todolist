import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Register from './Pages/Register'
import Confirmation from './Pages/Confirmation'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import ForgotPasswword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import ToDoList from './Pages/ToDoList'

// import redux
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import allRedducer from './Redux/Reducers/index'

// import css
import './Supports/Stylsheets/Utils.css'
import './Supports/Stylsheets/LandingPage.css'
import './Supports/Stylsheets/Todolist.css'

const store = createStore(allRedducer, applyMiddleware(thunk))

const App = () => {
  return(
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/register' component={Register} />
        <Route path='/confirmation/:id/:pass/:value' component={Confirmation} />
        <Route path='/forgot-password' component={ForgotPasswword}/>
        <Route path='/reset-password/:emailJWT' component={ResetPassword}/>
        <Route path='/todolist' component={ToDoList} />
      </Switch>
      <Footer/>
      </BrowserRouter>
    </Provider>
  )
}

export default App


