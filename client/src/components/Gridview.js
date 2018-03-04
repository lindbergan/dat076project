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
      .then(products => this.setState({ products }))
  }

  render(){
    const { products } = this.state;

    if (products !== null) {
      return(
        <div className="gridView">
          {products.map(product =>
            <Product key={ product.id } id={ product.id } product={ product }/>)}
          <style jsx="true">{`

            .gridView {
              width: 80%;
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
