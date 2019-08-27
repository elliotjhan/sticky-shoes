import React from 'react';
import Quantity from './quantity';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1
    };
    this.addToCart = this.addToCart.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    this.retrieveProductById(this.props.id);
  }

  retrieveProductById(id) {
    fetch('/api/products.php?id=' + id)
      .then(response => {
        return response.json();
      }).then(myJson => {
        this.setState({ product: myJson });
      }).catch(error => {
        console.error('error: ', error);
      });
  }

  resetQuantity() {
    this.setState({
      quantity: 1
    });
  }

  setViewCallback() {
    let callback = this.props.setView;
    let catalog = 'catalog';
    callback(catalog, this.state.product);
  }

  addToCart() {
    let addCartCallback = this.props.addToCart; // add to cart method passed in from app.jsx
    let product = this.state.product;
    let quantity = this.state.quantity;
    addCartCallback(product, quantity);
    this.props.getCartItems();
  }

  numberWithCommas(number) { // regex method to put in commas at thousands places
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  increment() {
    let quantity = this.state.quantity;
    let newQuantity = ++quantity;
    this.setState({
      quantity: newQuantity
    });
  }

  decrement() {
    let quantity = this.state.quantity;
    let newQuantity = --quantity;
    this.setState({
      quantity: newQuantity
    });
  }

  render() {

    if (this.state.product !== null) {
      let product = this.state.product;
      let imageUrl = product.image[0];// temporarily set to 0 so image pops up for product details for all items
      const style = {
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      };
      return (
        <div className="container p-4 catalogItem my-5">
          <div onClick={this.setViewCallback.bind(this)} className="cursor row mb-4">
            <div className="col text-dark">&lt;Back to catalog</div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6 productItem" style={style}></div>
            <div className="text-center col-lg-6 mt-3">
              <div className="display-3">{product.name}</div><br/>
              <h3 className="font-weight-bold">${this.numberWithCommas(product.price)}</h3><br/>
              <div className="font-italic">{product.shortDescription}</div><br/>
              <Quantity increment={this.increment} decrement={this.decrement} quantity={this.state.quantity} />
              <button className="btn btn-primary" onClick={this.addToCart}>Add To Cart</button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">{product.longDescription}</div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

}

export default ProductDetails;
