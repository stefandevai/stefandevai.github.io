const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

async function createPostsAndPages (graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    let templatePath = `./src/templates/page.js`

    if (node.fields.slug.match(`\/blog\/`)) {
      templatePath = `./src/templates/post.js`
    }

    createPage({
      path: node.fields.slug,
      component: path.resolve(templatePath),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

async function createBlogPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark (
        sort: { fields: [frontmatter___date], order: DESC }, filter: {fileAbsolutePath: {regex: "/\/blog\//"}}
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 3
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-page.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createPostsAndPages(graphql, actions, reporter)
  await createBlogPages(graphql, actions, reporter)
}
