import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'

export class Authentication extends Component {

  render() {
    const responseGoogle = (response) => {
      console.log(response);
    };


    return (
    <div>
      <h1>Authentication</h1>
      <p>Time to authenticate</p>
      <GoogleLogin
        className="btn btn-primary"
        clientId="619353481887-svkhfldhas6b2bs65atfrimeqe1eoge8.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={() => this.props.authFunc()}
        onFailure={responseGoogle}
      />
    </div>)
  }
}