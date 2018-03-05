import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './shadows.css';

  function handleClick(e){
    console.log("add button clicked, push to cart");
  }

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
        <div className="product-container effect1">

            <div className="grid-img">
            <Link to={"/product/" + product.product_id} props={{ product_id: 1 }}>
              <div className="img-container">
                img goes here
              </div>
              </Link>
            </div>

            <div className="grid-info">
              <div className="info-container">
                { product.name } <br/>
                { product.product_id }<br/>
                { product.price }<br/>
              </div>
            </div>

            <div className="grid-button">
              <Button className="buy-button"
                      bsStyle="success"
                      bsSize="xsmall"
                      onClick={handleClick}>Add to cart</Button>
            </div>

          <style jsx="true">{`
          .product-container {
            width: 200px;
            height: 275px;
            background-color: #F5FFE1;
            float: left;
            margin: 10px;
            cursor: pointer;
            display: grid;
            grid-template-rows: 200px 75px;
            grid-template-columns: 50% 50%;
            grid-template-areas:
              "grid-img grid-img"
              "grid-info grid-button"
          }
          .grid-img{
            display: grid;
            grid-area: grid-img;
            padding: 20px;
            background: white;
          }
          .img-container{
            background-color: white;
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
