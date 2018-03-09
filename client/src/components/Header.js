import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Cart } from './Cart';
import { Link } from "react-router-dom";
import './shadows.css';
import '../App.css'

export class Header extends Component {

    constructor(props, context){
      super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        value: ''
      }
    }

    handleChange(e) {
      if (e.target.value.length > 50) return;
      this.setState({ value: e.target.value });
      this.props.changeTerm(e.target.value);
    }

    getValidationState() {
      if (this.state.value.length === 0) return null;
      const valueCart = this.state.value.split("");
      const dangerousCharacters = ['<', '>', '\\', '/', '!', ";", '#'];
      if (dangerousCharacters.filter(function(n) {
          return valueCart.indexOf(n) !== -1;
        }).length !== 0) {
        return 'error';
      }
      else if (this.state.value.length > 35 && this.state.value.length <= 48) return 'warning';
      else if (this.state.value.length > 49) return 'error';
      return 'success';
    }

    render() {
      const savedProfilePicture = sessionStorage.getItem('profilePictureUrl');
      const savedProfileName = sessionStorage.getItem('profileFullName');
      const profilePicture = savedProfilePicture !== null ? savedProfilePicture :
      this.props.loggedInProfile !== undefined ? this.props.loggedInProfile.imageUrl :
      savedProfilePicture !== null || savedProfilePicture !== 'null' ? savedProfilePicture : '';
      const profileName = savedProfileName !== null ? savedProfileName :
      this.props.loggedInProfile !== undefined ? this.props.loggedInProfile.name : '';

      return (
        <Grid id="header" fluid={true}>
          <Col md={ 12 } sm={12} lg={3} className="profile-col">
            <Link to="/">
              <img src={ profilePicture } className="img-thumbnail rounded mx-auto effect7" alt="Profile"
              onClick={() => { this.setState({ value: '' }); this.props.changeTerm(''); }}/>
            </Link>
            <h4 className="welcome-name">Welcome! </h4> <p>{ profileName }</p>
            <Button
              className="btn btn-danger"
              onClick={ this.props.logOut }
              active
            >Logout</Button>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
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
                  onClick={() => {}}/>
              </FormGroup>
            </form>
          </Col>
          <Col xs={12} sm={12} md={12} lg={2} className="cart-col">
            <Cart cartContent={this.props.cartContent}/>
          </Col>
          <style jsx="true">{`
            .welcome-name {
              color: white;
              font-size: 20px;
              font-family: "Times new Roman";
            }

            .profile-col {
              margin: 10px;
            }

            .row-header {
              display: block;
              margin: 0 auto;
            }
            #header {
              background-color: #B5C7CB;
              padding: 0;
              position: relative;
              overflow: hidden;
              clear: both;
            }

            @import url('/public/fonts/berkshire-swash/BerkshireSwash-Regular');
            .webshop-title {
              color: white;
              font-family: 'Berkshire Swash', cursive;
              font-size: 55pt;
            }
            .search-field{
              width: 100%;
              max-width: 450px;
              margin: 35px auto 0 auto;
              display: block;
              padding: 15px;
            }
            .profilePic {
              max-width: 50px;
              margin: 10px;
            }
          `}</style>
        </Grid>
      )
    }
}
