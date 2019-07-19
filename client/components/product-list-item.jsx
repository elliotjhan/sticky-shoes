import React from 'react';

class ProductListItem extends React.Component {

  setViewCallback() {
    let product = this.props.product;
    let callback = this.props.setView;
    let details = 'details';
    callback(details, product);
  }

  numberWithCommas(number) {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    let product = this.props.product;
    let imageUrl = product.image[0]; // returns an array of images, 0 index because we want the main page to only show one picture

    const style = {
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };

    return (

      <div onClick={this.setViewCallback.bind(this)} className="col-4 mx-auto cursor">
        <div className="m-1 mb-4 border border-primary p-3">
          <div className="productImage mx-auto d-block" style={style}></div>
          <div className="text-center font-weight-bold">{product.name}</div>
          <div className="text-center">${this.numberWithCommas(product.price)}</div>
          <div className="text-center font-italic">{product.shortDescription}</div>
        </div>
      </div>

    );
  }

}

export default ProductListItem;
