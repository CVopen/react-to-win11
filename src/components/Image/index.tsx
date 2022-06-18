import React, { memo, useEffect, useState } from 'react'
import Loading from '../Loading'
import { IImageProps, Image, LoadingDiv, ImageStatus, IImgProps } from './type-css'

function index(props: IImageProps) {
  const [status, setStatus] = useState<ImageStatus>('pending')

  useEffect(() => {
    const img = document.createElement('img')
    img.src = props.src
    img.onload = () => setStatus('success')

    img.onerror = function () {
      const onError = props.onError
      setStatus('fail')
      if (onError) {
        onError.apply(this, arguments)
      }
    }
  }, [])

  if (status === 'success') {
    return <Image {...(props as IImgProps)} />
  }
  return (
    <LoadingDiv style={props.style} width={props.width} height={props.height}>
      {status === 'fail' ? (
        <span style={{ color: '#fff', lineHeight: `${props.width}px`, fontSize: '1.5rem' }}>😢</span>
      ) : (
        <Loading fill="#5f5f5f" />
      )}
    </LoadingDiv>
  )
}

export default memo(index)
