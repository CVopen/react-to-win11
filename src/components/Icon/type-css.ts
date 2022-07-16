import styled, { CSSProperties } from 'styled-components'
import React from 'react'

export enum Size {
  small = '16px',
  middle = '24px',
  large = '36px',
}

export interface IIcon {
  src: string
  style?: CSSProperties
  size?: 'large' | 'middle' | 'small'
  status?: 'status' | 'actions'
  onClick?: React.MouseEventHandler<HTMLImageElement>
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement>
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement>
}

export const ImgIcon = styled.img`
  transition: all ${(props) => props.theme.transitionSlow};
  width: ${({ size }: { size: string }) => size};
  height: ${({ size }: { size: string }) => size}; ;
`
