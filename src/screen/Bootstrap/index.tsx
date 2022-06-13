import Loading from '@/components/Loading'
import { useAppDispatch } from '@/store'
import { bootstrapAsync } from '@/store/win/asyncThunk'
import React, { memo, useEffect } from 'react'
import { Div, Img, LoadingDiv } from './type-css'

import logo from '@/assets/logo.svg'

function index() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(bootstrapAsync())
  }, [])

  return (
    <Div>
      <Img src={logo} />
      <LoadingDiv>
        <Loading />
      </LoadingDiv>
    </Div>
  )
}

export default memo(index)
