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
      <div className="review-container">

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

        `}</style>
      </div>
    );
  }


}
