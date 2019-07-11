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
    //   <div className="container">
    //       <div className="row">{eachProductList[0]} {eachProductList[1]} {eachProductList[2]}</div>
    //       <div className="row">{eachProductList[3]} {eachProductList[4]} {eachProductList[5]}</div>
    //       <div className="row">{eachProductList[6]} {eachProductList[7]} {eachProductList[8]}</div>
    //   </div>
      <div className="container">
        <div className="row">{eachProductList}</div>
      </div>
    );
  }

}

export default ProductList;
