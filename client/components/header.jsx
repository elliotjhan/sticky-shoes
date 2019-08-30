import React from 'react';

class Header extends React.Component {

  handleCartClick() {
    let setViewCallback = this.props.setView;
    let cart = 'cart';
    let params = {};
    setViewCallback(cart, params);
    this.props.getCartItems();
  }

  handleLandingPageViewClick() {
    let setViewCallback = this.props.setView;
    let landingPage = 'landingPage';
    let params = {};
    setViewCallback(landingPage, params);
  }

  render() {
    return (
      <div className="container-fluid headerContainer">
        <div className="row headerRow">
          <div className="col-lg-8 col-md-8 col-sm-8 text-left mb-3 mt-3 headerTitleContainer">
            <div className="headerTitle display-3">
              <div onClick={this.handleLandingPageViewClick.bind(this)} className="headerIcon align-middle mr-3">
              </div>
                Sticky Shoes
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 mt-3 headerCartContainer">
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
