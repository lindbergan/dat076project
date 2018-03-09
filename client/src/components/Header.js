import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Cart } from './Cart';
import { Link } from "react-router-dom";

export class Header extends Component {

    constructor(props, context){
      super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        value: ''
      }
    }

    handleChange(e){
      this.setState({ value: e.target.value });
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
      const savedProfilePicture = sessionStorage.getItem('profilePictureUrl');
      const savedProfileName = sessionStorage.getItem('profileFullName');
      const profilePicture = savedProfilePicture !== null ? savedProfilePicture :
      this.props.loggedInProfile !== undefined ? this.props.loggedInProfile.imageUrl :
      savedProfilePicture !== null || savedProfilePicture !== 'null' ? savedProfilePicture : '';
      const profileName = savedProfileName !== null ? savedProfileName :
      this.props.loggedInProfile !== undefined ? this.props.loggedInProfile.name
      : '';

      return (
        <Grid id="header" fluid={true}>
          <Row>

            <Col className="header-profile" md={ 4 } sm={3} lg={ 2 }>
              <Link to="/">
                <img src={ profilePicture } className="img-thumbnail rounded mx-auto d-block profilePic" alt="Profile"/>
              </Link>
              <h4>{ profileName }</h4>
              <Button
                className="btn btn-danger"
                onClick={ this.props.logOut }
                active
              >Logout</Button>
            </Col>

            <Col className="header-main" xs={12} sm={6} md={4} lg={8}>
              <h2 className="webshop-title">
                Amazing Products Webshop
              </h2>
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

            <Col sm={3} lg={2}/>

            <Col className="header-cart" xs={12} sm={6} md={4} lg={2}>
              <Cart cartContent={this.props.cartContent}/>
            </Col>

            <Col sm={3}/>

          </Row>
          <style jsx="true">{`
            #header {
              background-color: #6D69A6;
            }
            .webshop-title {
              color: white;
            }
            .search-field{
              width: 100%;
              max-width: 450px;
              margin: 0 auto;
              display: block;
            }
            .profilePic {
              max-width: 50px;
              margin: 10px;
            }
            .header-profile{
              padding: 10px;
            }
            .header-main{

            }
            .header-cart{
              padding: 10px;
            }
          `}</style>
        </Grid>
      )
    }
}
