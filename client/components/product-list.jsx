import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {

  render() {
    const productList = this.props.productList;
    const eachProductList = productList.map(element => {
      return <ProductListItem key={element.id} product={element}/>;
    });
    return (
      <div className="container">
        {eachProductList}
      </div>
    );
  }

}

export default ProductList;
