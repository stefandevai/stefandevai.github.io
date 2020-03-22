import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import Tag from "../components/tag"

import postStyles from "./styles/post.module.sass"

export default (props) => {
  const post = props.data.markdownRemark
  let featuredImage = post.frontmatter.featuredImage
  let featuredImagePath = null
  const { pageSlug, first, last, previous, next } = props.pageContext
  const tags = post.frontmatter.tags
    
  if (featuredImage) {
    featuredImagePath = featuredImage.childImageSharp.fluid.src
  }

  return (
    <div>
      <SEO title={post.frontmatter.title} article={true} image={featuredImagePath} />
      <Layout>
        <section className={postStyles.post}>
          <Link to={pageSlug} className={postStyles.goBack}><span>⟵  Go Back</span></Link>
          <h1 className={postStyles.postTitle}>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
        
        <div className={postStyles.separator}><span>◆ ◆ ◆</span></div>
        <div className={postStyles.tags}>{tags ? ( tags.map((tag, index) => <Tag key={index} name={tag} />) ) : null}</div>
        <nav>
          <ul className={postStyles.bottomNavigation}>{
              next
                ? <Link to={next.fields.slug}><li>⟵  {next.frontmatter.title}</li></Link>: <Link to={last.fields.slug}><li>⟵  {last.frontmatter.title}</li></Link>}
            {
              previous
                ? <Link to={previous.fields.slug}><li>{previous.frontmatter.title} ⟶</li></Link>: <Link to={first.fields.slug}><li>{first.frontmatter.title} ⟶</li></Link>}
          </ul>
        </nav>
      </Layout>
      </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
