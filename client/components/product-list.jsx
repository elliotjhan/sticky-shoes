import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {

  render() {
    let productList = this.props.productList;
    let callback = this.props.setView;
    const eachProductList = productList.map(element => {
      return (
        <ProductListItem setView={callback} key={element.id} product={element}/>
      );
    });

    return (
      <div className="catalogBody container-fluid">
        <div className="row banner mb-1"></div>
        <div className="row justify-content-center productListContainer">{eachProductList}</div>
      </div>
    );
  }

}

export default ProductList;
