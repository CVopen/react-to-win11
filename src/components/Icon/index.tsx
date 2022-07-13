import React, { memo } from 'react'
import { IIcon, ImgIcon, Size } from './type-css'

function Icon({ src, style, size = 'middle', status = 'status' }: IIcon) {
  return <ImgIcon size={Size[size]} src={require(`@/assets/icon/${status}/${src}.svg`)} style={style} />
}

export default memo(Icon)
