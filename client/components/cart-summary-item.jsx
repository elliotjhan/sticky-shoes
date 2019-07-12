import React from 'react';

class CartSummaryItem extends React.Component {

  render() {
    let product = this.props.cart;
    const style = {
      backgroundImage: `url(${product.image})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };
    return (
      <div className="container mt-5 border border-primary p-4">
        <div className="row mt-4">
          <div className="col productItem" style={style}></div>
          <div className="text-left col-sm-6 mt-3">
            <div className="display-3 text-left">{product.name}</div><br/>
            <h3 className="font-weight-bold text-left">${product.price}</h3><br/>
            <div className="font-italic text-left">{product.shortDescription}</div>
          </div>
        </div>
      </div>
    );
  }

}

export default CartSummaryItem;
