import AppShell from '@/components/AppShell'
import React, { memo } from 'react'

function Music() {
  return (
    <AppShell name="网易云">
      <div style={{ height: '200%' }}>Music</div>
    </AppShell>
  )
}

export default memo(Music)
