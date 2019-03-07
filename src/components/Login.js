import React, { PureComponent } from 'react';
import { withRouter } from "react-router";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { loggingInUser,loggingOut } from '../redux/actionCreator'

class LoginForm extends PureComponent {
  state = {
    username: "",
    password: ""
  };


  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };



    handleLoginSubmit = () => {
        let userInfo = {
            username: this.state.username,
            password: this.state.password,
        }
        if(!this.props.currentUser){
            this.props.loggingInUser(userInfo)
        }else{
          this.props.logOut()
          localStorage.clear()
        }
    }

  render(props) {
    return(
      <body id="login">
      <div className="login-background">
      {!this.props.currentUser?
      <Segment id="login-form">
        <Form
          onSubmit={()=>{this.handleLoginSubmit()}}
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
          <Button type="submit">Login</Button>
        </Form>
        <Link to="/signup">Not a user? Sign up!</Link>
      </Segment>:<Button id="sign-out" color='red' onClick={()=>{this.handleLoginSubmit()}}>Sign Out</Button>}
      </div>
      </body>
    );
  }
}

const mapStateToProps = (state) => {
    return{
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loggingInUser: (userInfo) => {dispatch(loggingInUser(userInfo))},
        logOut: () => {dispatch(loggingOut())}
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
