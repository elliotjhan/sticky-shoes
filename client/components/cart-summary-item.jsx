import React from 'react';
import QuantityUpdate from './quantityUpdate';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleUpdateCallback = this.handleUpdateCallback.bind(this);
    this.handleDeleteCallback = this.handleDeleteCallback.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    this.handleCount();
  }

  numberWithCommas(number) {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  handleDeleteCallback() {
    let product = this.props.product;
    this.props.deleteFromCart(product.id);
    // setTimeout(()=> {
    //   this.props.getCartItems();
    // }, 200)
    this.props.getCartItems();

  }

  handleUpdateCallback() {
    let product = this.props.product;
    let newCount = this.state.count;
    this.props.updateCart(product.id, newCount);
    // setTimeout(()=> {
    //   this.props.getCartItems();
    // }, 200)
    this.props.getCartItems();

  }

  handleCount() {
    this.setState({
      count: this.props.count
    });
  }

  increment() {
    let count = this.state.count;
    let newCount = ++count;
    this.setState({
      count: newCount
    });
  }

  decrement() {
    let count = this.state.count;
    let newCount = --count;
    this.setState({
      count: newCount
    });
  }

  render() {
    let product = this.props.product;
    const style = {
      backgroundImage: `url(${product.image})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };
    return (
      <div className="container p-4">
        <div className="row mt-3">
          <div className="col productItem" style={style}></div>
          <div className="text-left col-sm-6 mt-3 text-center">
            <div className="display-4 cartProductName">{product.name}</div><br/>
            <div className="productPrice">${this.numberWithCommas(product.price)}</div>
            <QuantityUpdate increment={this.increment} decrement={this.decrement} quantity={this.state.count}/>
            <button onClick={this.handleUpdateCallback} className="btn btn-primary">Update</button><br/>
            <button onClick={this.handleDeleteCallback} className="btn btn-danger px-3 mt-2">Delete</button>
          </div>
        </div>
      </div>
    );
  }

}

export default CartSummaryItem;
