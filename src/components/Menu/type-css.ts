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

export interface IState {
  X: number
  Y: number
  exist: boolean
}

export const MenuDiv = styled.div`
  width: 240px;
  background: ${(props) => props.theme.themeOpacity};
  color: ${(props) => props.theme.fontColor};
  position: fixed;
  top: ${({ Y }: IPosition) => `${Y}px`};
  left: ${({ X }: IPosition) => `${X}px`};
  user-select: none;
  border-radius: ${(props) => props.theme.borderRadiusLarge};
  font-size: 0.8rem;
`
