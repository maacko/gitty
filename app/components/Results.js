import React from 'react'
import {Link} from 'react-router-dom'
import QueryString from 'query-string'

import APIHelpers from '../utils/api_helpers'

/* Note: If you render Player before the Promise has resolved (before there is a
 * response to the get request), then you'll end up using the initial state of
 * null and trying to access properties like score on null. It took me a bit of
 * time to figure that out. That's why you need loading in the state to tell if
 * there is a response.
 */
function Player (props) {

    var info = props.profile;

    return (
        <div>
            <h1>{props.title}</h1>
            <h3>{info.score}</h3>
            <p>{JSON.stringify(props.profile)}</p>
            <div>
                <ul>
                    <li>STATS WILL GO HERE</li>
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
                <div>
                    <Player title="Winner" profile={winner}/>
                    <Player title="Loser" profile={loser}/>
                </div>
            )
        }
        else {
                return (<p>Loading</p>);
        }
    }
}
