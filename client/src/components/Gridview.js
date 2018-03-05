import React, { Component } from 'react';
import { Product } from "./Product";
import { Col, Grid, Row } from "react-bootstrap";

export class GridView extends Component {

  constructor() {
    super();
    this.state = {
      products: null,
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  async componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({
        products: products
      }));
  }

  getNrColumns() {
    const width = this.state.width;
    if (width < 750) return 1;
    else if (width <= 750 && width < 900) return 2;
    else if (width >= 900 && width < 1200) return 3;
    else return 4;
  }

  renderColumns(products, searchTerm, nrColumns) {
    const filtered = products.filter(product => product.name.includes(searchTerm));
    return [...Array(nrColumns).keys()].map(nr => (
      <Col xs={12} sm={6} md={4} lg={3} key={nr}>
        {
          filtered
            .filter(product => filtered.indexOf(product) % nrColumns === nr)
            .map(product => <Product key={ product.product_id }
                                     id={ product.product_id }
                                     product={ product }/>)
        }
      </Col>
    ));
  }

  render() {
    const { products } = this.state;
    if (products !== null) {
      const { searchTerm } = this.props;
      const nrColumns = this.getNrColumns();
      return(
        <Grid>
          <Row>
            {
              this.renderColumns(products, searchTerm, nrColumns)
            }
          </Row>
        </Grid>
      )
    } else { return(<div />) }
  }
}
