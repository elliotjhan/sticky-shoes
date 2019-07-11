import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {

  render() {
    const productList = this.props.productList;
    const eachProductList = productList.map(element => {
      return (
        <ProductListItem key={element.id} product={element}/>
      );
    });

    return (
      <div className="container">
        <div className="row">{eachProductList[0]} {eachProductList[1]} {eachProductList[2]}</div>
        <div className="row">{eachProductList[3]} {eachProductList[4]} {eachProductList[5]}</div>
        <div className="row">{eachProductList[6]} {eachProductList[7]} {eachProductList[8]}</div>

      </div>
    );
  }

}

export default ProductList;
