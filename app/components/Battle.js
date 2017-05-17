import React from 'react'
import {Link} from 'react-router-dom'

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
                <form className='user-input-form' onSubmit={this.handleSubmit}>
                    <label className='user-input-header' htmlFor='username'>
                        <i className='fa fa-github user-icon' aria-hidden='true'>
                           {this.props.id === 'user1' ?
                               <p id={this.props.id}>1</p> :
                               <p id={this.props.id}>2</p>}
                        </i>
                    </label>
                    <input
                        id='username'
                        type='text'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.changeUsername}
                        autoComplete='off'
                    />
                    <button
                        className='button'
                        type='submit'
                        label='submit'
                        disabled={!this.state.username}>

                        Submit
                    </button>
                </form>
        );
    }
}

class UserPreview extends React.Component {

    constructor(props) {

        super(props);
    }

    render () {
        return (
            <div className='user-preview-container'>
                <img
                    className='avatar'
                    src={this.props.avatar}
                    alt={this.props.username + 's user name'}/>
                <h1>@{this.props.username}</h1>
                <button
                    className='reset'
                    onClick={this.props.handleReset.bind(null,
                        this.props.id)}>
                    Reset
                </button>
            </div>
        )
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
        this.reset = this.reset.bind(this);
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
            var newState = {};
            newState[id] = username;
            newState[id+'Avatar'] = 'https://www.github.com/' +
                username + '.png';

            return newState;
        });
    }

    reset(id) {

        this.setState(function () {
            var newState = {};
            newState[id] = '';
            newState[id+'Avatar'] = null;

            return newState;
        });
    }

    render () {

        var user1 = this.state.user1;
        var user2 = this.state.user2;
        var user1Avatar = this.state.user1Avatar;
        var user2Avatar = this.state.user2Avatar;


        return (
            <div className='battle-container'>
                {!user1 ?
                    <UserInputForm
                        id='user1'
                        label='User 1'
                        onSubmit={this.handleSubmit}/> :
                    <UserPreview
                        avatar={user1Avatar}
                        username={user1}
                        handleReset={this.reset}
                        id='user1'
                    />
                }

                {user1 && user2 &&
                    <Link
                        className='button'
                        to={{
                            pathname: this.props.match.url + '/results/',
                            search: '?username1=' + user1 + '&username2=' +
                                    user2
                        }}>
                        Battle!
                    </Link>
                }

                {!user2 ?
                    <UserInputForm
                        id='user2'
                        label='User 2'
                        onSubmit={this.handleSubmit}/> :
                    <UserPreview
                        avatar={user2Avatar}
                        username={user2}
                        handleReset={this.reset}
                        id='user2'
                    />
                }
            </div>

        );
    }
}
