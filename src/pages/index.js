import React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image";

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Seo title="Articles" />
        <Bio displayImage={true} />
        <ol style={{ listStyle: `none`, marginLeft: 0 }}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <li key={node.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                <small>{node.frontmatter.date}</small>
                </header>
                <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
                </section>
                </article>
              </li>
            )
          })}
        </ol>
        <figure style={{
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <StaticImage
            src="../images/le_hamac_transparent.png"
            alt="Le Rêve, Gustave Courbet, 1844"
            placeholder="blurred"
            layout="constrained"
            width={500}
            style={{
              margin: "auto",
            }}
          />
        </figure>
      </Layout>
    )
  }
}

export default BlogIndex


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {fileAbsolutePath: {glob: "**/content/blog/**"}}
      sort: {frontmatter: {date: DESC}}) 
      {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "DD MMMM YYYY", locale: "fr")
              title
              description
            }
          }
        }
    }
  }
`
