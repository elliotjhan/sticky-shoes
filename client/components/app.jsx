import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import LandingPage from './landing-page';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'landingPage',
        params: {}
      },
      cart: [],
      cartLength: 0
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.getCartLength = this.getCartLength.bind(this);
    this.updateCart = this.updateCart.bind(this);
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
        this.setState({
          products: myJson
        });
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
        }, this.getCartLength);
      })
      .catch(error => {
        console.error('error with cart retrieval: ', error);
      });
  }

  getCartLength() {
    let cart = this.state.cart;
    let cartArray = null;
    for (let i = 0; i < cart.length; i++) {
      cartArray += parseInt(cart[i].count);
    }
    this.setState({
      cartLength: cartArray
    });
  }

  addToCart(product, quantity) {
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify({
        id: parseInt(product.id),
        count: quantity
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(error => {
        console.error('Post Error: ', error);
      });
  }

  updateCart(productId, count) {
    fetch('/api/cart.php', {
      method: 'PUT',
      body: JSON.stringify({
        id: parseInt(productId),
        newCount: count
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(error => {
        console.error('Post Error: ', error);
      });
  }

  deleteFromCart(productId) {
    fetch('/api/cart.php', {
      method: 'DELETE',
      body: JSON.stringify({
        id: parseInt(productId)
      }),
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
          <Header getCartItems={this.getCartItems}
            cartLength={this.state.cartLength}
            setView={this.setView}/>
          <ProductDetails getCartItems={this.getCartItems}
            addToCart={this.addToCart}
            setView={this.setView}
            id={clickedId}/>
        </div>
      );
    } else if (currentView.name === 'catalog') {
      return (
        <div>
          <Header getCartItems={this.getCartItems}
            cartLength={this.state.cartLength}
            setView={this.setView}/>
          <ProductList setView={this.setView}
            productList={this.state.products}/>
        </div>
      );
    } else if (currentView.name === 'cart') {
      return (
        <div>
          <Header getCartItems={this.getCartItems}
            cartLength={this.state.cartLength}
            setView={this.setView}/>
          <CartSummary updateCart={this.updateCart}
            deleteFromCart={this.deleteFromCart}
            setView={this.setView}
            cart={this.state.cart}
            getCartItems={this.getCartItems}/>
        </div>
      );
    } else if (currentView.name === 'checkout') {
      return (
        <div>
          <Header getCartItems={this.getCartItems}
            cartLength={this.state.cartLength}
            setView={this.setView}/>
          <CheckoutForm cart={this.state.cart}
            setView={this.setView}
            placeOrder={this.placeOrder}/>
        </div>
      );
    } else if (currentView.name === 'landingPage') {
      return (
        <div>
          <LandingPage setView={this.setView} />
        </div>
      );
    }

  }
}

export default App;
