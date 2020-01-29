import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './index.css'

const TabsContext = React.createContext({
  activeName: null,
  handleTabClick: null,
})

const Tab = ({ name, initialActive, children }) => {
  return (
    <TabsContext.Consumer>
      {context => {
        const activeName = context?.activeName || initialActive || name || ''

        const handleTabClick = e => {
          console.log('clicou')
          context.handleTabClick(name)
        }
        console.log('ativo :', activeName)

        return (
          <li
            onClick={handleTabClick}
            className={name === activeName ? 'active' : ''}>
            {children}
          </li>
        )
      }}
    </TabsContext.Consumer>
  )
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  initialActive: PropTypes.bool,
}

const Tabs = ({ headings, children }) => {
  const [activeName, setActiveName] = useState(
    headings?.length > 0 ? headings[0] : '',
  )

  console.log('activeName :', activeName)

  const handleTabClick = name => {
    setActiveName(name)
  }

  return (
    <TabsContext.Provider
      value={{ activeName: activeName || '', handleTabClick }}>
      <ul className="tabs">{children}</ul>
    </TabsContext.Provider>
  )
}

Tabs.Tab = Tab
export default Tabs
