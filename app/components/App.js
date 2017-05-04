import React from 'react'
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'
import Popular from './Popular'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import NotFound from './NotFound'

export default class App extends React.Component {
    render () {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/battle' component={Battle}/>
                        <Route path='/popular' component={Popular}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}
