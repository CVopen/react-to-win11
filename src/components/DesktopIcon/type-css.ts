import { desktopS } from '@/store/win/state'
import styled from 'styled-components'

export enum Size {
  small = '40px',
  middle = '48px',
  large = '60px',
}

interface DivProps {
  size: desktopS
  down: boolean
}

export interface IDesktopIconProps {
  onClick: () => void
  src: string
  name: string
}

export const DeskTopIconDiv = styled.div`
  width: ${({ size }: DivProps) => `${size === 'large' ? 104 : 74}px`};
  height: ${({ size }: DivProps) => `${size === 'large' ? 124 : 86}px`};
  border-radius: ${(props) => props.theme.borderRadiusMiddle};
  margin-top: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: ${({ size }: DivProps) => `${Size[size]}`};
    transition: all 0.4s;
    transform: ${({ down }: DivProps) => `scale(${down ? 0.7 : 1})`};
  }
  p {
    text-align: center;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 3px;
    color: #fafafa;
    font-size: 0.8rem;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
  }
`
