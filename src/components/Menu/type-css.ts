import React from 'react'
import styled, { CSSProperties } from 'styled-components'

export interface IMenuProps {
  style?: CSSProperties
  show?: boolean
  children: React.ReactNode | React.ReactNode[]
}

interface IPosition {
  X: number
  Y: number
}

export const MenuDiv = styled.div`
  width: 240px;
  background-color: red;
  position: fixed;
  top: ${({ Y }: IPosition) => `${Y}px`};
  left: ${({ X }: IPosition) => `${X}px`};
  user-select: none;
`
