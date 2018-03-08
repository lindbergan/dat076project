import { Button, Grid, Row } from 'react-bootstrap';
import React from 'react';
const classNames = require('classnames');

export class SortingButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: 'ascending'
    };
  }

  buttonClassNames = (name) => {
    return classNames({
      "btn": true,
      "btn-primary": true,
      "active": name === this.state.activeButton
    });
  };

  render() {
    console.log(this.parent);
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
            background: white;
            padding: 10px;
          }
          .grid {
            padding: 0;
          }
        `}</style>
      </Row>
    </Grid>)
  }
}