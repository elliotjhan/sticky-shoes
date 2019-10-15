import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import LandingPage from './landing-page';
import OrderConfirmation from './order-confirmation';

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
      cartLength: 0,
      orderSummary: [],
      creditCard: null,
      shippingAddress: null,
      cartError: null,
      name: null,
      confirmationNumber: null
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.getCartLength = this.getCartLength.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.deleteEntireCart = this.deleteEntireCart.bind(this);
    this.storeOrderSummaryInfo = this.storeOrderSummaryInfo.bind(this);
    this.resetCardShippingName = this.resetCardShippingName.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.generateConfirmationNumber = this.generateConfirmationNumber.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
    this.generateConfirmationNumber();
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
        this.setState({
          cartError: error
        });
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

  deleteEntireCart(cartId) {
    fetch('/api/cart.php', {
      method: 'DELETE',
      body: JSON.stringify({
        cartId: parseInt(cartId)
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

  storeOrderSummaryInfo(cart) {
    this.setState({
      orderSummary: cart
    });
  }

  handleInput(event) {
    let value = event.target.value; // this updates state as the user types in their input through onChange
    let name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  resetCardShippingName() {
    this.setState({
      name: null,
      shippingAddress: null,
      creditCard: null
    });
  }

  generateConfirmationNumber() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const pool = [letters, numbers];
    let confirmationNumber = '';
    for (let i = 0; i < 10; i++) {
      let zeroOrOne = Math.floor(Math.random() * 2);
      let currentPool = pool[zeroOrOne];
      let currentSelection = currentPool[Math.floor(Math.random() * currentPool.length)];
      confirmationNumber += currentSelection;
    }
    this.setState({
      confirmationNumber: confirmationNumber
    });
  }

  render() {
    let currentView = this.state.view;
    let clickedId = currentView.params.id;
    if (currentView.name === 'details') {
      return (
        <div>
          <Header
            resetCardShippingName={this.resetCardShippingName}
            getCartItems={this.getCartItems}
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
          <Header
            resetCardShippingName={this.resetCardShippingName}
            getCartItems={this.getCartItems}
            cartLength={this.state.cartLength}
            setView={this.setView}/>
          <ProductList setView={this.setView}
            productList={this.state.products}/>
        </div>
      );
    } else if (currentView.name === 'cart') {
      return (
        <div>
          <Header
            resetCardShippingName={this.resetCardShippingName}
            getCartItems={this.getCartItems}
            cartLength={this.state.cartLength}
            setView={this.setView}/>
          <CartSummary
            updateCart={this.updateCart}
            deleteFromCart={this.deleteFromCart}
            setView={this.setView}
            cart={this.state.cart}
            getCartItems={this.getCartItems}/>
        </div>
      );
    } else if (currentView.name === 'checkout') {
      return (
        <div>
          <Header
            resetCardShippingName={this.resetCardShippingName}
            getCartItems={this.getCartItems}
            cartLength={this.state.cartLength}
            setView={this.setView}/>
          <CheckoutForm
            generateConfirmationNumber={this.generateConfirmationNumber}
            cart={this.state.cart}
            resetCardShippingName={this.resetCardShippingName}
            handleInput={this.handleInput}
            setView={this.setView}
            getCartItems={this.getCartItems}
            creditCard={this.state.creditCard}
            name={this.state.name}
            shippingAddress={this.state.shippingAddress}
            storeOrderSummaryInfo={this.storeOrderSummaryInfo}
            deleteEntireCart={this.deleteEntireCart}/>
        </div>
      );
    } else if (currentView.name === 'landingPage') {
      return (
        <div>
          <LandingPage setView={this.setView} />
        </div>
      );
    } else if (currentView.name === 'orderConfirmation') {
      return (
        <div>
          <Header
            resetCardShippingName={this.resetCardShippingName}
            getCartItems={this.getCartItems}
            setView={this.setView} />
          <OrderConfirmation
            confirmationNumber={this.state.confirmationNumber}
            name={this.state.name}
            shippingAddress={this.state.shippingAddress}
            orderSummary={this.state.orderSummary}
            setView={this.setView}
            resetCardShippingName={this.resetCardShippingName}
          />
        </div>
      );
    }

  }
}

export default App;
