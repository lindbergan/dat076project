import React, { Component } from 'react';
import { Product } from "./Product";

export class GridView extends Component {

  constructor() {
    super();
    this.state = {
      products: null
    };
  }

  async componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({
        products: products
      }));
  }

  render() {
    const { products } = this.state;
    if (products !== null) {
      const { searchTerm } = this.props;
      return(
        <div className="gridView">
          {
            products
              .filter(product => product.name.includes(searchTerm))
              .map(product =>
                <Product key={ product.product_id } id={ product.product_id } product={ product }/>)
          }
          <style jsx="true">{`
            .gridView {
              width: 100%;
              height: inherit;
              align-content: center;
              position: fixed;
              overflow-y: scroll;
              padding: 2% 5%;
            }

          `}</style>
        </div>
      )
    } else {
      return(
        <div className="gridView">
          <style jsx="true">{`

            .gridView {
              width: 100%;
              height: 100%;
            }

          `}</style>
        </div>
      )
    }
  }
}
