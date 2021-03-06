import React from 'react'
import { withRouter } from 'react-router-dom'

const Sidebar = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default withRouter(Sidebar)
