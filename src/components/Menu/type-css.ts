import React from 'react'
import styled, { CSSProperties } from 'styled-components'

export interface IPosition {
  X: number
  Y: number
  ref?: React.MutableRefObject<HTMLDivElement | null>
  style?: CSSProperties
}

export const MenuDiv = styled.div`
  width: 240px;
  background-color: red;
  position: fixed;
  top: ${({ Y }: IPosition) => `${Y}px`};
  left: ${({ X }: IPosition) => `${X}px`};
  user-select: none;
`
