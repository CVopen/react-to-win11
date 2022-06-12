import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import Loading from './components/Loading'
import { store, useAppDispatch, useAppSelector } from './store'
import { addCount } from './store/app'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { count } = useAppSelector(({ app }) => app)
  return (
    <div style={{ background: '#000' }}>
      <h1>win11 to react</h1>
      <h2>test</h2>
      <Loading style={{ background: 'red' }} />
      <Title>style-components</Title>
      <div>{count}</div>
      <button onClick={() => dispatch(addCount(1))}>add</button>
    </div>
  )
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
