import React, {Component} from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Receipt } from './Receipt';
import './shadows.css';

export class Payview extends Component{
  constructor(props) {
      super(props);
      this.state = {
        fname: 'John',
        lname: 'Doe',
        email: 'example@email.com',
        creditcard:'xxxx xxxx xxxx xxxx',
        cvv: 'xxx',

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
      this.setState({ fname: res.firstName})
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
        <div>
        <form>
          <FormGroup
            className="forms payview-grid effect1"
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
          <div className="forms-fname">

            <label>
              First name:
              <FormControl value={this.state.fname}
                           className="form-pay"
                           type="text"
                           name="First name"
                           placeholder="First name"
                           onChange={this.handleFNameInput}/>
            </label>
            </div>
            <div className="forms-lname">
            <label>
              Last name:
              <FormControl value={this.state.lname}
                           className="form-pay"
                           type="text"
                           name="Last name"
                           placeholder="Last name"
                           onChange={this.handleLNameInput}/>
            </label>
            </div>
            <div className="forms-email">
            <label>
              Email
              <FormControl className="email-form form-control form-pay"
                           value={this.state.email}
                           type="email"
                           name="email"
                           placeholder="Email"
                           onChange={(e) => this.handleEmailInput(e, emailRegEx)}/>
            </label>
            </div>
            <div className="forms-card">
            <label>
              Credit card
              <FormControl value={this.state.creditcard}
                           type='text'
                           className="form-control form-pay"
                           name='Credit card number'
                           placeholder="Credit card number"
                           onChange={(e) => this.handleCreditCardInput(e, creditcardRegEx)}/>
            </label>
            </div>
            <div className="forms-cvv">
            <label>
              CVV
              <FormControl value={this.state.cvv}
                           type='text'
                           className="form-control form-pay"
                           name='CVV'
                           placeholder="CCV"
                           onChange={(e) => this.handleCVVInput(e, cvvRegEx)}/>
            </label>
            </div>
            <div className="forms-adress">
            <label>
              Adress
              <FormControl type='text'
                           className="form-control form-pay"
                           name='Adress'
                           placeholder="Adress"/>
            </label>
            </div>
            <div className="forms-btn">
              <FormControl className="buy-button"
                           type="submit"
                           value="Confirm payment"
                           onClick={this.handleSubmit} />
            </div>
          </FormGroup>

        </form>
        </div>
        <style jsx="true">{`

            .Payview-container{
              margin-top: 20px;
              font-family: 'Hind Siliguri', sans-serif;
            }
            .payview-grid{
              background: white;
              display: grid;
              grid-template-rows: 30% 30% 30% auto;
              grid-template-columns: 50% 50%;
              grid-template-areas:
                "forms-fname forms-lname"
                "forms-email forms-adress"
                "forms-card forms-cvv"
                "forms-btn forms-btn";
            }
            .form-pay{
              text-align: left;
              width: 100%;
              border-radius: 0;
              -webkit-appearance: none;
              -webkit-border-radius: 0px;
              padding-left: 8px;
            }
            .forms {
              width: 50%;
              height: 350px;
              margin: 0 auto;
              padding:0;
              background: white;
            }
            .forms-fname{
              display:grid;
              grid-area: forms-fname;
              padding: 10px;
            }
            .forms-lname{
              display:grid;
              grid-area: forms-lname;
              padding: 10px;
            }
            .forms-email{
              display:grid;
              grid-area: forms-email;
              padding: 10px;
            }
            .forms-adress{
              display:grid;
              grid-area: forms-adress;
              padding: 10px;
            }
            .forms-card{
              display:grid;
              grid-area: forms-card;
              padding: 10px;
            }
            .forms-cvv{
              display:grid;
              grid-area: forms-cvv;
              padding: 10px;
            }
            .forms-btn{
              display:grid;
              grid-area: forms-btn;
              background: grey;
            }
            .buy-button {
              border-style:none;
              color: white;
              width:100%;
              border-radius: 0;
              background: #56ab2f; /* fallback for old browsers */
              background: -webkit-linear-gradient(to right, #56ab2f, #6BB549); /* Chrome 10-25, Safari 5.1-6 */
              background: linear-gradient(to right, #56ab2f, #6BB549); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

            }
            .buy-button:hover {
              width:100%;
              border-radius: 0;
              background: #56ab2f; /* fallback for old browsers */
              background: -webkit-linear-gradient(to right, #3b771f, #4b653f); /* Chrome 10-25, Safari 5.1-6 */
              background: linear-gradient(to right, #3b771f, #4b653f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

            }
        `}</style>
      </div>
      )
    } else {
      return(
        <Receipt/>
      )
    }
  }
}
