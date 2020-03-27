const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

async function createPages (graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark (
        sort: { fields: [frontmatter___date], order: DESC }, filter: {fileAbsolutePath: {regex: "/^((?!\/blog\/).)*$/"}}
      ) {
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
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

async function createBlogPages(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark (
        sort: { fields: [frontmatter___date], order: DESC }, filter: {fileAbsolutePath: {regex: "/\/blog\//"}}
      ) {
        edges {
          node {
            frontmatter {
              title
            }
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
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)

  // Create each post individual page
  posts.forEach((post, index) => {
    const first = index === posts.length - 1 ? posts[0].node : null
    const last = index === 0 ? posts[posts.length - 1].node : null
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const page = parseInt(index/postsPerPage)
    const pageSlug = page === 0 ? `/` : `/blog/${page + 1}`

    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: post.node.fields.slug,
        pageSlug,
        previous,
        next,
        first,
        last,
      },
    })
  })

  // Create post list pages
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/blog/${i + 1}`,
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

exports.createPages = async ({ graphql, actions }) => {
  await createPages(graphql, actions)
  await createBlogPages(graphql, actions)
}

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

