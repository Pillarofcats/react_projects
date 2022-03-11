//Libraries
import {BrowserRouter, Route, Switch} from "react-router-dom";
import React, {Component} from 'react';
//Styles
import './App.css';
//Pages
import Home from "./pages/Home.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
//Components
import Navigation from "./components/Navigation.js";

class App extends Component {
  constructor(props) {
    super(props);

    //Initial user state
    this.state = {
      logged_in: false,
      user: {
        id: '',
        username: '',
        email: '',
        joined: '',
        num_login: 0
      },
      tooltip_msg: ''
    };
  };

  //If server authenticates login credentials load the user
  loadUser = (user) => {
    this.setState({
      logged_in: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        joined: user.joined,
        num_login: user.num_login
      }
    });
  };

  logoutUser = () => {
    this.setState({
      logged_in: false,
      user: {
        id: '',
        username: '',
        email: '',
        joined: '',
        num_login: 0
      },
      tooltip_msg: 'Logged out'
    });
  };

  render() {
    console.log("logged in?", this.state.logged_in);
    console.log('username', this.state.user.username);
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation logged_in={this.state.logged_in} logoutUser={this.logoutUser}/>
          <Switch>
            <Route exact path="/">
              <Home logged_in={this.state.logged_in} user={this.state.user}/>
            </Route>
            <Route path="/Register" component={Register} />
            <Route path="/Login">
              <Login logged_in={this.state.logged_in} loadUser={this.loadUser} tooltip_msg={this.state.tooltip_msg}/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
