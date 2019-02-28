import React, { PureComponent } from 'react';
import { withRouter } from "react-router";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import {connect} from 'react-redux'
import { loggingInUser,loggingOut } from '../redux/actionCreator'
class SignUp extends PureComponent {
  state = {
    username: "",
    password: "",
    checked: false
  };

  handleSignUpSubmit = () => {
      let userInfo = {
          username: this.state.username,
          password: this.state.password,
      }
    console.log(userInfo)
  }


  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  render(){
    return(
      <div>
      <Segment className="login-form">
        <Form
          onSubmit={()=>{this.handleSignUpSubmit()}}
          size="mini"
          key="mini"
        >
          <Form.Group widths="equal">
            <Form.Input
              label="username"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <Form.Input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Sign Up</Button>
        </Form>
      </Segment>
      </div>

    )
  }
 }

 export default SignUp
