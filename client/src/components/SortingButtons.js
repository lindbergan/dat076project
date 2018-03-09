import { Button, Grid, Row } from 'react-bootstrap';
import React from 'react';
import MaterialIcon from "material-icons-react";
const classNames = require('classnames');

export class SortingButtons extends React.Component {
  constructor() {
    super();
    this.state = {
      activeButton: 'ascending'
    };
  }

  buttonClassNames = (name) => {
    return classNames({
      "btn": true,
      "btn-secondary": true,
      "active": name === this.state.activeButton
    });
  };

  render() {
    return (<Grid fluid={true} className="grid">
      <Row className="filter-row">
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
        <style jsx="true">{`
          .filter-row {
            width: 100%;
            margin: 0;
          }
          .btn-custom{
            width: 25%;
            border-radius: 0;
          }
          .grid {
            padding: 0;
          }
        `}</style>
      </Row>
    </Grid>)
  }
}
