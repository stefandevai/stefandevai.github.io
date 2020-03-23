import React from "react"
import { Link } from "gatsby"
import headerStyles from "./styles/header.module.sass"
import "./styles/header-logo-animation.sass"
import StefanDevaiLogo from "../../static/assets/svg/logo-stefan-devai.svg"

const MenuItem = props => (
  <li className={headerStyles.menuItem}>
    <Link to={props.to} activeClassName={headerStyles.active}>{props.children}</Link>
  </li>
)

const Header = props => {
  return(
    <header className={headerStyles.header}>
      <div className={headerStyles.content}>
        <nav>
          <Link to={`/`} className={headerStyles.logo}>
            <StefanDevaiLogo />
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
