import React, {Component} from 'react';
import { ProductCO } from "./Product-co";
import { Col, Grid, Row } from "react-bootstrap";


export class Checkout extends Component{
  constructor(){
    super();
    this.state={
      cart: '',
      searchTerm: ''
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {
    fetch('/carts/3')
      .then(res => res.json())
      .then(cart => this.setState({ cart }));
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
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

  getNrColumns() {
    const width = this.state.width;
    if (width < 300) return 1;
    else if (width <= 300 && width < 900) return 2;
    else if (width >= 900 && width < 1200) return 3;
    else return 4;
  }

  renderColumns(products, searchTerm, nrColumns) {
    const filtered = products.filter(product => true); // todo use product.name when nylundj has time.
    return [...Array(nrColumns).keys()].map(nr => (
      <Col xs={12} sm={6} md={4} lg={3} key={nr}>
        {
          filtered
            .filter(product => filtered.indexOf(product) % nrColumns === nr)
            .map(product => <ProductCO key={ product.product_id }
                                       id={ product.product_id }
                                       product={ product }/>)
        }
      </Col>
    ));
  }

  render() {
    const { cart } = this.state;
    const { searchTerm } = this.props;
    if (cart !== '') {
      const nrColumns = this.getNrColumns();
      return(
        <Grid>
          <Row>
            {
              this.renderColumns(cart, searchTerm, nrColumns)
            }
          </Row>
        </Grid>
      )
    } else { return(<div />) }
  }
}
