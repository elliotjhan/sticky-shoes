import React from 'react';

class CartSummaryItem extends React.Component {

  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    let product = this.props.cart;
    const style = {
      backgroundImage: `url(${product.image})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };
    return (
      <div className="container mt-5 border border-primary p-4 pb-5">
        <div className="row mt-4">
          <div className="col productItem" style={style}></div>
          <div className="text-left col-sm-6 mt-3">
            <div className="display-3 text-left">{product.name}</div><br/>
            <h3 className="font-weight-bold text-left">${this.numberWithCommas(product.price)}</h3><br/>
            <div className="font-italic text-left">{product.shortDescription}</div>
          </div>
        </div>
      </div>
    );
  }

}

export default CartSummaryItem;
