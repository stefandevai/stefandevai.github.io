import React from "react"
import heroStyles from "./styles/hero.module.sass"

const Scene = React.lazy(() => import("./scene"))

const Hero = props => {
  const isSSR = typeof window === "undefined"

  return (
    <section className={heroStyles.hero}>
      {!isSSR && (
        <React.Suspense fallback={<div className={heroStyles.scenePlaceholder}/>}>
          <Scene />
        </React.Suspense>
      )}

      <div className={heroStyles.content}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </section>
  )
}

export default Hero

