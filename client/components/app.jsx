import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

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

  setView(name, params) {
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
    }

  }
}

export default App;
