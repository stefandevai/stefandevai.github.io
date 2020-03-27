import Typography from "typography"
import kirkhamTheme from "typography-theme-kirkham"


kirkhamTheme.googleFonts = [
  {
    name: 'Playfair Display',
    //name: 'Arvo',
    styles: ['700'],
  },
  {
    name: 'Nunito',
    styles: ['400', '400i', '700', '700i'],
  },
]

kirkhamTheme.headerFontFamily = ['Playfair Display']
kirkhamTheme.bodyFontFamily = ['Nunito']

const typography = new Typography(kirkhamTheme)

export default typography
export const rhythm = typography.rhythm
