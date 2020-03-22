import React from "react"
import heroStyles from "./styles/hero.module.sass"

const Hero = props => {
  return (
    <section className={heroStyles.hero}>
      <div className={heroStyles.content}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </section>
  )
}

export default Hero

