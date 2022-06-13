import styled from 'styled-components'

export const Div = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
`

export const Img = styled.img`
  width: 300px;
  animation: App-logo-spin infinite 16s linear;
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const LoadingDiv = styled.div`
  height: 200px;
  margin-top: 20rem;
`
