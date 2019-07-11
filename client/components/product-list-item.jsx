import React from 'react';

class ProductListItem extends React.Component {

  setViewCallback() {
    let product = this.props.product;
    let callback = this.props.setView;
    callback(product.name, product.id);
  }

  render() {
    let product = this.props.product;
    let imageUrl = product.image;

    const style = {
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };

    return (

      <div onClick={this.setViewCallback.bind(this)} className="col-4 border border-primary p-4 rounded mx-auto">
        <div className="productImage mx-auto d-block" style={style}></div>
        <div className="text-center font-weight-bold">{product.name}</div>
        <div className="text-center">${product.price}</div>
        <div className="text-center font-italic">{product.shortDescription}</div>
      </div>

    );
  }

}

export default ProductListItem;
