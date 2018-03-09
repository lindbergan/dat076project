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
    const product_id = this.state.product.product_id;

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
        }); //end fetch

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
              <h4 className="info-price">Price: {product.price} kr</h4>
            </div>
          </Row>
          <Row>
            <div className="buy-button button-product"
                    onClick={this.handleClick}><MaterialIcon icon="add_shopping_cart" invert={true} size={35}/></div>
          </Row>

          <style jsx="true">{`
          .product-container {
            background-color: #EAF4E5;
            margin: 10px;
            max-width: 350px;
            margin-bottom: 40px;
          }
          .grid-img{
            background: white;
            cursor: pointer;
          }
          .img-container{
            background-color: #ccc;
            margin: 15px 15px 0 15px;
            cursor: pointer;
            
          }
          .info-container{
            font-family: 'Hind Siliguri', sans-serif;
            text-align: left;
            margin-left: 15px;
          }
          .info-price{
            font-size: 16px;
            margin-top: 50px;
          }

          .button-product {
            background: #56ab2f; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #56ab2f, #6BB549); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #56ab2f, #6BB549); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            height: 50px;
            color: #EAF4E5;
            padding-top: 9px;
            margin-top:0;
            cursor:pointer;
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
