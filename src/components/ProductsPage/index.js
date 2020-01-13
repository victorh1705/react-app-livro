import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { products } from '../../data/products'
import './index.css'

const ProductsPage = () => {
  const location = useLocation()
  const [search, setSearch] = useState()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setSearch(searchParams.get('search') || '')
  }, [])

  return (
    <div className="page-container">
      <p>Welcome to React Shop where you can get all your tools for ReactJS!</p>
      <ul className="product-list">
        {products.map(product => {
          if (
            !search ||
            (search &&
              product.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
          ) {
            return (
              <li key={product.id} className="product-list-item">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </li>
            )
          } else {
            return null
          }
        })}
      </ul>
    </div>
  )
}

export default ProductsPage
