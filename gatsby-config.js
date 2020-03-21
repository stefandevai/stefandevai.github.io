module.exports = {
  siteMetadata: {
    title: `Historical Bits`,
    titleTemplate: `%s | Historical Bits`,
    author: `Stefan Devai`,
    description: `Stefan Devai's blog about history and programming.`,
    siteUrl: `https://stefandevai.me`,
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-137064053-2",
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
         policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 800,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
        ],
      },
    },

    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
  ],
}
