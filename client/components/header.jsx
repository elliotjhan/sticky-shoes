import React from 'react';

class Header extends React.Component {

  handleCartClick() {
    let callback = this.props.setView;
    let cart = 'cart';
    let params = {};
    callback(cart, params);
    this.props.getCartItems();
  }

  handleLandingPageViewClick() {
    let callback = this.props.setView;
    let landingPage = 'landingPage';
    let params = {};
    callback(landingPage, params);
  }

  render() {
    return (
      <div className="container-fluid headerContainer">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-8 text-left mb-3 mt-3">
            <div className="headerTitle display-3">
              <div onClick={this.handleLandingPageViewClick.bind(this)} className="headerIcon align-middle mr-3">
              </div>
                Sticky Shoes
            </div>
          </div>
          <div className="col-6 col-md-4 text-right mt-3">
            <div onClick={this.handleCartClick.bind(this)} className="cursor text-white shoppingCart">
              <div className="cartLength">
                {this.props.cartLength}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default Header;
