import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'
import { Col, Grid, Row } from "react-bootstrap";
import ReactLoading from 'react-loading';

export class Authentication extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      wasTooFast: false
    };
  }

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
                onFailure={(response) => this.setState({ wasTooFast: true })}
              />
            {
              this.state.wasTooFast && <h4 className="too-fast">You were to fast! Try reloading!</h4>
            }

          </Col>
        </Row>
      </div>
      <style jsx="true">{`
        .too-fast {
          color: red;
          text-align: center;
        }
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
