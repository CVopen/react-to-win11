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
import { ThemeProvider } from 'styled-components'
import themeData from './assets/css/theme'

dayjs.extend(isLeapYear)
dayjs.locale('zh-cn')

const App: React.FC = () => {
  const { boot, lock, theme } = useAppSelector(({ win }) => win)

  return (
    <ThemeProvider theme={themeData[theme]}>
      <ErrorBoundary>
        {boot && <Bootstrap />}
        {lock && <LoginLock />}
        <Desktop />
      </ErrorBoundary>
    </ThemeProvider>
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
