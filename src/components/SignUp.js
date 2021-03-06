import React, { PureComponent } from 'react';
import { creatingUser } from '../redux/actionCreator'
import { withRouter } from "react-router";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'


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
      if(!this.props.currentUser){
          this.props.creatingUser(userInfo)
      }
  }



  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  render(){
    if (this.props.currentUser) {
      return <Redirect to="/feed" />;
    }
    return(
    <body id="signup">
      <div className="signup-background">
      <Segment id="signup-form">
        <Form
          onSubmit={()=>{this.handleSignUpSubmit()}}
        >
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
          <Button type="submit">Sign Up</Button>
        </Form>
          <Link to="/login">already a user? Sign in</Link>
      </Segment>
      </div>
    </body>
    )
  }
 }
 const mapStateToProps = (state) => {
     return{
         currentUser: state.currentUser
     }
 }

 const mapDispatchToProps = dispatch => {
     return {
         creatingUser: (userInfo) => {dispatch(creatingUser(userInfo))}

     }
 }


 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))
