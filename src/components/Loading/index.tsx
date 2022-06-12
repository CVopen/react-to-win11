import React, { memo } from 'react'
import { Circle, Div, LoadingProps } from './type-css'

function Loading({ style }: LoadingProps) {
  return (
    <Div style={style || {}}>
      <svg height={48} width={48} viewBox="0 0 16 16">
        <Circle cx="8px" cy="8px" r="7px" />
      </svg>
    </Div>
  )
}

export default memo(Loading)
