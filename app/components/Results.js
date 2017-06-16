import React from 'react'
import {Link} from 'react-router-dom'
import QueryString from 'query-string'

import APIHelpers from '../utils/api_helpers'
import UserPreview from './UserPreview'

/* Note: If you render Player before the Promise has resolved (before there is a
 * response to the get request), then you'll end up using the initial state of
 * null and trying to access properties like score on null. It took me a bit of
 * time to figure that out. That's why you need loading in the state to tell if
 * there is a response.
 */
function Player (props) {

    return (
        <div className='player-container'>
            <h1>{props.title}</h1>
            <h3>{props.score}</h3>
            <Profile profile={props.profile}/>
        </div>
    );
}

function Profile (props) {

    var info = props.profile;

    return (
        <div className='profile-container'>
            <UserPreview
                username={info.login}
                avatar={info.avatar_url}
            />
            <div className='stats'>
                <ul>
                    {info.name && <li>{info.name}</li>}
                    {info.location && <li>{info.location}</li>}
                    {info.company && <li>{info.company}</li>}
                    <li>Followers: {info.followers}</li>
                    <li>Following: {info.following}</li>
                    {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
                </ul>
            </div>
        </div>
    );
}

export default class Results extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            winner: null,
            loser: null,
            loading: true,
            error: null
        };
    }

    componentDidMount () {
        //grab the usernames from the query in the url
        var usernames = QueryString.parse(this.props.location.search);

        APIHelpers.battle([usernames.username1, usernames.username2])
            .then(function (sortedUsers) {

                if (sortedUsers === null){
                    this.setState(function () {
                        var error_msg = 'Looks like there was an error! ' +
                                        'Check that both users exist on GitHub.';
                        return {
                            winner: null,
                            loser: null,
                            loading: false,
                            error: error_msg
                        }
                    });
                }
                else {
                    this.setState(function () {
                        return {
                            winner: sortedUsers[0],
                            loser: sortedUsers[1],
                            loading: false
                        }
                    });
                }
            }.bind(this));
    }

    render () {

        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading = this.state.loading;
        var error = this.state.error;

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to="/battle">Restart</Link>
                </div>
            )
        }

        if (loading === false) {
            return (
                <div className='results-container'>
                    <Player title="Winner"
                            profile={winner.profile}
                            score={winner.score}/>
                    <Player title="Loser"
                            profile={loser.profile}
                            score={loser.score}/>
                </div>
            )
        }
        else {
                return (<p>Loading</p>);
        }
    }
}
