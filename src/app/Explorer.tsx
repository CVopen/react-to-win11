import AppShell from '@/components/AppShell'
import React, { memo } from 'react'

function Explorer({ name }: { name: string }) {
  return (
    <AppShell name={name}>
      <div style={{ height: '200%' }}>Explorer</div>
    </AppShell>
  )
}

export default memo(Explorer)
