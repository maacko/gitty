import React from 'react'

class Popular extends React.Component {

    render () {
        var languages = ['All','JavaScript', 'Python', 'Ruby', 'C++', 'Java'];

        return (
            <ul className='languages'>
                {languages.map(function (lang){
                    /* We set the lang as the unique key because no two popular
                     * languages will have the same name. This should resolve
                     * the console warning of not having a key.*/
                    return <li key={lang}>{lang}</li>;
                })}
            </ul>
        );
    }
}

export default Popular
