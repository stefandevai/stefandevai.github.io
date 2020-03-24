import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import Tag from "../components/tag"
import Img from "gatsby-image"

import postStyles from "./styles/post.module.sass"

export default (props) => {
  const post = props.data.markdownRemark
  let featuredImage = post.frontmatter.featuredImage
  let featuredImageCaption = post.frontmatter.featuredImageCaption
  let featuredImagePath = null
  let featuredImageFluid = null
  const { pageSlug, first, last, previous, next } = props.pageContext
  const tags = post.frontmatter.tags
    
  if (featuredImage) {
    featuredImageFluid = featuredImage.childImageSharp.fluid
    featuredImagePath = featuredImageFluid.src
  }

  return (
    <div>
      <SEO title={post.frontmatter.title} article={true} image={featuredImagePath} />
      <Layout>
        <section className={postStyles.post + " blog-post"}>
          <Link to={pageSlug} className={postStyles.goBack}><span>⟵  Go Back</span></Link>


          <h1 className={postStyles.postTitle}>{post.frontmatter.title}<span className={postStyles.square}> ◆</span></h1>
          {featuredImageFluid && (
            <div className={postStyles.featuredImage}>
              <Img fluid={featuredImageFluid} />
              {featuredImageCaption && <span className={postStyles.imageCaption}>{featuredImageCaption}</span>}
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
        
        <div className={postStyles.separator}><span>◆ ◆ ◆</span></div>
        <div className={postStyles.tags}>{tags ? ( tags.map((tag, index) => <Tag key={index} name={tag} />) ) : null}</div>
        <nav>
          <ul className={postStyles.bottomNavigation}>{
              next
                ? <Link to={next.fields.slug}><li className={postStyles.md}>⟵  {next.frontmatter.title}</li><li className={postStyles.sm}>⟵  Previous</li></Link>
                : <Link to={last.fields.slug}><li className={postStyles.md}>⟵  {last.frontmatter.title}</li><li className={postStyles.sm}>⟵  Previous</li></Link>}
            {
              previous
                ? <Link to={previous.fields.slug} className={postStyles.previousPost}><li className={postStyles.md}>{previous.frontmatter.title} ⟶</li><li className={postStyles.sm}>Next ⟶</li></Link>
                : <Link to={first.fields.slug} className={postStyles.previousPost}><li className={postStyles.md}>{first.frontmatter.title} ⟶</li><li className={postStyles.sm}>Next ⟶</li></Link>}
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
        featuredImageCaption
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
