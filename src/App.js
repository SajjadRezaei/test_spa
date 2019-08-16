import React, { Component } from 'react';
import Header from "./components/sections/Header";
import { Route , Switch } from "react-router-dom";
import './styles/css/bootstrap.min.css';
import './styles/css/bootstrap-rtl.min.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import UserPanel from "./pages/Userpanel";
import axios from "axios";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated : true
        }
    }
    componentDidMount() {
        let apiToken = localStorage.getItem('api_token');
        if(apiToken !== null) {
            axios.get(`http://roocket.org/api/user?api_token=${apiToken}`)
                .then(response => {
                    this.setState({ isAuthenticated: true})
                })
                .catch(error => {
                    this.setState({ isAuthenticated: false})
                })
        } else {
            this.setState({ isAuthenticated: false})
        }
    }

    handleLogout() {
        localStorage.removeItem('api_token');
        this.setState({ isAuthenticated : false});
    }

    handleLogin() {
        this.setState({ isAuthenticated : true});
    }


    render() {
        return (
            <div>
                <Header auth={this.state.isAuthenticated} />
                <div className="container">
                    <div style={{ paddingTop : 70 }}>
                        <Switch>
                            <Route path="/" exact={true} component={Home}/>
                            <Route path="/product/:id" component={Product}/>
                            <Route path="/about" component={About}/>
                            <Route path="/contact" component={Contact}/>

                            <Route path="/login" render={(props) => <Login {...props} auth={this.state.isAuthenticated} login={this.handleLogin.bind(this)}/>}/>
                            <PrivateRoute component={UserPanel} path={'/user-panel'} auth={this.state.isAuthenticated}/>

                            <Route component={NoMatch}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
