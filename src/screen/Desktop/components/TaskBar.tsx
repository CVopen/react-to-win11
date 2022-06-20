import { useAppSelector } from '@/store'
import React, { memo } from 'react'
import { TaskBarDiv } from '../type-css'

function TaskBar() {
  const { boot, lock } = useAppSelector(({ win }) => win)

  if (boot || lock) return null
  return <TaskBarDiv>TaskBar</TaskBarDiv>
}

export default memo(TaskBar)
