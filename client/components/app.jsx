import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    this.getProducts();
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
        params: {
          id: params
        }
      }
    });
  }

  render() {
    let currentView = this.state.view;
    let clickedId = currentView.params.id;
    if (currentView.name !== 'catalog') {
      return (
        <div>
          <Header/>
          <ProductDetails setView={this.setView} id={clickedId}/>
        </div>
      );
    } else {
      return (
        <div>
          <Header/>
          <ProductList setView={this.setView} productList={this.state.products}/>
        </div>
      );
    }

  }
}

export default App;
