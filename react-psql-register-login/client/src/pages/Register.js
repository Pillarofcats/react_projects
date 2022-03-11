import React, {Component} from "react";
import "../styles/Register.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      reg_password: '',
      tooltip_msg: ''
    };
  }

  submitRegistration = async (event) => {
    event.preventDefault();
    console.log("Client: Submitted Registration");
    
    const response = await fetch("http://localhost:3000/register_submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
      body: JSON.stringify({username: this.state.username, email: this.state.email.toLowerCase(), reg_password: this.state.reg_password})
    });

    //Server response data
    const data = await response.json();
    
    //Check response data type from server
    if(data.type === 'email_in_use') {
      this.setState({tooltip_msg: data.message});
    } 

    if(data.type === 'register_success') {
      this.setState({tooltip_msg: data.message});
    } 

    //Reset input fields after form submission
    this.setState({username: '', email: '', reg_password: ''});
  };

  handleChange = (event) => {
    const id = event.target.id;
    this.setState({
      [id]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <div id="register_container">
          <form id="register_form" onSubmit={this.submitRegistration}>
            <fieldset>
              <legend>Register</legend>
              <div className="register-container">
                <input id="username" type='text' name="username" placeholder="username" onChange={this.handleChange} value={this.state.username} required={true}/>
                <input id="email" type="email" name="email" placeholder="email" onChange={this.handleChange} value={this.state.email} required={true}/>
                <input id="reg_password" type="text" name="reg_password" placeholder="password" onChange={this.handleChange} value={this.state.reg_password} required={true}/>
                <input type="submit" value="Submit"/>
              </div>
            </fieldset>
          </form>
        </div>
        <div id ='register_tooltip'>
          {this.state.tooltip_msg ? <p>{this.state.tooltip_msg}</p> : null}
        </div>
      </div>
    )
  }
};

export default Register;