import gray from "gray-percentage"
import Typography from "typography"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"
//import kirkhamTheme from "typography-theme-kirkham"

//kirkhamTheme.googleFonts = []
  //{
    //name: 'Playfair Display',
    ////name: 'Arvo',
    //styles: ['700'],
  //},
  //{
    //name: 'Nunito',
    //styles: ['400', '400i', '700', '700i'],
  //},
//]

//kirkhamTheme.headerFontFamily = ['Bodoni Moda']
//kirkhamTheme.bodyFontFamily = ['Nunito']

const typography = new Typography({
  headerFontFamily: ['Bodoni Moda', 'serif'],
  bodyFontFamily: ['Nunito', 'sans-serif'],
  baseFontSize: "18px",
  baseLineHeight: 1.44,
  scaleRatio: 2.15,
  blockMarginBottom: 0.75,
  headerColor: "hsla(0,0%,0%,1)",
  bodyColor: "hsla(0,0%,0%,0.8)",
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    a: {
      color: "#9f392b",
    },
    blockquote: {
      ...scale(1 / 5),
      color: gray(41),
      fontStyle: "italic",
      paddingLeft: rhythm(13 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(3 / 16)} solid ${gray(80)}`,
    },
    "blockquote > :last-child": {
      marginBottom: 0,
    },
    "blockquote cite": {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    "blockquote cite:before": {
      content: '"— "',
    },
    [MOBILE_MEDIA_QUERY]: {
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
  }),
})

export default typography
export const rhythm = typography.rhythm
