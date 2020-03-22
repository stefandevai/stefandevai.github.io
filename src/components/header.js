import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import headerStyles from "./styles/header.module.sass"

const MenuItem = props => (
  <li className={headerStyles.menuItem}>
    <Link to={props.to} activeClassName={headerStyles.active}>{props.children}</Link>
  </li>
)

const Header = props => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  )

  return(
    <header className={headerStyles.header}>
      <div className={headerStyles.content}>
        <nav>
          <Link to={`/`} className={headerStyles.logo}>
            <h3>
              {data.site.siteMetadata.author}
            </h3>
          </Link>

          <ul>
            <MenuItem to={`/about/`}>About</MenuItem>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
