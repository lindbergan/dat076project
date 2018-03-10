import React, {Component} from 'react';



export class Payview extends Component{
  constructor(props) {
      super(props);
      this.state = {
        value: 'Test123.',
        fname: 'John Doe'
      };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  handleChange(event) {
   this.setState({value: event.target.value});
   this.setState({fname: event.target.fname});
 }

 handleSubmit(event) {
   alert('An purchase was made: ' + this.state.value);
   event.preventDefault();
 }



    render() {
      const phoneRegEx = new RegExp(' /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;');

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
            <input value={this.state.fname} type="text" name="First name" onChange={this.handleChange}  validations={{matchRegexp:phoneRegEx}} validationErrors={{matchRegexp:'Enter a valid mobile.'}}/>
          </label>
          <label>
            Last name:
            <input type="text" name="Last name"/>
          </label>
          <label>
            Email
            <input type="email"  className="form-control" name="email"/>
          </label>
          <label>
            Credit card
            <input type='text' className="form-control" name='Credit card number'/>
          </label>
          <label>
            CVV
            <input type='text' className="form-control" name='CVV'/>
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
