import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/SEO"
import Img from "gatsby-image"
import aboutStyles from "./about.module.sass"

import GitHubIcon from "../../../static/assets/svg/github.svg"
import InstagramIcon from "../../../static/assets/svg/instagram.svg"
import EmailIcon from "../../../static/assets/svg/email.svg"

export default ({ data }) => {
  return (
    <div>
      <SEO title="About" />
      <Layout>
        <h1>About <span className="brand-diamond">◆</span></h1>
        <div className={aboutStyles.grid}>
          <Img className={aboutStyles.image} fluid={data.fileName.childImageSharp.fluid} alt="Picture of Stefan Devai" />
          <div className={aboutStyles.rectangle}></div>
          <div className={aboutStyles.lineTop}></div>
          <div className={aboutStyles.textWrapper}>
            <div className={aboutStyles.text}>
              <h2>Hi, I'm Stefan Devai :)</h2>
              <p>I'm a History student at the Sorbonne University in Paris and a Computer Science enthusiast. In this blog I can share some of my programming experiments and historical essays I've written.</p>
              <p>I actively use four languages for different aspects of my life, so you will find here posts in Spanish, Portuguese, English and French.</p>
              <p>I use <a href="https://wiki.archlinux.org/index.php/Arch_Linux" target="_blank" rel="noopener noreferrer">Arch Linux</a> as my main operating system, <a href="https://i3wm.org/" target="_blank" rel="noopener noreferrer">i3wm</a> as my window manager and both <a href="https://neovim.io/" target="_blank" rel="noopener noreferrer">NeoVim</a> / <a href="https://www.gnu.org/software/emacs/" target="_blank" rel="noopener noreferrer">GNU Emacs</a> as my text editors depending on the programming language.</p>
            </div>
          </div>
          <div className={aboutStyles.lineBottom}></div>

          <div className={aboutStyles.socialIcons}>
            <a href="https://github.com/stefandevai" target="_blank" rel="noopener noreferrer" aria-label="GitHub link"><GitHubIcon /></a>
            <a href="https://instagram.com/stedevai" target="_blank" rel="noopener noreferrer" aria-label="Instagram link"><InstagramIcon /></a>
            <a href="mailto:stefandevai@posteo.me" aria-label="Email Link"><EmailIcon /></a>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export const query = graphql`
  query {
    fileName: file(relativePath: { eq: "about/me.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
