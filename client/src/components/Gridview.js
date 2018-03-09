import React, { Component } from 'react';
import { Product } from "./Product";
import { Button, Col, Grid, Row } from "react-bootstrap";
import ReactLoading from 'react-loading';

export class GridView extends Component {

  constructor(props) {
    super(props);
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
    if (width < 300) return 1;
    else if (width <= 300 && width < 900) return 2;
    else if (width >= 900 && width < 1200) return 3;
    else return 4;
  }

  renderColumns(products, searchTerm, nrColumns) {
    const filtered = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    const { sortReversingOrder, sortCheapest } = this.props;

    const sortedIfNeeded =
      sortReversingOrder === true ? filtered.reverse() :
      sortReversingOrder === false ? filtered :
      sortCheapest === true ? filtered.sort(function(a, b) { return a.price - b.price }) :
        filtered.sort(function(a, b) { return b.price - a.price });

    const productsShown =  [...Array(nrColumns).keys()].map(nr => (
      <Col xs={12} sm={6} md={4} lg={3} key={nr}>
        {
          sortedIfNeeded
            .filter(product => sortedIfNeeded.indexOf(product) % nrColumns === nr)
            .map(product => <Product key={ product.product_id }
                                     id={ product.product_id }
                                     product={ product }
                                     updateCart={ this.props.updateCart }/>)

        }
      </Col>
    ));

    const nrChildren = productsShown.reduce((a, el) => a + el.props.children.length, 0);

    if (nrChildren === 0) {
      return (<Grid>
        <Row>
          <h1>No items match that search.</h1>
        </Row>
      </Grid>);
    } else return productsShown;
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
    } else { return(<Grid fluid={true}>
      <Row>
        <ReactLoading className="center" type='balls' width='100px' height='100px' color="grey"/>
      </Row>
      <style jsx="true">
        {`
          .center {
            display: block;
            margin: 0 auto;
          }
        `}
      </style>
    </Grid>) }
  }
}
