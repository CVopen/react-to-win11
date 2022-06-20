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
}

export const ImgIcon = styled.img`
  transition: 0.2s all;
  width: ${({ size }: { size: string }) => size};
  height: ${({ size }: { size: string }) => size}; ;
`