import Typography from "typography"
import kirkhamTheme from "typography-theme-kirkham"


kirkhamTheme.googleFonts = [
  {
    name: 'Playfair Display',
    styles: ['700'],
  },
  {
    name: 'Arvo',
    styles: ['400', '400i', '700', '700i'],
  },
]

kirkhamTheme.headerFontFamily = ['Playfair Display']
kirkhamTheme.bodyFontFamily = ['Arvo']

const typography = new Typography(kirkhamTheme)

export default typography
export const rhythm = typography.rhythm
