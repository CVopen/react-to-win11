import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { store, useAppSelector } from './store'
import Bootstrap from './screen/Bootstrap'

import './assets/css/reset.css'
import ErrorBoundary from './screen/ErrorBoundary'
import LoginLock from './screen/LoginLock'

import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import 'dayjs/locale/zh-cn'
import Desktop from './screen/Desktop'

dayjs.extend(isLeapYear)
dayjs.locale('zh-cn')

const App: React.FC = () => {
  const { boot } = useAppSelector(({ win }) => win)

  return (
    <ErrorBoundary>
      {boot && <Bootstrap />}
      <LoginLock />
      <Desktop />
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
