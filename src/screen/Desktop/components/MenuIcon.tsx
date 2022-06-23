import React, { memo } from 'react'

import Menu from '@/components/Menu'

function index({ isShow, active }: { isShow: boolean; active: { name: string; src: string } }) {
  return (
    <Menu show={isShow}>
      <div
        onClick={(e) => {
          console.log('desktop icon')
        }}
      >
        desktop icon
      </div>
    </Menu>
  )
}

export default memo(index)
