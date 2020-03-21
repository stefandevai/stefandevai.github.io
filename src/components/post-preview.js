import React from "react"
import { Link } from "gatsby"
import postPreviewStyles from "./styles/post-preview.module.sass"

const LanguageTag = props => {
  let lang, langClass

  switch (props.language) {
    case `es`:
      lang = `español`
      langClass = postPreviewStyles.es
      break
    case `pt`:
      lang = `português`
      langClass = postPreviewStyles.pt
      break
    case `fr`:
      lang = `français`
      langClass = postPreviewStyles.fr
      break
    case `en`:
      lang = `english`
      langClass = postPreviewStyles.en
      break
    default:
      lang = null
  }

  if (!lang) {
    return null;
  }

  return (
    <span class={`${postPreviewStyles.tag} ${langClass}`}>
      {lang}
    </span>
  )
}

const PostPreview = props => {
  return (
    <div className={postPreviewStyles.postPreview} key={props.node.id}>
      <span className={postPreviewStyles.date} >
        {props.node.frontmatter.date}
      </span>
      <Link to={props.node.fields.slug}>
        <h3>
          {props.node.frontmatter.title}{" "}
        </h3>
      </Link>
      <div>
        <LanguageTag language={props.node.frontmatter.language} />
      </div>
      <p>{props.node.excerpt}</p>
    </div>
  )
}

export default PostPreview
