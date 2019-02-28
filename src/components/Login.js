import React, { PureComponent } from 'react';
import { withRouter } from "react-router";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import {connect} from 'react-redux'
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
      <div>
      {!this.props.currentUser?
      <Segment className="login-form">
        <Form
          onSubmit={()=>{this.handleLoginSubmit()}}
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
          <Button type="submit">Login</Button>
        </Form>
      </Segment>:<button onClick={()=>{this.handleLoginSubmit()}}>Sign Out</button>}
      </div>
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
