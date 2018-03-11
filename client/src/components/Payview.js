import React, {Component} from 'react';

export class Payview extends Component{
  constructor(props) {
      super(props);
      this.state = {
        fname: 'John',
        lname: 'Doe',
        email: 'example@email.com',
        creditcard:'xxxx xxxx xxxx xxxx',
        cvv: 'xxx',

        validEmail: 'false',
        validCreditCard: 'false',
        validCVV: 'false'
      };

  this.handleChange = this.handleChange.bind(this);
  this.handleFNameInput = this.handleFNameInput.bind(this);
  this.handleLNameInput = this.handleLNameInput.bind(this);
  this.handleEmailInput = this.handleEmailInput.bind(this);
  this.handleCreditCardInput = this.handleCreditCardInput.bind(this);
  this.handleCVVInput = this.handleCVVInput.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log(RegExp.test(event.target.value));
    if(RegExp.test(event.target.value)){
      this.setState({validEmail: true});
    } else {
      this.setState({validEmail: false});
    }
    this.setState({email: event.target.value});
  }

  handleCreditCardInput(event, RegExp){
    console.log(RegExp.test(event.target.value));
    if(RegExp.test(event.target.value)){
      this.setState({validCreditCard: true});
    } else {
      this.setState({validCreditCard: false});
    }
    this.setState({creditcard: event.target.value});
  }

  handleCVVInput(event, RegExp){
    console.log(RegExp.test(event.target.value));
    if(RegExp.test(event.target.value)){
      this.setState({validCVV: true});
    } else {
      this.setState({validCVV: false});
    }
    this.setState({cvv: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.validEmail && this.state.validCVV){
       alert('An purchase was made: ' + this.state.fname);
    } else {
      alert('Check that all your fields are valid');
    }
    event.preventDefault();
  }

  render() {
    const emailRegEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    const creditcardRegEx = /^[0-9]{16}$/;
    const cvvRegEx = /^[0-9]{3}$/;

    return(
    <div className="Payview-container">
      Payview
        <style jsx="true">{`
          .Payview-container{
          background-color: green;
          }
        `}</style>
      <form>
        <label>
          First name:
          <input value={this.state.fname} type="text" name="First name" onChange={this.handleFNameInput}/>
        </label>
        <label>
          Last name:
          <input  value={this.state.lname} type="text" name="Last name" onChange={this.handleLNameInput}/>
        </label>
        <label>
          Email
          <input value={this.state.email} type="email" className="form-control" name="email" onChange={(e) => this.handleEmailInput(e, emailRegEx)}/>
        </label>
        <label>
          Credit card
          <input value={this.state.creditcard} type='text' className="form-control" name='Credit card number' onChange={(e) => this.handleCreditCardInput(e, creditcardRegEx)}/>
        </label>
        <label>
          CVV
          <input value={this.state.cvv} type='text' className="form-control" name='CVV' onChange={(e) => this.handleCVVInput(e, cvvRegEx)}/>
        </label>
        <label>
          Adress
          <input type='text' className="form-control" name='Adress'/>
        </label>
        <input type="submit" value="Buy" onClick={this.handleSubmit} />
      </form>
    </div>
    )
  }

  }
1
