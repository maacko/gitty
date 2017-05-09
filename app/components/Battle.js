import React from 'react'

class UserInputForm extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            username: ''
        }

        this.changeUsername = this.changeUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeUsername (event) {

        var value = event.target.value;

        this.setState(function () {
            return {
                /* We can't use event.target.value here because this function is
                 * invoked much later. According to react docs, the event
                 * object, a Synthetic Event object, is pooled - meaning that
                 * event object is reused after the callback returns. So we
                 * can't use event.target.value in setState's callback and
                 * expect react to keep the value. We need to store it if intend
                 * to access the value asynchrnously.
                 */
                username: value
            }
        });
    }

    handleSubmit (event) {

        //have to prevent the form's default behavior of sending an http request
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username);
    }

    render () {

        return (
            <div className='user-input-form-container' onSubmit={this.handleSubmit}>
                <h1>{this.props.label}</h1>
                <form className='user-input-form'>
                    <input
                        type='text'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.changeUsername}
                    />
                    <button type='submit' label='submit' disabled={!this.state.username}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default class Battle extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            user1: '',
            user2: '',
            user1Avatar: null,
            user2Avatar: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*
     * handleSubmit is to be passed as callback for the form to use when the
     * user submits a username. The form should invoke the callback to update
     * the state with the submitted username and, as result, an avatar.
     */
    handleSubmit (id, username) {

        this.setState(function () {
            //We need to do this since we can't use variables as object
            //properties
            var newState = {}
            newState[id] = username;
            newState[id+'Avatar'] = 'don\'t know yet';

            return newState;
        });
    }

    render () {
        return (
            <div className='battle-container'>
                {!this.state.user1 ?
                    <UserInputForm
                        id='user1'
                        label='User 1'
                        onSubmit={this.handleSubmit}/> : <h1>Submitted</h1>}
                {!this.state.user2 ?
                    <UserInputForm
                        id='user2'
                        label='User 2'
                        onSubmit={this.handleSubmit}/> : <h1>Submitted</h1>}
            </div>
        );
    }
}
