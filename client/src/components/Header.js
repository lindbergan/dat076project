import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Cart } from './Cart';
import { Link } from "react-router-dom";


export class Header extends Component {

    constructor(props, context){
      super(props, context);
      this.state = {}
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
                <img src={ profilePicture } className="img-thumbnail rounded mx-auto d-block profilePic" alt="Profile"/>
              <h4>{ profileName }</h4>
              <Button
                className="btn btn-danger"
                onClick={ this.props.logOut }
                active
              >Logout</Button>
            </Col>

            <Col className="header-main" xs={12} sm={6} md={4} lg={8}>
            <Link to="/">
              <div className="webshop-title">
                <h2 id="ws-title">Amazing Products Webshop</h2>
              </div>
              </Link>
            </Col>

            <Col sm={3} lg={2}/>

            <Col className="header-cart" xs={12} sm={6} md={4} lg={2}>
              <Cart cartContent={this.props.cartContent}/>
            </Col>

            <Col sm={3}/>

          </Row>
          <style jsx="true">{`
            #header {
              background: #16222a; /* fallback for old browsers */
              background: -webkit-linear-gradient(to right, #243C48, #3a6073); /* Chrome 10-25, Safari 5.1-6 */
              background: linear-gradient(to right, #243C48, #3a6073); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }
            .webshop-title {

              color: white;
              margin: auto;
              padding-top: 35px;
              font-family: 'Lobster', cursive;
              text-shadow: 3px 2px 0px #16222a, 4px 3px 0px rgba(0,0,0,0.15);
              display: flex;
              justify-content: center;
              align-items: center;
            }
            #ws-title{
              font-size: 55px;
            }
            .search-field-group{
              margin-bottom: 0;

            }
            .search-field-group-cont{
              width: 50%;
              margin: 0 auto;
            }
            .search-field{
              width: 100%;
              max-width: 450px;
              margin: 0 auto;
              display: block;
              border-radius: 0;
            }
            .profilePic {
              max-width: 50px;
              margin: 10px;
              border-radius: 0;
            }
            .btn-danger{
              border-radius: 0;
            }
            .header-profile{
              padding: 20px 10px 10px 10px;
              color: white;
              font-family: 'Hind Siliguri', sans-serif;
            }
            .header-main{
              text-align: center;
            }
            .header-cart{
              padding: 20px 10px 10px 10px;
            }
          `}</style>
        </Grid>
      )
    }
}
