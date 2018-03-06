import React, {Component} from 'react';
import {Review} from './review.js';
import { Col, Grid, Row } from "react-bootstrap";
import MaterialIcon from "material-icons-react";



export class ProductDetails extends Component{

constructor(props){
  super(props);
  this.product_id = props.product_id;
  this.state = {
    product: '',
    reviews: '',
  }
}

async componentDidMount() {
  const id = this.props.match.params.product_id;
  fetch('/products/' + id)
    .then(res => res.json())
    .then(product => this.setState({ product }));

    fetch(`/products/${id}/reviews`)
      .then(res => res.json())
      .then(reviews => this.setState({ reviews }))
}

render(){

  const { product } = this.state;
  const { reviews } = this.state;

  if(product && reviews){

  return(
    <Grid className="prod-details-container" fluid={true}>
      <Row>
        <Col md={4} lg={4}>
          <MaterialIcon icon="insert_photo" size={100} className="icon-details"/>
        </Col>
        <Col md={8} lg={8}>
          <h1>{this.state.product.name}</h1>
          <h3>Price: {this.state.product.price}</h3>
          <p>{this.state.product.description}</p>
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={12}>
          {this.state.reviews.map( review => (
              <Review key={`${review.user_id}${review.product_id}`} review={review} />
            )
          )}
        </Col>
      </Row>
      <style jsx="true">{`
        .prod-details-container{
          width:100%;
          height100%;
          background: #F7F7F7;
        }
      `}</style>
    </Grid>
  );}else{
    return(
      <div>Review not found...</div>
    );
  }
}

};
