import React, { Component } from 'react';
import { Button, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './shadows.css';
import MaterialIcon from 'material-icons-react';

export class Product extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      product: '',
      user_id: sessionStorage.getItem('userId'),
    };
  }

  async componentDidMount() {
    const { product } = this.props;
    this.setState({ product });
  }

  handleClick(e){
    const user_id = this.state.user_id;
    const { product_id } = this.state.product;
    fetch(`/carts/${user_id}`, {
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
        })
      .then(ex => {
      fetch(`/carts/${user_id}/`)
        .then(res => res.json())
        .then(res => {
          const productThatExist = res.find(el => el.product_id === product_id);
          if (productThatExist !== undefined) {
            return fetch(`/carts/${user_id}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                product_id: product_id,
                user_id: user_id.toString(),
                amount: productThatExist.amount + 1
              })
            });
          } else {
            console.log("Product doesn't exist but there was still an error.");
          }
        })
        .catch(ex => console.log(ex));
    });
    this.props.updateCart();
  }

  render() {
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
                    bsSize="large"
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
