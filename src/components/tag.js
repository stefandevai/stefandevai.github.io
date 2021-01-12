import React from "react"
import tagStyles from "./styles/tag.module.sass"

const Tag = props => {
  return (
    <span className={`${tagStyles.tag} ${props.tagClass}`}>
      {props.name}
    </span>
  )
}

export default Tag

