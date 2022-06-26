import React, { memo } from 'react'
import { AiOutlineUp } from 'react-icons/ai'

import useStatusEff from '@/hooks/useStatusEff'
import { useAppSelector } from '@/store'
import dayjs from 'dayjs'
import { TaskBarDiv } from '../type-css'
import TaskIcon from './TaskIcon'
import Icon from '@/components/Icon'

function TaskBar() {
  const { boot, lock } = useAppSelector(({ win }) => win)
  const effect = () => {
    const setTime = () => {
      const nowTime = dayjs()
      setShowTime({
        time: nowTime.format('HH:mm'),
        date: nowTime.format('YYYY/MM/DD'),
      })
    }
    const tiemr = setInterval(setTime, 1000)
    return () => clearInterval(tiemr)
  }
  const [{ time, date }, setShowTime] = useStatusEff({ time: '', date: '' }, effect, [])

  if (boot || lock) return null
  return (
    <TaskBarDiv>
      <div className="task-left">
        <TaskIcon src="widget" hide />
      </div>
      <div className="task-middle">
        <TaskIcon src="home" hide />
        <TaskIcon src="search" hide />
        <TaskIcon src="settings" hide />
        <TaskIcon src="explorer" />
        <TaskIcon src="edge" />
      </div>
      <div className="task-right">
        <div className="task-right-up">
          <AiOutlineUp size={13} />
        </div>
        <div className="task-right-status">
          <Icon size="small" src="network-wired-symbolic" />
          <Icon size="small" src="audio-volume-high-symbolic" />
        </div>
        <div className="task-rigth-date">
          <span>{time}</span> <span>{date}</span>
        </div>
      </div>
    </TaskBarDiv>
  )
}

export default memo(TaskBar)
