import React, { Component } from "react";
import "../styles/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      log_email: "",
      log_password: "",
      tooltip_msg: ""
    };
  };

  submitLogin = async (event) => {
    event.preventDefault();
    console.log("Client: Submitted Login");

    const response = await fetch("http://localhost:3000/login_submit", {
      method: "POST",
      headers: {"Content-Type":"application/json", 'Accept': 'application/json'},
      body: JSON.stringify({log_email: this.state.log_email.toLowerCase(), log_password: this.state.log_password})
    });

    const data = await response.json();
    console.log("Server response:", data);

    //Check server response
    if(data.type === 'successful_login') {
      //If login validation is true: login user and load user
      this.setState({
        tooltip_msg: data.message
      })
      this.props.loadUser({id: data.id, username: data.username, email: data.email, joined: data.joined, num_login: data.num_login});
    }

    if(data.type === 'failed_login') {
      this.setState({
        tooltip_msg: data.message
      })
    }

    //Reset input fields after form submission
    this.setState({
      log_email: '',
      log_password: ''
    });
  };

  handleChange = (event) => {
    const id = event.target.id;
    this.setState({
      [id]: event.target.value
    })
  };

  componentDidUpdate(prevProps) {
    if(prevProps.logged_in !== this.props.logged_in){
      if(!this.props.logged_in) {
        this.updateTooltip();
      }
    }
  };

  updateTooltip = () => {
    this.setState({tooltip_msg: this.props.tooltip_msg})
  };

  render() {
    return (
      <div>
        <form id="login_form" onSubmit={this.submitLogin}>
          <fieldset>
            <legend>Login</legend>
            <div className="login_container">
              <input type="text" name="log_email" id="log_email" placeholder="email" value={this.state.log_email} onChange={this.handleChange} required={true}/>
              <input type="text" name="log_password" id="log_password" placeholder="password" value={this.state.log_password} onChange={this.handleChange} required={true}/>
              <input type="submit" value="Submit"/>
            </div>
          </fieldset>
        </form>
        <div id ='login_tooltip'>
          {this.state.tooltip_msg ? <p>{this.state.tooltip_msg}</p> : null}
        </div>
      </div>
    )
  };
};

export default Login;