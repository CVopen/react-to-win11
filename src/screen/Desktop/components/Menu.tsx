import React, { memo } from 'react'

import Menu from '@/components/Menu'

function index() {
  return (
    <Menu>
      <div
        onClick={(e) => {
          console.log('desktop')
        }}
      >
        desktop
      </div>
    </Menu>
  )
}

export default memo(index)
