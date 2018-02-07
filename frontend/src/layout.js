import React, { Component } from 'react';
import { HashRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import Login from './login';
import "./index.scss";
import ContactosList from './contactos/list';
var auth = require('./auth')


class Logout extends Component{
    componentDidMount(){
        auth.logout()
    }
    render(){
        return(
                <Redirect to={{
                    pathname: '/login',
                    state: { from: this.props.location }
                  }}/>
        )
    }
}


class MainLayout extends Component{
  render() {
    return (
        <Router>
            <div>
                <main>
                    <PrivateRoute exact path="/" component={ContactosList}/>
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                </main>
            </div>
        </Router>
    );
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.loggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default MainLayout;
