import React, { Component } from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './shadows.css';
import MaterialIcon from 'material-icons-react';



export class Product extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {};
  }

  async componentDidMount() {
    const { product } = this.props;
    this.setState({ product });
  }

  handleClick(e){
    console.log("Add button clicked, post req initiated");

    const user_id = sessionStorage.getItem('userId');
    const product_id = this.state.product.product_id;
    
    return fetch(`/carts/${user_id}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product_id: product_id,
              user_id: user_id.toString(),
              amount: '1',
            })
          }); //end fetch
  }

  render(){
    const { product } = this.state;
    if(product !== undefined) {
      return(
        <Grid className="product-container effect1" fluid={true}>
          <Row>
              <Link to={"/product/" + product.product_id}>
                <div className="img-container">
                  <MaterialIcon icon="insert_photo" size={100} />
                </div>
              </Link>
          </Row>
          <Row>
            <div className="info-container">
              <h3>{product.name}</h3>
              <h4>Price: {product.price} kr</h4>
            </div>
          </Row>
          <Row>
            <Button className="buy-button button-product"
                    bsStyle="success"
                    bsSize="md"
                    onClick={this.handleClick}>Add to cart</Button>
          </Row>

          <style jsx="true">{`
          .product-container {
            background-color: #F5FFE1;
            margin: 10px;
            cursor: pointer;
            max-width: 350px;
          }
          .grid-img{
            background: white;
          }
          .img-container{
            background-color: #ccc;
            margin-top: 15px;
          }
          .grid-info{
            font-size:10px;
          }
          .button-product {
            margin-bottom: 15px;
          }
          `}</style>
        </Grid>
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
