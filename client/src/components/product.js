import React, { Component } from 'react';

export class Product extends Component {

  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const { product } = this.props;
    this.setState({ product });
  }

render(){
    const { product } = this.state;
    if(product !== undefined) {
      return(
        <div className="product">
          { <h1>{ product.name }</h1> }
          { <p>Id: { product.id }</p> }
          { <p>Price: { product.price }</p> }
          <style jsx="true">{`
          .product {
            width: 100px;
            height: 100px;
            background-color: yellow;
          }
          `}</style>
        </div>
      )
    } else {
      return(
        <div className="product">
          <h1>Product loading...</h1>
          <style jsx="true">{`
          .product {
            width: 100px;
            height: 100px;
            background-color: yellow;
          }
          `}</style>
        </div>
      )
    }
  }
}
