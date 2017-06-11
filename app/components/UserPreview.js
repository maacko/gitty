import React from 'react'
import PropTypes from 'prop-types'

export default function UserPreview (props) {

        return (
            <div className='user-preview-container'>
                <img
                    className='avatar'
                    src={props.avatar}
                    alt={props.username + 's user name'}/>
                <h1>@{props.username}</h1>
                {props.children}
            </div>
        )
}

UserPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}
