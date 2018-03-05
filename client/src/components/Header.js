import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Cart } from './Cart';

export class Header extends Component {

    constructor(props, context){
      super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        value: '',
      }
    }

    handleChange(e){
      this.setState({value: e.target.value});
      this.props.changeTerm(e.target.value);
    }

    getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

    render() {
      return (
        <Grid id="header" fluid={true}>
          {/*<div className="grid-hatch">
            <img alt="logo" className="headerlogo"/>
          </div>*/}
          <Row>
            <h1 className="webshop-title">
                Amazing Products Webshop
            </h1>
          </Row>
          <Row>
            <Col md={ 4 } sm={3} lg={ 4 }/>
            <Col xs={12} sm={6} md={4} lg={4}>
              <form>
                <FormGroup
                  controlId="formBasicText"
                  validationState={ this.getValidationState() }
                >
                  <FormControl
                    className="search-field"
                    type="text"
                    value={ this.state.value }
                    placeholder="Search..."
                    onChange={ this.handleChange }
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </form>
            </Col>
            <Col md={ 1 } sm={3} lg={ 1 }/>
            <Col md={ 1 } lg={ 1 }/>
            <Col xs={12} sm={12} md={1} lg={1}>
              <Button
                className="btn btn-danger"
                onClick={ this.props.logOut }
                active
              >Logout</Button>
            </Col>
            <Col md={ 1 } lg={ 1 }/>
          </Row>
          <style jsx="true">{`
            #header {
              background-color: #B5C7CB;
            }
            .webshop-title {
              color: white;
            }
            .search-field{
              width: 100%;
            }

          `}</style>
        </Grid>
      )
    }
}
