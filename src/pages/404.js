import React from "react"
import Layout from "../components/layout"
import SEO from "../components/SEO"

export default ({ data }) => {
  return (
    <div>
      <SEO title="Not found" />
      <Layout>
        <h1>Not found</h1>
      </Layout>
    </div>
  )
}
