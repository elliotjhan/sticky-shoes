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

      <div className="img-fluid row border border-primary mb-3 p-3">
        <div className="col productImage" style={style}></div>
        <div className="col align-self-center font-weight-bold">{product.name}</div>
        <div className="col align-self-center">${product.price}</div>
        <div className="col align-self-center font-italic">{product.shortDescription}</div>
      </div>

    );

  }

}

export default ProductListItem;
