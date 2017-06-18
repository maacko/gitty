import React from 'react'
import PropTypes from 'prop-types'

/*Loading's self-contained style*/
const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
}
/*
 * Loading is a highly reusable object. It's style is self-contained and the
 * component has no dependencies to any application. It's intended to be used
 * anywhere an async request occurs, but it can be used anywhere a load occurs.
 * The interval function that causes the animation to occur stops when the
 * component unmounts.
 */
export default class Loading extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            loading_msg: props.message,
            time: props.time
        };
    }

    componentDidMount () {

        var stopper = this.props.message + '...';

        //the interval object is stored as a property of the component because
        //we'll need to reference it once componentWillUnmount is called (when
        //the component is unmounted from the DOM). We need to call
        //clearInterval on the interval object to stop it from periodically
        //calling its callback.
        this.interval = window.setInterval(function () {

            if (this.state.loading_msg === stopper) {
                this.setState(function () {
                    return {loading_msg: this.props.message};
                });
            }
            else {
                this.setState(function (prevState) {
                    return {
                        loading_msg: prevState.loading_msg + '.'
                    };
                });
            }

        }.bind(this), this.props.time);

    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render () {
        return (
            <div>
                <h1 style={styles.content}>{this.state.loading_msg}</h1>
            </div>
        );
    }

}

Loading.defaultProps = {
    message: 'Loading',
    time: 300
};

Loading.propTypes = {
    message: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
}
