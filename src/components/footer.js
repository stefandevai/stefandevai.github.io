import React from "react"
import "./styles/footer.module.sass"

const Footer = props => {
  return(
    <footer>
        <span>This website is <a href="https://github.com/stefandevai/stefandevai.github.io/" target="_blank" rel="noopener noreferrer">open source</a>!</span> 
        &nbsp;—&nbsp;
        <span>
          <a href="https://github.com/stefandevai" target="_blank" rel="noopener noreferrer">github</a>&nbsp;·&nbsp;
          <a href="https://instagram.com/stedevai" target="_blank" rel="noopener noreferrer">instagram</a>&nbsp;·&nbsp;
          <a href="mailto:stefandevai@posteo.me" target="_blank" rel="noopener noreferrer">email</a>&nbsp;·&nbsp;
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">rss</a>
        </span>
    </footer>
  )
}

export default Footer
