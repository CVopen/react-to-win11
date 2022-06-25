import { CenteredDiv } from '@/assets/css/common'
import styled, { CSSProperties } from 'styled-components'

export interface IImgProps {
  fits?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  width?: number
  height?: number
}

export interface IImageProps extends IImgProps {
  src: string
  style?: CSSProperties
  onError?: Function
}

export type ImageStatus = 'pending' | 'success' | 'fail'

export const Image = styled.img`
  width: ${({ width }: IImgProps) => `${width}px`};
  height: ${({ height, width }: IImgProps) => `${height ? height : width}px`};
  object-fit: ${({ fits = 'fill' }: IImgProps) => fits};
  vertical-align: bottom;
`

export const LoadingDiv = styled(CenteredDiv)`
  width: ${({ width }: IImgProps) => `${width}px`};
  height: ${({ height, width }: IImgProps) => `${height ? height : width}px`};
  background-color: rgba(159, 159, 159, 0.5);
  overflow: hidden;
  display: inline-block;
  text-align: center;
  vertical-align: bottom;
`
