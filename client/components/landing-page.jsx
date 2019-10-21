import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  setViewCallback() {
    let callback = this.props.setView;
    let catalog = 'catalog';
    let object = {};
    callback(catalog, object);
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    return (
      <div className="landingPage">
        <div className="container-fluid p-5 landingPageContainer">
          <br/>
          <div className="row">
            <div className="col landingPageTitle">Sticky Shoes</div>
          </div>
          <br/>
          <div className="row">
            <div className="col-lg-8 col-sm-10 siteInfo">
                            Welcome to Sticky Shoes! This is the one stop destination for all your rock climbing shoe needs.
                            No need to navigate from site to site. We here at Sticky Shoes co. have compiled the greatest and
                            hottest climbing shoes on the market.
            </div>
          </div>
          <br/><br/>
          <div className="row">
            <div className="col">
              <button onClick={this.toggleModal.bind(this)} className="landingPageButton">Explore</button>
            </div>
          </div>
        </div>

        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader>
            We hope you enjoy your time here
          </ModalHeader>
          <ModalBody>
            Disclaimer: This is not a real e-commerce site and is for demonstration purposes only.
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.setViewCallback.bind(this)} color="primary">Agree</Button>
          </ModalFooter>
        </Modal>

      </div> // container closing tag
    );

  }

}

export default LandingPage;
