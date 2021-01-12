import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import PostPreview from "../components/post-preview"
import Paginator from "../components/paginator"

export default (props) => {
  const { data } = props
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages } = props.pageContext

  return (
    <div>
      <SEO titleTemplate={`%s`}/>
      <Layout
        displayHero={currentPage === 1 && true}
        heroTitle={data.site.siteMetadata.title}
        heroDescription={data.site.siteMetadata.description}
      >
        <div>
          {
            posts.map(({ node }, index) => <PostPreview node={node} key={index} /> )
          }
          <Paginator currentPage={currentPage} numPages={numPages} />
        </div>
      </Layout>
    </div>
  )
}

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      filter: {fileAbsolutePath: {regex: "/\/blog\//"}},
      skip: $skip,
      limit: $limit,
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD-MMM-YYYY")
            language
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
