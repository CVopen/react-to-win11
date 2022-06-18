import { DivFull, DivFullCenter } from '@/assets/css/common'
import styled from 'styled-components'

export const LoginPage = styled(DivFull)`
  background-size: cover;
  background-repeat: no-repeat;
  user-select: none;
  position: relative;
`

export const LockTimeDiv = styled(DivFull)`
  div {
    color: #fff;
    width: 200px;
    margin: 0 auto;
    padding-top: 120px;
    text-align: center;
    font-weight: 700;
    p:first-child {
      font-size: 4rem;
    }
    p:last-child {
      font-size: 1.1rem;
    }
  }
`

export const LoginScreenDiv = styled(DivFullCenter)`
  backdrop-filter: blur(25px);
  background: rgba(0, 0, 0, 0.1);
  transform: translateY(30px);
  animation: bgc-blur 0.3s linear 0s 1 alternate forwards;
  opacity: 0;
  div {
    transform: translateY(100px);
    animation: move-top 0.2s linear 0s 1 alternate forwards;
    @keyframes move-top {
      0% {
        transform: translateY(100px);
      }
      100% {
        transform: translateY(-100px);
      }
    }
    text-align: center;
    p {
      font-size: 1.5rem;
      color: #fff;
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }
  @keyframes bgc-blur {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`
