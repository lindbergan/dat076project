import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'
import { Col, Grid, Row } from "react-bootstrap";

export class Authentication extends Component {

  render() {
    return (
    <Grid fluid={true}>
      <div>
        <Row>
          <Col md={4} lg={4} mdOffset={4}>
            <h1 className="centerH1">Authentication</h1>
            <hr/>
          </Col>
        </Row>
        <Row>
          <Col md={4} lg={4} mdOffset={4}>
            <GoogleLogin
              className="btn btn-primary btn-lg centerButton"
              clientId="619353481887-svkhfldhas6b2bs65atfrimeqe1eoge8.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={(response) => {
                this.props.logIn(response.googleId);
                this.props.setProfile(response.profileObj)
              }}
              onFailure={(response) => console.log(response)}
            />
          </Col>
        </Row>
      </div>
      <style jsx="true">{`
        .centerH1 {
          text-align: center;
        }
        .centerButton {
           margin: 0 auto;
           display: block;
        }
      `}
      </style>
    </Grid>)
  }
}
