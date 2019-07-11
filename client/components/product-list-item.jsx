import React from 'react';

class ProductListItem extends React.Component {

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

      <div className="col img-fluid border border-primary m-3 p-3">
        <div className="productImage rounded mx-auto d-block" style={style}></div>
        <div className="text-center font-weight-bold">{product.name}</div>
        <div className="text-center">${product.price}</div>
        <div className="text-center font-italic">{product.shortDescription}</div>
      </div>

    );

  }

}

export default ProductListItem;
