import { DivFull } from '@/assets/css/common'
import styled from 'styled-components'

export const LoginPage = styled(DivFull)`
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 2s;
  user-select: none;
`

export const LockTimeDiv = styled(DivFull)`
  position: relative;
  img {
    position: absolute;
    bottom: 24px;
    right: 24px;
  }
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
