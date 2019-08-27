import React from 'react';
import Quantity from './quantity';

class CartSummaryItem extends React.Component {

  numberWithCommas(number) {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  handleDeleteCallback() {
    this.props.delete(this.props.cart);
  }

  render() {
    let product = this.props.cart;
    const style = {
      backgroundImage: `url(${product.image})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };
    return (
      <div className="container mt-4 p-4 pb-5">
        <div className="row mt-3">
          <div className="col productItem" style={style}></div>
          <div className="text-left col-sm-6 mt-3 text-center">
            <div className="display-4">{product.name}</div><br/>
            <h3 className="font-weight-bold">${this.numberWithCommas(product.price)}</h3>
            <Quantity quantity={this.props.count}/>
            <button onClick={this.handleDeleteCallback.bind(this)} className="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    );
  }

}

export default CartSummaryItem;
