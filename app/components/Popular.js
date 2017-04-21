import React from 'react'
import PropTypes from 'prop-types'
import APIHelpers from '../utils/api_helpers'

class LanguageBar extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        var languages = ['All','JavaScript', 'Python', 'Ruby', 'C++', 'Java'];

        return (
            <ul className='languages'>
                {languages.map(function (lang) {

                    var color = null;
                    if (this.props.selectedLanguage === lang)
                        color = {color: 'crimson'};

                    /* We set the lang as the unique key because no two popular
                     * languages will have the same name. This should resolve
                     * the console warning of not having a key.
                     *
                     * Note: onClick needs to be assigned a function. Don't make
                     * the mistake of doing this: this.updateLanguage(lang).
                     * This invokes the function and assigns onClick the result.
                     * Duh!
                     */
                    return (
                        <li key={lang}
                        onClick={this.props.onSelect.bind(null, lang)}
                        style={color}>{lang}</li>
                    )
                }, this)}
            </ul>
        );
    }
}

LanguageBar.PropTypes = {
    selectedLanguages: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

function RepoGrid (props) {
    return (
        <ul className='popular-list'>
            {props.repos.map(function (repo, index) {
                return (
                    <li key={repo.name} className='popular-item'>
                        <ul className='space-list-item'>
                            <li className='item-rank'>
                                <div>{index+1}</div>
                            </li>
                            <li>
                                <img className='avatar'
                                     src={repo.owner.avatar_url}/>
                            </li>
                            <li>
                                <a href={repo.html_url}>{repo.name}</a>
                            </li>
                            <li>
                                <a href={repo.html_url}>@{repo.owner.login}</a>
                            </li>
                            <li>
                                {repo.stargazers_count} stars
                            </li>
                        </ul>
                    </li>
                )
             })
            }
        </ul>
    )
}

RepoGrid.PropTypes = {
    repos: PropTypes.array.isRequired
}


class Popular extends React.Component {

    constructor (props) {
        /*
         * Since Popular inherits from Component, then it can call on its
         * parent constructor using super(). Here we pass on props, passed into
         * Popular's constructor, to Components constructor. Popular inherits
         * props from Component, so we can instantiate them using the parent's
         * constructor.
         */
        super(props);

        //the initial state
        this.state = {
            currentLanguage: 'All',
            repos: null
        };

        //We immediately bind updateLanguage to this instance so that we may
        //pass it on as an event handler.
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    /* Don't be fooled by the sugar. In reality, this amounts to
     * this.updateLanguage = function (lang) {...}; updateLanguage is a
     * property of this instance.
     *
     * updateLanguage makes changes to the state of the app, that is, changes to
     * the selected language and the repository data associated with it. It uses
     * the helper module APIHelper to make AJAX request to the GitHub API. The
     * result that this module returns is the repositories associated with the
     * given language. This data is then used to update the state of the app.
     */
    updateLanguage (lang) {
        this.setState(function () {
            return {
                currentLanguage: lang,
                /* Reset to null, this causes loading to appear while fetch
                 * finishes. Otherwise, on selecting a new language, the previous
                 * repositories stay on screen until fetch completes (gives the
                 * impression of some latency).
                 */
                repos: null
            };
        });

        APIHelpers.getPopularRepos(lang).then(function (repos) {
            this.setState(function () {
                return {
                    repos: repos
                }
            });
        }.bind(this));
    }
    /* When our app initially loads -- when the component is initially mounted
     * onto the DOM --, the page is displayed with the repos as null. This
     * should be expected since we set the initial state, in the constructor,
     * for the repos as null. However, the page loads with the 'ALL' selected.
     * To have the page select something and not have data load, that's a bad
     * look. We remedy this by calling updateLanguage here, in
     * componentDidMount, to update the state for us and cause a re-render of
     * the app with the data filled into the page. componentDidMount is a
     * lifecycle method that is invoked after the component is mounted on the
     * DOM. The result of this is an initial load with null on the page,
     * followed a re-render of the page, now populated with repos. The null
     * load is remedied in the render function -- it checks if the repos state
     * is null, and if so, it places a LOADING message instead of passing the
     * null state to the RepoGrid component.
     */
    componentDidMount() {
        this.updateLanguage(this.state.currentLanguage);
    }

    render () {
        return (
            <div>
                <LanguageBar selectedLanguage={this.state.currentLanguage}
                             onSelect={this.updateLanguage}/>
                 {this.state.repos === null ? (<p>LOADING</p>) :
                         (<RepoGrid repos={this.state.repos}/>)}
            </div>
        )
    }
}

export default Popular
