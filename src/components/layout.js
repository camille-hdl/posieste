import React from "react"
import { Link } from "gatsby"
import "../layout.css"
import { StaticImage } from "gatsby-plugin-image";

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      console.log({
        ...scale(1),
        marginBottom: rhythm(1),
        marginTop: 0,
      });
      header = (
        <h1
          style={{
            // ...scale(1),
            marginBottom: rhythm(1),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            Programmation<br />
            Orientée<br />
            Sieste
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
              display: `flex`,
              alignItems: `center`,
            }}
            to={`/`}
          >
            <StaticImage
              src="../images/profile-pic.png"
              className="title-image"
              layout="fixed"
              formats={["auto", "webp", "avif"]}
              placeholder="none"
              height={32}
              style={{
                display: `inline-block`,
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 32,
                // borderRadius: `100%`,
              }}
              imgStyle={{
                // borderRadius: `50%`,
              }}
              role="presentation"
            />
            <span>
              {title}
            </span>
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
