import axios from 'axios'

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
    }
}

export default APIHelpers
