/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { rhythm } from "../utils/typography"

const Bio = ({ displayImage = true }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter,
            github,
            flickr
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;
  return (
    <div
      style={{
        display: `flex`,
        alignItems: `center`,
        marginBottom: rhythm(2.5),
      }}
    >
      { displayImage && (
        <StaticImage
          src="../images/profile-pic.png"
          className="bio-avatar"
          alt={author.name}
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          placeholder="none"
          width={72}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 72,
            // borderRadius: `100%`,
          }}
          imgStyle={{
            // borderRadius: `50%`,
          }}
        />
        )}
      <p style={{
        marginBottom: 0,
      }}>
        Le dev, mais tranquille.
        <br />
        <a href="/a-propos">
          À propos
        </a>
      </p>
    </div>
  )
}

export default Bio
