import React from "react"
import layoutStyles from "./styles/layout.module.sass"

import Header from "./header"
import Footer from "./footer"


export default ({ children }) => {
  return (<>
    <div className={layoutStyles.site}>
      <Header />
      <div className={layoutStyles.content}> {children} </div>
      <Footer />
    </div>
  </>
  )
}
