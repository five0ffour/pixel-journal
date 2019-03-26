import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import "./Login.css";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: "",
      redirect: false
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // authenticate the login using the username & password here
    axios
      .post("/api/user/authenticate", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // Success!  Save the token
          console.log("Login success!");

          // Store the token
          localStorage.setItem('Bearer', response.data.token);

          // Save the access token & redirect
          this.setState({ token: response.data.token,
                          redirect : true });
        }
      })
      .catch(error => {
        // Record error to console & screen
        console.log("login error: ");
        console.log(error);
        this.setState({ redirect : false,
                        error: "Failed to match user id and password" });
      });
  };

  render() {
    if (this.state.redirect) {
      return <div>{this.renderRedirect()}</div>;
    } else {
      return (
        <div className="Login">
          <Container fluid>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="username" bssize="large">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      autoFocus
                      type="text"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="password" bssize="large">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      value={this.state.password}
                      onChange={this.handleChange}
                      type="password"
                    />
                  </Form.Group>
                  <Button
                    block
                    bssize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}
