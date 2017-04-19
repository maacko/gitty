import React from 'react'

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
            currentLanguage: 'All'
        };

        //We immediately bind updateLanguage to this instance so that we may
        //pass it on as an event handler.
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    /* Don't be fooled by the sugar. In reality, this amounts to
     * this.updateLanguage = function (lang) {...}; updateLanguage is a
     * property of this instance.
     */
    updateLanguage (lang) {
        this.setState(function () {
            return {
                currentLanguage: lang
            };
        });
    }

    render () {
        var languages = ['All','JavaScript', 'Python', 'Ruby', 'C++', 'Java'];

        return (
            <ul className='languages'>
                {languages.map(function (lang) {

                    var color = null;
                    if (this.state.currentLanguage === lang)
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
                        onClick={this.updateLanguage.bind(null, lang)}
                        style={color}>{lang}</li>
                    )
                }, this)}
            </ul>
        );
    }
}

export default Popular
