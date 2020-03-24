import React from "react"
import footerStyles from "./styles/footer.module.sass"

const Footer = props => {
  return(
    <footer>
      <section className={footerStyles.mainSection}>
      </section>

      <section className={footerStyles.bottom}>
        <p>This website is <a href="https://github.com/stefandevai/stefandevai.github.io/" target="_blank" rel="noopener noreferrer">open source</a>!</p>
      </section>
    </footer>
  )
}

export default Footer
