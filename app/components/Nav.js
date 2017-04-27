import React from 'react'
import {Link, NavLink} from 'react-router-dom'

export default function Nav (props) {
    return (
        <nav className='main-nav'>
            <ul id='top-nav'>
                <li>
                    <NavLink exact to='/' activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/battle' activeClassName='active'>
                        Battle
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/popular' activeClassName='active'>
                        Popular
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
