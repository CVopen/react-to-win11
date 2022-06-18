import React from 'react'
import styled from 'styled-components'
import { DivFull } from '@/assets/css/common'

export interface IErrorProps {
  children?: React.ReactNode
}

export interface IErrorFallback {
  error: Error
  resetErrorBoundary: (...args: Array<unknown>) => void
}

export const ErrorPage = styled(DivFull)`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #1f67b1;
  color: #fff;
`

export const ErrorContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 4rem;
  font-weight: 300;
  h1 {
    font-size: 5rem;
    font-weight: 400;
    line-height: 8rem;
    margin-bottom: 20px;
  }
  h2 {
    line-height: 1.5rem;
    margin-bottom: 20px;
  }
  .error-code {
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    button {
      width: 100px;
      height: 30px;
    }
    a {
      color: #fff;
    }
  }
  @media screen and (max-width: 800px) {
    & {
      padding: 0 10px;
      img {
        width: 30%;
        object-fit: contain;
        margin-right: 10px;
      }
    }
  }
`
