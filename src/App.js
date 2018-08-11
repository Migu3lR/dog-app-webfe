import React, { Component, Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth, PubSub } from "aws-amplify";

import { connect } from 'react-redux';
import { authValidation } from './actions/authenticate';

import { attachIotPolicy } from "./libs/awsMqtt";

import './App.css';
import Routes from "./Routes";

class App extends Component {
  async componentDidMount() {
    await attachIotPolicy();

    const credentials = await Auth.currentSession();
    this.props.authValidation(credentials);

    /*try {      
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });*/
  }

  IOTSubs = async () => {
    await attachIotPolicy();
    
    PubSub.subscribe(`/redux/${PubSub._pluggables[0].clientId}`).subscribe({
      next: (data) => {
        console.log('Message received', data);
      },
      error: error => console.error(error),
      close: () => console.log('Done'),
    })
  }

  /*userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }*/

  handleLogout = async event => {
    await Auth.signOut();
    this.props.logout();
    
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.props.isAuthenticated,
      userHasAuthenticated: this.props.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Dogs</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    isAuthenticating: state.isAuthenticating
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    authValidation: (credentials) => dispatch(authValidation(credentials)),
    logout: () => dispatch(isAuthenticated(false))
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(App));
