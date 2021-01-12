module.exports = {
  siteMetadata: {
    title: `Temporal Geometry`,
    titleTemplate: `%s | Temporal Geometry`,
    author: `Stefan Devai`,
    description: `Stefan Devai's blog about History and programming.`,
    siteUrl: `https://stefandevai.me`,
    banner: `/assets/images/banner.jpg`,
  },

  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
        indentedSyntax: true,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
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
        color: `#e32110`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              //showLineNumbers: true,
              noInlineHighlight: false,
            }
          },
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
        background_color: "#111111",
        theme_color: "#e32110",
        display: "standalone",
        icon: "static/favicon.png",
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-feed`,
  ],
}
