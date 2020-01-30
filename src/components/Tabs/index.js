import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './index.css'

const TabsContext = React.createContext({
  activeName: null,
  handleTabClick: null,
})

const Tab = ({ name, initialActive, heading, children }) => {
  return (
    <TabsContext.Consumer>
      {context => {
        if (!context.activeName && initialActive) {
          if (context.handleTabClick) {
            context.handleTabClick(name, children)
            return null
          }
        }

        const activeName = context?.activeName || initialActive || name || ''

        const handleTabClick = e => {
          console.log('clicou')
          context.handleTabClick(name, children)
        }

        return (
          <li
            onClick={handleTabClick}
            className={name === activeName ? 'active' : ''}>
            {heading()}
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

  const [activeContent, setActiveContent] = useState('')

  const handleTabClick = (name, content) => {
    setActiveName(name)
    setActiveContent(content)
  }

  return (
    <TabsContext.Provider
      value={{ activeName: activeName || '', handleTabClick }}>
      <ul className="tabs">{children}</ul>
      <div>{activeContent}</div>
    </TabsContext.Provider>
  )
}

Tabs.Tab = Tab
export default Tabs
