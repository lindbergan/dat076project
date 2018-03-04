import React, {Component} from 'react';
import {Review} from './review.js';

const bobRossIpsum = "It's almost like something out of a fairytale book. Go out on a limb - that's where the fruit is. Only eight colors that you need. Fluff it up a little and hypnotize it. Little trees and bushes grow however makes them happy. The very fact that you're aware of suffering is enough reason to be overjoyed that you're alive and can experience it.";


export class ProductDetails extends Component{

constructor(props){
  super(props);
  this.product_id = props.id;
  this.state = {
    product: '',
  }
}

async componentDidMount() {
  fetch('/products/1')
    .then(res => res.json())
    .then(product => this.setState({ product }))
}

render(){

  const {product} = this.state;

  if(product){

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

    <div className="grid-det-info"> {bobRossIpsum}
    </div>

    <div className="grid-det-price"> {this.state.product.price}
    </div>
    <div className="grid-det-reviews">
    {product.review_ids.map( review => (
        <Review product_id={1} review_id={1} />
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
          background: #f3efe7;
        }
        .grid-det-img{
          display:grid;
          grid-area:grid-det-img;
          background:#E4F5C3;
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
          background:#CBF5C3;
          font-size: 3em;
          text-align: left;
          padding:10px 0 0 15px;
        }
        .grid-det-info{
          display:grid;
          grid-area:grid-det-info;
          background:#C3E4F5;
          text-align: left;
          padding:10px 50px 0 15px;
        }
        .grid-det-price{
          display:grid;
          grid-area:grid-det-price;
          background:#C3CBF5;
        }
        .grid-det-reviews{
          display:grid;
          grid-area:grid-det-reviews;
          background: #F4C2C2;
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
