import AppShell from '@/components/AppShell'
import React, { memo } from 'react'

function Edge() {
  return (
    <AppShell name="Microsoft Edge">
      <div style={{ height: '200%' }}>Edge</div>
    </AppShell>
  )
}

export default memo(Edge)
