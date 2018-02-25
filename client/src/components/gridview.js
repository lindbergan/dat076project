import React, { Component } from 'react';
import { Product } from "./product";

export class GridView extends Component {

  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const { products } = this.props;
    this.setState({ products });
  }

  render(){
    const { products } = this.state;

    if (products !== undefined) {
      return(
        <div className="gridView">
          {products.map(product =>
            <Product key={ product.id } id={ product.id } product={ product }/>)}
          <style jsx="true">{`

            .gridView {
              width: 100%;
              height: 1000px;
            }

          `}</style>
        </div>
      )
    } else {
      return(
        <div>
          <h3>Grid view is loading...</h3>
        </div>
      )
    }
  }
}