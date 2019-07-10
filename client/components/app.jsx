import React from 'react';
import Header from './header';
import ProductList from './product-list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };

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

  render() {
    return (
      <div>

        <Header/>

        <ProductList productList={this.state.products}/>

      </div>

    );
  }

}

export default App;
