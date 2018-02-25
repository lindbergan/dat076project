import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

export class Header extends React.Component {

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
        <div className="container">
          <img alt="logo" className="headerlogo"/>
          <h1 className="webshop-title">
              Amazing Products Webshop
          </h1>
          <form>
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
          <style jsx="true">{`

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
