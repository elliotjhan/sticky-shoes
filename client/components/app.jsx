import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  getProducts() {
    fetch('/api/products.php')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({ products: myJson });
      })
      .catch(error => {
        console.error('error: ', error);
      });
  }

  setView(name, params) { // main method to render the different pages based on key words catalog, details, cart, checkout
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart.php')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          cart: myJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  addToCart(product) {
    let cartArray = this.state.cart;
    cartArray.push(product);
    this.setState({
      cart: cartArray
    }, this.getCartTotal);
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(error => {
        console.error('Post Error: ', error);
      });
  }

  placeOrder(object) {
    let currentOrder = this.state.cart.push(object); // object in this case is the name, credit card, and address
    fetch('/api/orders.php', {
      method: 'POST',
      body: JSON.stringify(currentOrder),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(error => {
        console.error('Post Error: ', error);
      });
    this.setState({ // changes display back to main page after order is placed
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    });
  }

  render() {
    let currentView = this.state.view;
    let clickedId = currentView.params.id;
    if (currentView.name === 'details') {
      return (
        <div>
          <Header cartLength={this.state.cart.length} setView={this.setView}/>
          <ProductDetails addToCart={this.addToCart} setView={this.setView} id={clickedId}/>
        </div>
      );
    } else if (currentView.name === 'catalog') {
      return (
        <div>
          <Header cartLength={this.state.cart.length} setView={this.setView}/>
          <ProductList setView={this.setView} productList={this.state.products}/>
        </div>
      );
    } else if (currentView.name === 'cart') {
      return (
        <div>
          <Header cartLength={this.state.cart.length} setView={this.setView}/>
          <CartSummary setView={this.setView} cart={this.state.cart}/>
        </div>
      );
    } else if (currentView.name === 'checkout') {
      return (
        <div>
          <Header cartLength={this.state.cart.length} setView={this.setView}/>
          <CheckoutForm cart={this.state.cart} setView={this.setView} placeOrder={this.placeOrder}/>
        </div>
      );
    }

  }
}

export default App;
