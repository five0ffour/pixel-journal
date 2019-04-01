import React, { Component } from "react";
import Journal from "./pages/Journal";
import NoMatch from "./pages/NoMatch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import API from "./utils/API";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    const response = API.getUser();
    if (response.data) {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Journal loggedIn={this.state.loggedIn} />}
            />

            <Route
              path="/signup"
              render={() => <Signup updateUser={this.updateUser} />}
            />

            <Route
              path="/login"
              render={() => <Login updateUser={this.updateUser} />}
            />
            <Route
              exact
              path="/journal"
              render={() => <Journal loggedIn={this.state.loggedIn} />}
            />
            
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
