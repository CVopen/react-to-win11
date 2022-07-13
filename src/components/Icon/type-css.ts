import styled, { CSSProperties } from 'styled-components'

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
}

export const ImgIcon = styled.img`
  transition: all ${(props) => props.theme.transitionSlow};
  width: ${({ size }: { size: string }) => size};
  height: ${({ size }: { size: string }) => size}; ;
`
