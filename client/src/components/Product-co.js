import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './shadows.css';


// TODO: make dynamic


export class ProductCO extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {};

  }

  async componentDidMount() {
    const { product } = this.props;
    this.setState({ product });
  }

  handleAdd(e){
    console.log("Add button clicked, post req initiated");
    return fetch('/carts/3', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product_id: '7',
              user_id: '3',
              amount: '6',
            })
          }); //end fetch
  }
  // TODO: Handle the case of the product not being in the cart ????
  handleDelete(e){

    const user_id = sessionStorage.getItem('userId');
    const {product_id} = this.state.product;

    console.log("Delete button clicked, delete req initiated");
    console.log("user_id ----> " + user_id + " product_id ----> " + product_id);

    return fetch(`/carts/3/${product_id}` , {
        method: 'delete'
      }).then(response =>
        console.log("ok" + response),
      );

  }


  render(){
    const { product } = this.state;
    if(product !== undefined) {
      return(
        <div className="product-container effect1">

            <div className="grid-img">
            <Link to={"/product/" + product.product_id} >
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
            <Button className="add-button"
                    bsStyle="success"
                    bsSize="xsmall"
                    onClick={this.handleAdd}>Add</Button>
              <Button className="delete-button"
                      bsStyle="danger"
                      bsSize="xsmall"
                      onClick={this.handleDelete}>Delete</Button>
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
