import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.addToCart = this.addToCart.bind(this);
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

  setViewCallback() {
    let callback = this.props.setView;
    let catalog = 'catalog';
    callback(catalog, this.state.product);
  }

  addToCart() {
    let addCartCallback = this.props.addToCart; // add to cart method passed in from app.jsx
    addCartCallback(this.state.product[0]);
  }

  numberWithCommas(number) { // regex method to put in commas at thousands places
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {

    if (this.state.product !== null) {
      let product = this.state.product[0]; // index 0 because product comes in as an array with one element
      let imageUrl = product.image;
      const style = {
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      };
      return (
        <div className="container mt-5 border border-primary p-4">
          <div onClick={this.setViewCallback.bind(this)} className="cursor row mb-4">
            <div className="col text-secondary">&lt;Back to catalog</div>
          </div>
          <div className="row mt-4">
            <div className="col productItem" style={style}></div>
            <div className="text-center col-sm-6 mt-3">
              <div className="display-3">{product.name}</div><br/>
              <h3 className="font-weight-bold">${this.numberWithCommas(product.price)}</h3><br/>
              <div className="font-italic">{product.shortDescription}</div><br/>
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
