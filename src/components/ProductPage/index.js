import React, { useState, useEffect } from 'react'
import { useParams, Prompt } from 'react-router-dom'
import { products } from '../../data/products'
import Product from '../Product'

const ProductPage = () => {
  const [product, setProduct] = useState({})
  const [added, setAdded] = useState(false)
  let { id } = useParams()

  let navAwayMessage = 'Are you sure you leave without buying this product?'

  useEffect(() => {
    let idParam = parseInt(id)

    if (idParam) {
      const productAux = products.filter(p => p.id === idParam)[0]
      setProduct(productAux)
    }
  }, [])

  return (
    <div className="page-container">
      <Prompt when={!added} message={navAwayMessage} />
      {product ? (
        <Product
          product={product}
          inBasket={added}
          onAddToBasket={() => setAdded(true)}
        />
      ) : (
        <p>Product not found!</p>
      )}
    </div>
  )
}

export default ProductPage
