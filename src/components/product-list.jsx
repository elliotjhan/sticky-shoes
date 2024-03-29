import React, { useEffect } from 'react';
import ProductListItem from './product-list-item';
import './../styles/product-list.css';
import Cookies from 'js-cookie';

const ProductList = (props) => {
  useEffect(() => { 
    Cookies.remove('currentProduct');
  });

  const eachProductList = props.productList.map(element => {
    return (
      <ProductListItem 
        key={element.productid} 
        setCurrentProduct={props.setCurrentProduct} 
        product={element}
        numberWithCommas={props.numberWithCommas}
      />
    );
  });

  return (
    <React.Fragment>
      <div className="row banner">
        <div className="layer">
          <div className="bannerTextContainer">
            <div className="bannerTitleText">SPECIALIZED CLIMBING</div>
            <div className="bannerText">Check out our elite performance shoes that will help you send the most difficult of problems!</div>
          </div>
        </div>
      </div>
      <div className="row justify-content-evenly">{eachProductList}</div>
    </React.Fragment>
  );
}

export default ProductList;
