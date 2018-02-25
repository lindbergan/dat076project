import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

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
        <div className="product-container">
            <div className="grid-img">
              <div className="img-container">
                img goes here
              </div>
            </div>
            <div className="grid-info">
              <div className="info-container">
                { product.name } <br/>
                { product.id }<br/>
                { product.price }<br/>
              </div>
            </div>
            <div className="grid-button">
              <Button bsStyle="success"
                      bsSize="xsmall">Add</Button>
            </div>
          <style jsx="true">{`
          .product-container {
            width: 200px;
            height: 250px;
            background-color: #F5FFE1;
            float: left;
            margin: 10px;
            cursor: pointer;
            display: grid;
            grid-template-rows: 200px 50px;
            grid-template-columns: 50% 50%;
            grid-template-areas:
              "grid-img grid-img"
              "grid-info grid-button"
          }
          .grid-img{
            display: grid;
            grid-area: grid-img;
            padding: 20px;
          }
          .img-container{
            background-color: #A7AE99;
          }
          .grid-info{
            display: grid;
            grid-area: grid-info;
            font-size:10px;
          }
          .grid-button{
            display: grid;
            grid-area: grid-button;
            padding: 10px;
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
