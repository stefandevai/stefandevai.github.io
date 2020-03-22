import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import PostPreview from "../components/post-preview"
import blogPageStyles from "./styles/blog-page.module.sass"

const BlogIntro = props => {
  return (
    <section className={blogPageStyles.blogIntro}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </section>
  )
}

const Paginator = props => {
  const isFirst = props.currentPage === 1
  const isLast = props.currentPage === props.numPages
  const previousPage = props.currentPage - 1 === 1 ? `/` : `blog/${props.currentPage - 1}`
  const nextPage = `blog/${props.currentPage + 1}`

  return (
    <ul className={blogPageStyles.paginator}>
      {
        isFirst
          ? (<li className={blogPageStyles.pageControlButton}>Previous Page</li>)
          : (<li><Link to={previousPage} rel="prev" className={blogPageStyles.pageControlButtonActive}>Previous Page</Link></li>)
      }

      {Array.from({ length: props.numPages }, (_, i) => (
        <li>
          <Link to={i === 0 ? "/" : `/blog/${i+1}`} activeClassName={blogPageStyles.pageNumberActive} >
            {i+1}
          </Link>
        </li>
      ))} 

      {
        isLast
          ? (<li className={blogPageStyles.pageControlButton}>Next Page</li>)
          : (<li><Link to={nextPage} rel="next" className={blogPageStyles.pageControlButtonActive}>Next Page</Link></li>)
      }
    </ul>
  )
}

export default (props) => {
  const { data } = props
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages } = props.pageContext

  return (
    <Layout>
      <SEO titleTemplate={`%s`}/>
        <BlogIntro
          title={data.site.siteMetadata.title}
          description={data.site.siteMetadata.description}
        /> 

      <div>
        {
          posts.map(({ node }, index) => <PostPreview node={node} key={index} /> )
        }
        <Paginator currentPage={currentPage} numPages={numPages} />
      </div>
    </Layout>
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
