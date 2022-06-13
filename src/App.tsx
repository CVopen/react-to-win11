import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { store, useAppSelector } from './store'
import Bootstrap from './screen/Bootstrap'

import './assets/css/reset.css'
import ErrorBoundary from './screen/ErrorBoundary'
import LoginLock from './screen/LoginLock'

const App: React.FC = () => {
  const { boot } = useAppSelector(({ win }) => win)

  return (
    <ErrorBoundary>
      {boot && <Bootstrap />}
      <LoginLock />
    </ErrorBoundary>
  )
}

export default () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  )
}
