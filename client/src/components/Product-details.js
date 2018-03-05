import React, {Component} from 'react';
import {Review} from './review.js';



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
  var id = this.props.match.params.product_id;
  fetch('/products/' + id)
    .then(res => res.json())
    .then(res => {
      console.log("product >------>");console.log(res); return res;
    })
    .then(product => this.setState({ product }))

    fetch(`/products/${id}/reviews`)
      .then(res => res.json())
      .then(res => {
        console.log("reviews >------>");console.log(res); return res;
      })
      .then(reviews => this.setState({ reviews }))
}

render(){

  const {product} = this.state;
  const {reviews} = this.state;

  if(product && reviews){

  return(
    <div className="prod-details-container">

    <div className="grid-det-img">
      <div className="img-wrapper">
        Img goes here
      </div>
    </div>

    <div className="grid-det-name">
      {this.state.product.name}
    </div>

    <div className="grid-det-info"> {this.state.product.description}
    </div>

    <div className="grid-det-price"> {this.state.product.price}
    </div>
    <div className="grid-det-reviews">
    {this.state.reviews.map( review => (
        <Review key={`${review.user_id}${review.product_id}`} review={review} />
      )
    )}

    </div>

      <style jsx="true">{`
        .prod-details-container{
          width:100%;
          height100%;
          display:grid;
          grid-template-rows: 100px 200px 100px auto;
          grid-template-columns: 30%;
          grid-template-areas:
            "grid-det-img grid-det-name"
            "grid-det-img grid-det-info"
            "grid-det-img grid-det-price"
            "grid-det-img grid-det-reviews";
          background: #F7F7F7;
        }
        .grid-det-img{
          display:grid;
          grid-area:grid-det-img;

          padding: 10px;
        }
        .img-wrapper{
          width: 100%;
          height: 400px;
          background: white;
        }
        .grid-det-name{
          height:100px;
          display:grid;
          grid-area:grid-det-name;

          font-size: 3em;
          text-align: left;
          padding:10px 0 0 15px;
        }
        .grid-det-info{
          display:grid;
          grid-area:grid-det-info;

          text-align: left;
          padding:10px 50px 0 15px;
        }
        .grid-det-price{
          display:grid;
          grid-area:grid-det-price;

        }
        .grid-det-reviews{
          display:grid;
          grid-area:grid-det-reviews;

        }


      `}</style>
    </div>
  );}else{
    return(
      <div>Review not found...</div>
    );
  }
}

};
