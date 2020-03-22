import React from "react"
import heroStyles from "./styles/hero.module.sass"
import Scene from "./scene"

const Hero = props => {
  return (
    <section className={heroStyles.hero}>
      <Scene />
      <div className={heroStyles.content}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </section>
  )
}

export default Hero

