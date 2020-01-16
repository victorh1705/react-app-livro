import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './index.css'
import { preProcessFile } from 'typescript'

const TabsContext = React.createContext({
  activeName: null,
  handleTabClick: null,
})

export const Tab = ({ name, initialActive, children }) => {
  return (
    <TabsContext.Consumer>
      {context => {
        const activeName = context.activeName
          ? context.activeName
          : initialActive
          ? name
          : ''

        const handleTabClick = e => {
          if (context.handleTabClick) {
            context.handleTabClick(name)
          }
        }

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

const Tabs = ({ headings, name, initialActive, children }) => {
  const [activeName, setActiveName] = useState(
    headings && headings.length > 0 ? headings[0] : '',
  )

  console.log('activeName :', activeName)

  const teste = () => 'ewew'

  const handleTabClick = name => {
    setActiveName(name)
  }

  return (
    <TabsContext.Provider value={{ active: activeName, handleTabClick }}>
      <ul className="tabs">{children}</ul>
    </TabsContext.Provider>
  )
}

Tabs.propTypes = {
  headings: PropTypes.array,
  name: PropTypes.string,
  initialActive: PropTypes.func,
}

export default Tabs
