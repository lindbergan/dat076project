import React, {Component} from 'react';

export class Review extends Component{

  constructor(props){
    super();
    this.product_id = props.product_id;
    this.review_id = props.review_id;
    this.state = {
      id:'',
      title:'',
      rating:'',
      comment:'',
    }
  }

  async componentDidMount() {
    fetch('/products/1/review/1')
      .then(res => res.json())
      .then(review => this.setState({ id: review.id,
                                      title:review.title,
                                      rating:review.rating,
                                      comment:review.comment }));
  }

  render(){
    return(
      <div className="review-container effect7">

        <div className="grid-review-rating">
          {this.state.rating}
        </div>
        <div className="grid-review-title">
          {this.state.title}
        </div>
        <div className="grid-review-comment">
          {this.state.comment}
        </div>


        <style jsx="true">{`
          .review-container{
            width: 50%;
            display:grid;
            grid-template-rows: 2vw;
            grid-template-columns: 2vw;
            grid-template-areas:
              "grid-review-rating grid-review-title"
              "grid-review-comment grid-review-comment";
            background: white;
            margin: 5px;
            padding: 1.5vw;
          }
          .grid-review-rating{
            display:grid;
            grid-area:grid-review-rating;
            font-size:2vw;
            font-weight: 900;
          }
          .grid-review-title{
            display:grid;
            grid-area:grid-review-title;
            font-size:2vw;
            font-weight: 200;
            text-align:left;
            padding-left: 1vw;
          }
          .grid-review-comment{
            display:grid;
            grid-area:grid-review-comment;
            text-align: justify;
            padding-top: 1.5vw;
          }
          .effect7{
            position:relative;
            -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
            -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
            box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
          }
          .effect7:before, .effect7:after{
            content:"";
            position:absolute;
            z-index:-1;
            -webkit-box-shadow:0 0 20px rgba(0,0,0,0.8);
            -moz-box-shadow:0 0 20px rgba(0,0,0,0.8);
            box-shadow:0 0 20px rgba(0,0,0,0.8);
            top:0;
            bottom:0;
            left:10px;
            right:10px;
            -moz-border-radius:100px / 10px;
            border-radius:100px / 10px;
          }
          .effect7:after{
            right:10px;
            left:auto;
            -webkit-transform:skew(8deg) rotate(3deg);
            -moz-transform:skew(8deg) rotate(3deg);
            -ms-transform:skew(8deg) rotate(3deg);
            -o-transform:skew(8deg) rotate(3deg);
            transform:skew(8deg) rotate(3deg);
          }
        `}</style>
      </div>
    );
  }


}
