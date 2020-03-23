module.exports = {
  siteMetadata: {
    title: `Historical Bits`,
    titleTemplate: `%s | Historical Bits`,
    author: `Stefan Devai`,
    description: `Stefan Devai's blog about history and programming.`,
    siteUrl: `https://stefandevai.me`,
    banner: `/images/banner.jpg`,
  },

  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: `${__dirname}/static/assets/` // See below to configure properly
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Stefan Devai's Blog",
        short_name: `Stefan Devai`,
        description: `Stefan Devai's blog about History and programming.`,
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#e32110",
        display: "standalone",
        icon: "static/favicon.png",
        crossOrigin: `use-credentials`,
      },
    },
  ],
}
