import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <div className="text-center mb-4 mt-3 ml-5">
        <div className="text-primary d-inline-block display-3">
          <i className="fas fa-sleigh sleigh mr-3"></i>
                  Santa&#39;s Goodies
        </div>
        <i className="fas fa-shopping-cart float-right display-4 mr-5 mt-3 text-secondary">{this.props.cart}</i>
      </div>
    );

  }
}

export default Header;
