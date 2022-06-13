/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorContainer, ErrorPage, IErrorFallback, IErrorProps } from './type-css'

import code from '@/assets/code.png'

console.log(code)

function ErrorFallback({ error, resetErrorBoundary }: IErrorFallback) {
  return (
    <ErrorPage>
      <ErrorContainer>
        <h1>:(</h1>
        <h2>
          Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart
          for you.(0% complete)
        </h2>
        <div className="error-code">
          <img src={code} alt="cvopen" />
          <div>
            <h3>
              For more information about this issue and possible fixes, visit
              <br />
              <a href="https://github.com/CVopen/react-to-win11/issues">
                https://github.com/CVopen/react-to-win11/issues
              </a>
            </h3>
            <h4>
              If you call a support person, give them this info:
              <br />
              Stop Code: {error.message}
            </h4>
            <button onClick={resetErrorBoundary}>Try again</button>
          </div>
        </div>
      </ErrorContainer>
    </ErrorPage>
  )
}

const index: React.FC<IErrorProps> = ({ children }) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
}

export default index
