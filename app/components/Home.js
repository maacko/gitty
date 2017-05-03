import React from 'react'
import {Link} from 'react-router-dom'

export default function Home (props) {
    return (
        <div id='home-container'>
            <h1>Gitty</h1>
            <h2>a code ditty about github</h2>
            <Link className='button' to='/battle'>Let's Go!</Link>
        </div>
    )
}
