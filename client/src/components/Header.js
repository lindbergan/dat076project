import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Cart } from './Cart';

export class Header extends Component {

    constructor(props, context){
      super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        value: ''
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
      const savedProfilePicture = sessionStorage.getItem('profilePictureUrl');
      const savedProfileName = sessionStorage.getItem('profileFullName');
      const profilePicture = savedProfilePicture !== null ? savedProfilePicture : this.props.loggedInProfile.imageUrl;
      const profileName = savedProfileName !== null ? savedProfileName : this.props.loggedInProfile.name;

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
            <Col md={ 4 } sm={3} lg={ 4 }>
              <img src={profilePicture} className="img-thumbnail rounded mx-auto d-block profilePic" />
              <h4>{profileName}</h4>
            </Col>
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
            <Col md={ 1 } sm={3} lg={ 1 } />
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
            .profilePic {
              max-width: 10%;
              margin: 10px;
            }
          `}</style>
        </Grid>
      )
    }
}
