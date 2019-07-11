import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    this.retrieveProductById(1);
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

  render() {

    if (this.state.product !== null) {
      let product = this.state.product;
      let imageUrl = product.image;
      const style = {
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      };
      return (
        <div className="container">
          <div className="row">
            <div className="col productItem" style={style}></div>
            <div className="text-center col-sm-6 mt-3">
              <div className="display-4">{product.name}</div><br/>
              <div className="font-weight-bold">${product.price}</div><br/>
              <div className="font-italic">{product.shortDescription}</div>
            </div>
          </div>
          <div className="row">
            <div className="col">{product.longDescription}</div>
          </div>
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }

}

export default ProductDetails;
