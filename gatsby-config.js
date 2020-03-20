module.exports = {
  siteMetadata: {
    title: `Historical Bits`,
    author: `Stefan Devai`,
    description: `Stefan Devai's blog about history and programming.`,
    longDescription: ``,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
  ],
}
