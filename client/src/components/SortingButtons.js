import { Button, Grid, Row } from 'react-bootstrap';
import React from 'react';
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
        <Button className={this.buttonClassNames('ascending')}
                onClick={() => {
                  this.setState({ activeButton: 'ascending'});
                  this.props.sortAscending();
                } }>Ascending</Button>
        <Button className={this.buttonClassNames('descending')}
                onClick={() => {
                  this.setState({ activeButton: 'descending' });
                  this.props.sortDescending();
                }}>Descending</Button>
        <Button className={this.buttonClassNames('cheapest')}
                onClick={() => {
                  this.setState({ activeButton: 'cheapest' });
                  this.props.sortCheapest()
                } }>Cheapest</Button>
        <Button className={this.buttonClassNames('mostExpensive')}
                onClick={() => {
                  this.setState({ activeButton: 'mostExpensive' });
                  this.props.sortMostExpensive()
                } }>Most expensive</Button>
        <style jsx="true">{`
          .filter-row {
            background: #16222a; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #243C48, #3a6073); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #243C48, #3a6073); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          }
          .grid {
            padding: 0;
          }
        `}</style>
      </Row>
    </Grid>)
  }
}
