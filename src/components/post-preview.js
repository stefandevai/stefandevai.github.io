import React from "react"
import { Link } from "gatsby"
import postPreviewStyles from "./styles/post-preview.module.sass"

const Tag = props => {
  return (
    <span className={`${postPreviewStyles.tag} ${props.tagClass}`}>
      {props.name}
    </span>
  )
}

const PostPreview = props => {
  let tags = props.node.frontmatter.tags

  return (
    <div className={postPreviewStyles.postPreview} key={props.node.id}>
      <span className={postPreviewStyles.date} >
        {props.node.frontmatter.date}
      </span>
      <h3>
        <Link to={props.node.fields.slug}>
          {props.node.frontmatter.title}{" "}
        </Link>
      </h3>
      <div className={postPreviewStyles.tags}>
        {props.node.frontmatter.language && <Tag name={props.node.frontmatter.language} tagClass={postPreviewStyles.languageTag} />}
        {tags ? ( tags.map((tag, index) => <Tag key={index} name={tag} />) ) : null}
      </div>
      <p>
        <Link to={props.node.fields.slug}>
        {props.node.excerpt}
        </Link>
      </p>
    </div>
  )
}

export default PostPreview
