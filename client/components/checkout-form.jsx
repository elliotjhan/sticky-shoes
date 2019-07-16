import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      creditCard: null,
      shippingAddress: null
    };
    this.handleInput = this.handleInput.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
  }

  numberWithCommas(number) {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getCartTotal() {
    let cartTotal = null;
    this.props.cart.forEach(element => {
      cartTotal += parseFloat(element.price); // using the array forEach method to get the total amount of all prices
    });
    return this.numberWithCommas(cartTotal);
  }

  handleInput(event) {
    let value = event.target.value; // this updates state as the user types in their input through onChange
    let name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handlePlaceOrder() {
    let placeOrder = this.props.placeOrder; // callback function goes back to app.jsx with the credit card info etc
    placeOrder(this.state);
  }

  handleSetView() {
    let setView = this.props.setView;
    let catalog = 'catalog';
    let params = 'params';
    setView(catalog, params);
  }

  render() {
    return (
      <div className="container mt-3 checkout">
        <div className="row">
          <div className="col">
            <div className="display-4">Checkout</div>
                        Order Total: ${this.getCartTotal()}
          </div>
        </div>
        <br/>
        <br/>
        <div className="row">
          <div className="col">
                        Name <br/>
            <input className="form-control" name="name" type="text" onChange={this.handleInput}/>
          </div>
        </div> <br/>
        <div className="row">
          <div className="col">
                        Credit Card <br/>
            <input className="form-control" name="creditCard" type="text" onChange={this.handleInput}/>
          </div>
        </div> <br/>
        <div className="row">
          <div className="col">
                        Shipping Address <br/>
            <textarea rows="4" className="form-control" name="shippingAddress" type="text" onChange={this.handleInput}/>
          </div>
        </div>
        <div className="row mt-2">
          <div onClick={this.handleSetView.bind(this)} className="col cursor text-secondary">
                        &lt;Continue Shopping
          </div>
          <div className="col text-right">
            <button className="btn btn-primary" onClick={this.handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
