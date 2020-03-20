import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import menuStyles from "./styles/menu.module.sass"

const MenuItem = props => (
  <li className={menuStyles.menuItem}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Menu = props => {
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
    <header>
      <Link to={`/`} className={menuStyles.logo}>
        <h3>
          {data.site.siteMetadata.author}
        </h3>
      </Link>

      <nav>
        <ul>
          <MenuItem to={`/`}>Home</MenuItem>
          <MenuItem to={`/about/`}>About</MenuItem>
        </ul>
      </nav>
    </header>
  )
}

export default Menu;
