import styled from 'styled-components'

export interface IPosition {
  X: number
  Y: number
}

export const MenuDiv = styled.div`
  width: 240px;
  background-color: red;
  position: fixed;
  top: ${({ Y }: IPosition) => `${Y}px`};
  left: ${({ X }: IPosition) => `${X}px`};
`
