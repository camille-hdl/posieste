/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { getSrc } from "gatsby-plugin-image"

function Seo({ description, title, children, image = null, lang = "fr" }) {
  const { site, ogImageDefault } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter,
              github
            }
            author {
              name,
              summary
            }
          }
        }
        ogImageDefault: file(relativePath: {eq: "default-image.png"}) { 
          childImageSharp {
              gatsbyImageData(width: 800)
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const siteUrl = site.siteMetadata?.siteUrl || ``;
  const defaultTitle = site.siteMetadata?.title;
  let ogImage = null;
  if (image) {
    ogImage = getSrc(image?.childImageSharp?.gatsbyImageData);
  } else if (ogImageDefault) {
    ogImage = getSrc(ogImageDefault?.childImageSharp?.gatsbyImageData);
  }
  return (
    <>
      <html lang={lang} />
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={"tesT"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  );
}

export default Seo
