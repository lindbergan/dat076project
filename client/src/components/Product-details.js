import React, {Component} from 'react';
import {Review} from './review.js';
import { Button, Col, Grid, Row } from "react-bootstrap";
import MaterialIcon from "material-icons-react";



export class ProductDetails extends Component{

constructor(props){
  super(props);
  this.product_id = props.product_id;
  this.state = {
    product: '',
    reviews: '',
    tempReviewRating: 0,
    tempReviewComment: ''
  }
}

async componentDidMount() {
  const savedUserId = sessionStorage.getItem('userId');
  const id = this.props.match.params.product_id;
  fetch('/products/' + id)
    .then(res => res.json())
    .then(product => this.setState({ product }));

    fetch(`/products/${id}/reviews`)
      .then(res => res.json())
      .then(reviews => {
        this.setState({ reviews });

        const myReview = reviews.find(r => r.user_id === savedUserId);
        myReview !== undefined ? this.setState({
          tempReviewRating: myReview.rating,
          tempReviewComment: myReview.comment
        }) : '';
      })
}

createReview() {
  const savedUserId = sessionStorage.getItem('userId');
  return fetch(`/products/${this.props.match.params.product_id}/reviews/${savedUserId}`)
    .then(res => res.json())
    .then(res => {
      fetch(`/products/${this.props.match.params.product_id}/reviews`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: savedUserId,
          product_id: this.props.match.params.product_id,
          rating: this.state.tempReviewRating,
          comment: this.state.tempReviewComment,
        })
      });
      return res;
    })
    .then(_ => {
      fetch(`/products/${this.props.match.params.product_id}/reviews`)
        .then(res => res.json())
        .then(reviews => this.setState({ reviews}))
    });
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
        <Col md={6} lg={6}>
          {this.state.reviews.map( review => (
              <Review key={`${review.user_id}${review.product_id}`} review={review} />
            )
          )}
        </Col>
        <Col md={6} lg={6}>
          <Row>Enter message: <input promt="Message..."
                                     value={this.state.tempReviewComment}
                                     onChange={(e) => {
                                       this.setState({tempReviewComment : e.target.value });
                                     }}
          /></Row>
          <Row>Enter rating: <select value={this.state.tempReviewRating}
                                    onChange={(e) => {
                                      this.setState({tempReviewRating : e.target.value});
                                    }}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select></Row>
          <Row><Button className="btn btn-success"
                       bsSize="large"
                       onClick={(e) => { e.preventDefault(); this.createReview() }}
          >Submit</Button></Row>
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
