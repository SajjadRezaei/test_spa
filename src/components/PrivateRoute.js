import React, { Component } from 'react';
import PropTyps from 'prop-types';
import {Redirect, Route} from "react-router-dom";

class PrivateRoute extends Component {
    static propTypes = {
        component : PropTyps.func.isRequired,
        path : PropTyps.string.isRequired
    };

    render() {
        const { component : Component , auth : isAuthenticated  ,...restProps } = this.props;
        return <Route {...restProps} render={(props) => (
            isAuthenticated ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ pathname : '/login' , state : { from : props.location} }}/>
            )
        )} />
    }
}

export default PrivateRoute;