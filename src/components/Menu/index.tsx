import React, { forwardRef } from 'react'
import { IPosition, MenuDiv } from './type-css'

export default forwardRef((props: IPosition, ref) => {
  return (
    <MenuDiv {...props} ref={ref as React.MutableRefObject<HTMLDivElement | null>}>
      Menu
    </MenuDiv>
  )
})
