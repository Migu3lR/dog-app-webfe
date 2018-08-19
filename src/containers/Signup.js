import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Auth } from "aws-amplify";
import { connect } from 'react-redux';

//import { authValidation, errorAuthenticating, isAuthenticated } from '../actions/authenticate';
import { handleSignup, handleConfirmation, handleChange } from '../actions/register';

import LoaderButton from "../components/LoaderButton";
import "./Signup.css";


class Signup extends Component {
  validateForm() {
    return (
      this.props.signup.form.email.length > 0 &&
      this.props.signup.form.password.length > 0 &&
      this.props.signup.form.password === this.props.signup.form.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.props.signup.form.confirmationCode.length > 0;
  }

/*  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
        const newUser = await Auth.signUp({
            username: this.state.email,
            password: this.state.password
        });
        this.setState({ newUser });
    } catch (e) {
        alert(e.message);
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
        await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
        await Auth.signIn(this.state.email, this.state.password);

        this.props.userHasAuthenticated(true);
        this.props.history.push("/");
    } catch (e) {
        alert(e.message);
        this.setState({ isLoading: false });
    }
  }
  */

  renderConfirmationForm() {
    return (
      <form onSubmit={this.props.handleConfirmation}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.props.signup.form.confirmationCode}
            onChange={this.props.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.props.signup.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.props.handleSignup}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.props.signup.form.email}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.props.signup.form.password}
            onChange={this.props.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.props.signup.form.confirmPassword}
            onChange={this.props.handleChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.props.signup.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.props.signup.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}

const mapStateToProps = (state = {}) => { return { ...state } }

const MapDispatchToProps = (dispatch) => {
  return {
    handleSignup: (credentials) => dispatch(handleSignup(credentials)),
    handleConfirmation: (credentials) => dispatch(handleConfirmation(credentials)),
    handleChange: (credentials) => dispatch(handleChange(credentials))
  }
}

export default connect(mapStateToProps, MapDispatchToProps)(Signup);