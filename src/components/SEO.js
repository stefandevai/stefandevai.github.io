import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = props => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage,
          author,
        }
      }
    }) => {
      const seo = {
        title: props.title || defaultTitle,
        titleTemplate: props.titleTemplate || titleTemplate,
        description: props.description || defaultDescription,
        image: `${siteUrl}${props.image || defaultImage}`,
        url: `${siteUrl}${props.pathname || '/'}`,
      }

      return (
        <Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
          <link rel="canonical" href={seo.url} />
          <meta name="description" content={seo.description} />
          <meta name="image" content={seo.image} />

          {seo.url && <meta property="og:url" content={seo.url} />}
          {(props.article ? true : null) && (<meta property="og:type" content="article" />)}
          {seo.title && <meta property="og:title" content={seo.title} />}
          {seo.description && (<meta property="og:description" content={seo.description} />)}
          {seo.image && <meta property="og:image" content={seo.image} />}

          <meta name="twitter:card" content="summary_large_image" />
          {seo.title && <meta name="twitter:title" content={seo.title} />}
          {seo.description && (<meta name="twitter:description" content={seo.description} />)}
          {seo.image && <meta name="twitter:image" content={seo.image} />}
        </Helmet>
      )
    }}
  />
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  titleTemplate: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  titleTemplate: null,
  description: null,
  pathname: null,
  image: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        titleTemplate
        defaultTitle: title
        defaultDescription: description
        siteUrl
        defaultImage: banner
        author
      }
    }
  }
`
