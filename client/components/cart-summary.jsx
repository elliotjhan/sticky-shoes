import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {

  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getCartTotal() {
    let cartTotal = null;
    this.props.cart.forEach(element => {
      cartTotal += element.price;
    });
    return this.numberWithCommas(cartTotal);
  }

  setViewCallback() {
    let callback = this.props.setView;
    let catalog = 'catalog';
    let params = {};
    callback(catalog, params);
  }

  setViewCheckout() {
    let callback = this.props.setView;
    let checkout = 'checkout';
    let params = {};
    callback(checkout, params);
  }

  render() {
    var cartItemArray = this.props.cart;
    var cartItemArrayDisplay = null;
    if (cartItemArray !== 0) {
      cartItemArrayDisplay = cartItemArray.map(element => {
        return <CartSummaryItem className="row" key={element.id} cart={element}/>;
      });
    }

    if (cartItemArrayDisplay !== null) {
      return (
        <div className="container">
          <div onClick={this.setViewCallback.bind(this)} className="cursor row text-secondary">&lt;Back to Catalog</div><br/>
          <div className="display-4 row">
            <div className="col">My Goodies:</div>
          </div>
          <div>
            {cartItemArrayDisplay}
          </div>
          <div className="row align-items-center">
            <h2 className="col text-left mt-3">Cart Total ${this.getCartTotal()}</h2>
            <div className="col text-right ">
              <button onClick={this.setViewCheckout.bind(this)} className="btn btn-primary">Checkout</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div onClick={this.setViewCallback.bind(this)} className="cursor row text-secondary">&lt;Back to Catalog</div><br/>
          <div className="row display-4">Cart Is Empty</div>
        </div>
      );
    }

  }

}

export default CartSummary;
