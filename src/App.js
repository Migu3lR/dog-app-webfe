import React, { Component, Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

import { connect } from 'react-redux';
import { authValidation, errorAuthenticating, isAuthenticated } from './actions/authenticate';

import { attachIotPolicy } from "./libs/awsMqtt";

import './App.css';
import Routes from "./Routes";

class App extends Component {
  async componentDidMount() {
    await attachIotPolicy();

    try {   
      const credentials = await Auth.currentSession();
      this.props.authValidation(credentials);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      } else {
        this.props.errorAuthenticating();
      }
    }
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
      isAuthenticated: this.props.isAuthenticated
      //,userHasAuthenticated: this.props.userHasAuthenticated
    };

    return (
      !this.props.isAuthenticating &&
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
              {this.props.isAuthenticated
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

const mapStateToProps = (state = {}) => {
  return {
    ...state
    /*isAuthenticated: state.isAuthenticated,
    isAuthenticating: state.isAuthenticating*/
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    authValidation: (credentials) => dispatch(authValidation(credentials)),
    errorAuthenticating: () => dispatch(errorAuthenticating()),
    logout: () => dispatch(isAuthenticated(false))
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(App));
