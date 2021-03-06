import React from 'react'
import PropTypes from 'prop-types'

import '../../data/products'

import './index.css'

const Product = ({ product, inBasket, onAddToBasket }) => {
  const handleAddClick = () => {
    onAddToBasket()
  }

  return (
    <>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <div>
        <ul className="product-reviews">
          {product.reviews &&
            product.reviews.map(review => (
              <li key={review.reviewer} className="product-reviews-item">
                <i>"{review.comment}"</i> - {review.reviewer}
              </li>
            ))}
        </ul>
      </div>
      <p className="product-price">
        {new Intl.NumberFormat('en-US', {
          currency: 'USD',
          style: 'currency',
        }).format(product.price)}
      </p>
      {!inBasket && <button onClick={handleAddClick}>Add to Basket</button>}
    </>
  )
}

Product.propTypes = {
  product: PropTypes.object,
  inBasket: PropTypes.bool,
  onAddToBasket: () => PropTypes.func,
}

export default Product
