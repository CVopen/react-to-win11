import React, { memo } from 'react'
import { IIcon, ImgIcon, Size } from './type-css'

function Icon({ src, style, size = 'middle' }: IIcon) {
  return <ImgIcon size={Size[size]} src={src} style={style} />
}

export default memo(Icon)
