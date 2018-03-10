import { Button, Grid, Row, Col, FormGroup, FormControl, } from 'react-bootstrap';
import React from 'react';
import MaterialIcon from "material-icons-react";


const classNames = require('classnames');


export class SortingButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      activeButton: 'ascending',
      value: ''
    };
  }

  buttonClassNames = (name) => {
    return classNames({
      "btn": true,
      "btn-secondary": true,
      "active": name === this.state.activeButton
    });
  };
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
    return (<Grid fluid={true} className="grid">
      <Row className="filter-row">
      <div className="search-container">
        <form>
          <FormGroup
            className="search-field-group"
            controlId="formBasicText"
            validationState={ this.getValidationState()}
          >
            <FormControl
              className="search-field"
              type="text"
              value={ this.state.value }
              placeholder="Search..."
              onChange={ this.handleChange }
            />

          </FormGroup>
        </form>
        </div>
        <div className="buttons-container">
        <Button className={[this.buttonClassNames('ascending'), "btn-custom"].join(' ')}
                onClick={() => {
                  this.setState({ activeButton: 'ascending'});
                  this.props.sortAscending();
                } }>A-Z</Button>
        <Button className={[this.buttonClassNames('descending'), "btn-custom"].join(' ')}
                onClick={() => {
                  this.setState({ activeButton: 'descending' });
                  this.props.sortDescending();
                }}>Z-A</Button>
        <Button className={[this.buttonClassNames('cheapest'), "btn-custom"].join(' ')}
                onClick={() => {
                  this.setState({ activeButton: 'cheapest' });
                  this.props.sortCheapest()
                } }>Price <i className="fas fa-arrow-up"></i></Button>
        <Button className={[this.buttonClassNames('mostExpensive'), "btn-custom"].join(' ')}
                onClick={() => {
                  this.setState({ activeButton: 'mostExpensive' });
                  this.props.sortMostExpensive()
                } }>Price <i className="fas fa-arrow-down"></i></Button>
        </div>
        <style jsx="true">{`
          .form-control{
            margin:0;
            padding:0;

          }
          .filter-row {
            width: 100%;
            margin: 0;
              overflow: hidden;
          }
          .btn-custom{
            width: 25%;
            border-radius: 0;
          }
          .buttons-container{
            width: 50%;
            overflow: hidden;
            padding:10px;
            font-family: 'Hind Siliguri', sans-serif;

          }
          .grid {
            padding: 0;
            background: #F6F4EC;
          }
          .search-container{
            width: 50%;
            float: left;
            margin: 0;
            padding:10px;
          }
          .search-field{
            margin:0;
            padding:0;
            width: 100%;
            max-width: 100%;
            text-align: center;
            font-family: 'Hind Siliguri', sans-serif;
          }

        `}</style>
      </Row>
    </Grid>)
  }
}
