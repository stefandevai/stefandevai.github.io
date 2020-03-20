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
          author,
        }
      }
    }) => {
      const seo = {
        title: props.title || defaultTitle,
        titleTemplate: props.titleTemplate || titleTemplate,
        description: props.description || defaultDescription,
        url: `${siteUrl}${props.pathname || '/'}`,
      }

      return (
        <>
          <Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
            <meta charSet="utf-8" />
            <meta name="description" content={seo.description} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {(props.article ? true : null) && (
              <meta property="og:type" content="article" />
            )}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
              <meta property="og:description" content={seo.description} />
            )}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
              <meta name="twitter:description" content={seo.description} />
            )}
          </Helmet>
        </>
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
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  titleTemplate: null,
  description: null,
  pathname: null,
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
        author
      }
    }
  }
`
