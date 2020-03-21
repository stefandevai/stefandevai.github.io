import React from "react"
import layoutStyles from "./styles/layout.module.sass"

import Header from "./header"


export default ({ children }) => {
  return (<div>
    <Header />

    <div className={layoutStyles.container}>
    {children}
    </div>
  </div>
  )
}
