import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { Cart } from './cart';

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
        <div className="header-container">
          <div className="grid-hatch">
            <img alt="logo" className="headerlogo"/>
          </div>
          <div className="grid-title">
          <h1 className="webshop-title">
              Amazing Products Webshop
          </h1>
            <form>
              <Button
                className="btn btn-danger"
                onClick={this.props.logOut}>Logout</Button>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <FormControl
                className="search-field"
                type="text"
                value={this.state.value}
                placeholder="Search..."
                onChange={this.handleChange}
              />
            <FormControl.Feedback />
            </FormGroup>
            </form>
          </div>
          <div className="grid-cart">
            <Cart />
          </div>
          <style jsx="true">{`
            .header-container{
              display:grid;
              grid-template-columns: 25% 50% 25%;
              grid-template-areas:
                "grid-hatch grid-title grid-cart"
            }
            .grid-hatch{
              display:grid;
              grid-area:grid-hatch;
            }
            .grid-title{
              display:grid;
              grid-area:grid-title;
            }
            .grid-cart{
              display:grid;
              grid-area:grid-cart;
            }
            .webshop-title {
              color: white;
            }
            .search-field{
              width: 25%;
              margin:auto;
            }

          `}</style>
        </div>
      )
    }
}
