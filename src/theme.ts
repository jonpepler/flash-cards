import { css } from 'styled-components'

export const theme = {
  mainTextColour: 'white'
}

export const mainTextColour = css`
  color: ${(props) => props.theme.mainTextColour};
`
