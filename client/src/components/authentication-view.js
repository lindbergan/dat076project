import React, { Component } from 'react';
import { Button } from "react-bootstrap";

export class Authentication extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {

  }

  render() {
    return (
    <div>
      <h1>Authentication</h1>
      <p>Time to authenticate</p>
      <Button onClick={() => this.props.auth()}>Authenticate</Button>
    </div>)
  }
}