import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import indexStyles from "./styles/index.module.sass"

const BlogIntro = props => {
  return (
    <section className={indexStyles.blogIntro}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </section>
  )
}

const PostPreview = props => {
  return (
    <div className={indexStyles.blogPreview} key={props.node.id}>
      <Link to={props.node.fields.slug}>
        <span className={indexStyles.date} >
        {props.node.frontmatter.date}
        </span>
        <h3>
          {props.node.frontmatter.title}{" "}
        </h3>
        <p>{props.node.excerpt}</p>
      </Link>
    </div>
  )
}

export default ({ data }) => {
  return (
    <Layout>
      <SEO titleTemplate={`%s`}/>
        <BlogIntro
          title={data.site.siteMetadata.title}
          description={data.site.siteMetadata.description}
        /> 

      <div>
        {
          data.allMarkdownRemark.edges.map(({ node }) => <PostPreview node={node} /> )
        }
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fileAbsolutePath: {regex: "/\/blog\//"}}) {
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
