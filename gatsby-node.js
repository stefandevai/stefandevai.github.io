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

exports.createPages = async ({ graphql, actions }) => {
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

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    let templatePath = `./src/templates/blog-post.js`

    if (node.fileAbsolutePath.match(/[^\/]\/pages\/[^\/]/)) {
      templatePath = `./src/templates/page.js`
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
