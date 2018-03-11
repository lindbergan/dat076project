import React, {Component} from 'react';
import { FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Receipt } from './Receipt'

export class Payview extends Component{
  constructor(props) {
      super(props);
      this.state = {
        validEmail: true,
        validCreditCard: false,
        validCVV: false,
        checkoutComplete: false
      };

  this.handleChange = this.handleChange.bind(this);
  this.handleFNameInput = this.handleFNameInput.bind(this);
  this.handleLNameInput = this.handleLNameInput.bind(this);
  this.handleEmailInput = this.handleEmailInput.bind(this);
  this.handleCreditCardInput = this.handleCreditCardInput.bind(this);
  this.handleCVVInput = this.handleCVVInput.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

async componentDidMount() {
  const user_id = sessionStorage.getItem('userId');
  fetch(`/users/${user_id}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ fname: res.firstName});
      this.setState({ lname: res.lastName});
      this.setState({ email: res.email});
    });
}

  handleChange(event) {
    this.setState({lname: event.target.value});
 }

  handleFNameInput(event) {
    this.setState({fname: event.target.value});
  }

  handleLNameInput(event) {
    this.setState({lname: event.target.value});
  }

  handleEmailInput(event, RegExp){
    console.log("Email: ");
    console.log(RegExp.test(event.target.value));
    if(RegExp.test(event.target.value)){
      this.setState({validEmail: true});
    } else {
      this.setState({validEmail: false});
    }
    this.setState({email: event.target.value});
  }

  handleCreditCardInput(event, RegExp){
    console.log("Creditcard: ");
    console.log(RegExp.test(event.target.value));
    if(RegExp.test(event.target.value)){
      this.setState({validCreditCard: true});
    } else {
      this.setState({validCreditCard: false});
    }
    this.setState({creditcard: event.target.value});
  }

  handleCVVInput(event, RegExp){
    console.log("Cvv: ");
    console.log(RegExp.test(event.target.value));
    if(RegExp.test(event.target.value)){
      this.setState({validCVV: true});
    } else {
      this.setState({validCVV: false});
    }
    this.setState({cvv: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.validEmail && this.state.validCVV && this.state.validCreditCard) {
       alert('An purchase was made: ' + this.state.fname);
       this.setState({checkoutComplete:true});
    } else {
      alert('Check that all your fields are valid');
    }
    event.preventDefault();
  }

  getValidationState() {
    return 'success';
  }

  render() {
    const emailRegEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}/;
    const creditcardRegEx = /^[0-9]{16}$/;
    const cvvRegEx = /^[0-9]{3}$/;


    if(!this.state.checkoutComplete){
      return(

      <div className="Payview-container">
        Payview

        <form>
          <FormGroup
            className="forms"
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <label>
              First name:
              <FormControl value={this.state.fname} type="text" name="First name" onChange={this.handleFNameInput}/>
            </label>
            <label>
              Last name:
              <FormControl  value={this.state.lname} type="text" name="Last name" onChange={this.handleLNameInput}/>
            </label>
            <label>
              Email
              <FormControl className="email-form" value={this.state.email} type="email" className="form-control" name="email" onChange={(e) => this.handleEmailInput(e, emailRegEx)}/>
            </label>
            <label>
              Credit card
              <FormControl placeholder="1234123412341234"  value={this.state.creditcard} type='text' className="form-control" name='Credit card number' onChange={(e) => this.handleCreditCardInput(e, creditcardRegEx)}/>
            </label>
            <label>
              CVV
              <FormControl placeholder="123" value={this.state.cvv} type='text' className="form-control" name='CVV' onChange={(e) => this.handleCVVInput(e, cvvRegEx)}/>
            </label>
            <label>
              Adress
              <FormControl type='text' className="form-control" name='Adress'/>
            </label>
            <FormControl className="buy-button" type="submit" value="Buy" onClick={this.handleSubmit} />
          </FormGroup>
        </form>
        <style jsx="true">{`
            .forms {
              max-width:500px;
              margin: 0 auto;
              padding:10px;
            }
            .buy-button {
              max-width:50px;
              margin-left: 100%;
            }
        `}</style>
      </div>
      )
    } else {
      return(
        <Receipt updateCart={this.props.updateCart}/>
      )
    }
  }
}