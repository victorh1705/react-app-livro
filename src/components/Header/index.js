import React, { useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation, withRouter } from 'react-router-dom'
import './index.css'
import logo from './logo.png'

const Header = () => {
  const history = useHistory()
  const location = useLocation()
  const [search, setSearch] = useState('')

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setSearch(searchParams.get('search') || '')
  }, [])

  const handleSearchKeydown = e => {
    if (e.key === 'Enter') {
      history.push(`/products?search=${search}`)
    }
  }

  const handleSearchChange = e => {
    setSearch(e.currentTarget.value)
  }

  return (
    <header className="header">
      <div className="search-container">
        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeydown}
        />
      </div>
      <img src={logo} className="header-logo" alt="logo" />
      <h1 className="header-title">React Shop</h1>
      <nav>
        <NavLink
          to="/products"
          className="header-link"
          activeClassName="header-link-active">
          Products
        </NavLink>
        <NavLink
          to="/admin"
          className="header-link"
          activeClassName="header-link-active">
          Admin
        </NavLink>
      </nav>
    </header>
  )
}

export default withRouter(Header)
