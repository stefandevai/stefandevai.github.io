import React from "react"
import layoutStyles from "./styles/layout.module.sass"

import Menu from "./menu"


export default ({ children }) => {
  return (<div className={layoutStyles.container}>
    <Menu />
    {children}
  </div>
  )
}
