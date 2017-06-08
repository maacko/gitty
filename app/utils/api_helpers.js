import axios from 'axios'

const getProfile = function (username) {

    var url = 'https://api.github.com/users/' + username;

    return axios.get(url).then(function (response) {
        //the data is an object, the object is filled with properties describing
        //the user
        return response.data;
    });
};

const getRepos = function (username) {

    var url = 'https://api.github.com/users/' + username + '/repos';

    return axios.get(url).then(function (response) {
        //the data is an array of repos, each repo is an object filled with
        //properties describing the repo
        return response.data;
    });
};

const starCount = function (repos) {
    return repos.reduce(function (count, repo) {
       return count + repo.stargazers_count;
    }, 0);
};

const getUserInfo = function (username) {

    return axios.all([
        getProfile(username),
        getRepos(username)
    ]).then(function (data) {

        var profile = data[0];
        var totalStars = starCount(data[1]);
        var score = calculateScore(profile.followers, totalStars);

        return {
            profile: profile,
            score: score,
        }
    });
};

const calculateScore = function (followers, stars) {
    return (3*followers)*stars;
}

const sortUsers = function (users) {

    return users.sort(function compare(a, b) {
        //b - a because we want to sort in decreasing order. Use a - b if we want
        //to sort in increasing order.
        return (b.score - a.score);
    });
}

const handleError = function (error) {

    console.warn(error);
    return null;
}

/* Note to self: The use of const isn't there to imply that APIHelpers is
 * immutable. Rather, it just a good habit to use const and let when using
 * ES2015+ syntax.
 */
const APIHelpers = {
    /* getPopularRepos takes in a selected language and returns a promise to
     * pass the popular repos to the callback we append to the callback chain.
     *
     * getPopularRepos uses axios to make HTTP requests asynchronously. Since
     * axios uses promises, we expect from getPopularRepos to return a promise
     * that promises to pass the extracted popular repos over to the callback we
     * add to the callback chain.
    */
    getPopularRepos (language) {
        var URI ='https://api.github.com/search/repositories?q=stars:>1+language:'+
            language+'&sort=stars&order=desc&type=repositories';
        var encodedURI = window.encodeURI(URI);

        return axios.get(encodedURI).then(function (response) {
            /* The response is an object. The data is held under the property
             * data of the response. The repo list is held under the property
             * items. The promise returns promises to send the return of this
             * callback to the next callback we place in the chain.
             */
            return response.data.items;
        });
    },
    /* battle takes in a list of user names and returns a Promise that promises,
     * if the get procedures are successful, to pass a sorted list of user
     * objects -- each containing the user's profile information and a calculated
     * score based on the number of followers and stars -- to the next callback
     * in the chain. Since battle returns a Promise, we can add another callback
     * to the chain to make use of the results. In the case that one of the
     * get operations fail, the error is propagated down the chain, caught
     * by the catch, and handled by handleError.
     */
    battle (usernames) {
        return axios.all(usernames.map(getUserInfo)).then(sortUsers)
            .catch(handleError);
    }
}

export default APIHelpers
