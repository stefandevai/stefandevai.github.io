import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"

export default ({ data }) => {
  const post = data.markdownRemark
  let featuredImage = post.frontmatter.featuredImage
  let featuredImagePath = null
    
  if (featuredImage) {
    featuredImagePath = featuredImage.childImageSharp.fluid.src
  }

  return (
    <>
      <Layout>
        <SEO title={post.frontmatter.title} image={featuredImagePath} />

        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </Layout>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
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
