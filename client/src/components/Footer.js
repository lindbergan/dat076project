import React, { Component } from 'react';
import { Grid, Row } from "react-bootstrap";

export class Footer extends Component {
  render(){
    return(
      <Grid fluid={true}>
        <Row className="footer">
        <h4 className="same-row">Created by: </h4> Adrian Lindberg, Jonathan Sundkvist, Jonatan Nylund & Johannes Matsson
          <p>© Copyright 2018</p>
        <style jsx="true">{`
          .footer {
            background: white;
            padding: 15px;
          }
          .same-row {
            display: inline;
          }
        `}</style>
        </Row>
      </Grid>
    )
  }
}
