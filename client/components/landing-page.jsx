import React from 'react';

class LandingPage extends React.Component {

  setViewCallback() {
    let callback = this.props.setView;
    let catalog = 'catalog';
    let object = {};
    callback(catalog, object);
  }

  render() {
    return (
      <div className="landingPage">
        <div className="container-fluid p-5">
          <br/>
          <div className="row">
            <div className="col landingPageTitle">Sticky Shoes</div>
          </div>
          <br/>
          <div className="row">
            <div className="col-8">
                            Welcome to Sticky Shoes! This is your one stop destination for all your rock climbing shoe needs.
                            No need to navigate from site to site. We here at Sticky Shoes co, have compiled the greatest and
                            hottest climbing shoes on the market.
            </div>
          </div>
          <br/><br/>
          <div className="row">
            <div className="col">
              <button onClick={this.setViewCallback.bind(this)} className="landingPageButton">Explore</button>
            </div>
          </div>
          <div className="row disclaimer">
            <div className="col text-right">
                            Disclaimer: This is not a real e-commerce site and is for demonstration purposes only
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default LandingPage;
