import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "li": {
      marginBottom: "0",
    },
    "ul, ol": {
      marginLeft: "1rem",
    },
    "a": {
      color: "#b32f0c",
    }
  }
}

delete Wordpress2016.googleFonts
Wordpress2016.baseFontSize = "20px";
Wordpress2016.baseLineHeight = 1.8;
Wordpress2016.bodyWeight = 400;
Wordpress2016.boldWeight = 800;
const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
