import React from "react"
import layoutStyles from "./styles/layout.module.sass"

import Header from "./header"
import Footer from "./footer"
import Hero from "./hero"

export default (props) => {
  return (<>
    <div className={layoutStyles.site}>
      <Header />
      {props.displayHero && <Hero title={props.heroTitle} description={props.heroDescription} />}
      <div className={layoutStyles.content}> {props.children} </div>
      <Footer />
    </div>
  </>
  )
}
