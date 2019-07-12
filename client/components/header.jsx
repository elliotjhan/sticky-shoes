import React from 'react';

class Header extends React.Component {

  handleClick() {
    let callback = this.props.setView;
    let cart = 'cart';
    let params = {};
    callback(cart, params);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-8 text-center mb-4 mt-3">
            <div className="text-primary display-3">
              <i className="fas fa-sleigh sleigh"></i>
                            Santa&#39;s Goodies
            </div>
          </div>
          <div className="col-6 col-md-4 text-right mt-3">
            <i onClick={this.handleClick.bind(this)} className="cursor fas fa-shopping-cart display-4 mr-5 mt-3 text-secondary">
              <span>
                <small> {this.props.cartLength} Items</small>
              </span>
            </i>
          </div>
        </div>
      </div>
    );

  }
}

export default Header;
