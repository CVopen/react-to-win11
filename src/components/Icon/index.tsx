import React, { memo } from 'react'
import { IIcon, ImgIcon, Size } from './type-css'

function Icon({ src, style, size = 'middle', status = 'status', onClick, onMouseEnter, onMouseLeave }: IIcon) {
  return (
    <ImgIcon
      size={Size[size]}
      src={require(`@/assets/icon/${status}/${src}.svg`)}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}

export default memo(Icon)
