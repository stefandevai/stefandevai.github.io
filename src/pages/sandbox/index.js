import React from "react"
import Layout from "../../components/layout"

export default ({ data }) => {
  return (
    <div>
      <Layout>
        <form action="/.netlify/functions/comment" method="POST">
          <label htmlFor="name">Name:</label><br/>
          <input type="text" name="name" /><br/>
          <label htmlFor="email">Email:</label><br/>
          <input type="text" name="email" /><br/>
          <label htmlFor="comment">Comment:</label><br/>
          <textarea name="comment" /><br/>
          <input type="submit" value="Submit"/>
        </form>
      </Layout>
    </div>
  )
}

