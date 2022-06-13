import styled, { CSSProperties } from 'styled-components'

export const Circle = styled.circle`
  stroke: white;
  stroke-width: 2px;
  transform-origin: 50% 50%;
  animation: 3s linear 0s infinite normal none running spin-infinite;
  @keyframes spin-infinite {
    0% {
      stroke-dasharray: 0.01px, 43.97px;
      transform: rotate(0deg);
    }
    50% {
      stroke-dasharray: 21.99px, 21.99px;
      transform: rotate(450deg);
    }
    100% {
      stroke-dasharray: 0.01px, 43.97px;
      transform: rotate(1080deg);
    }
  }
`

export const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export interface LoadingProps {
  style?: CSSProperties
}
