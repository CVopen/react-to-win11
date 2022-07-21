import React, { memo, MutableRefObject, useRef } from 'react'
import { AiOutlineUp } from 'react-icons/ai'

import useStatusEff from '@/hooks/useStatusEff'
import { useAppSelector } from '@/store'
import dayjs from 'dayjs'
import { IPreviewRef, TaskBarDiv } from '../type-css'
import TaskIcon from './TaskIcon'
import Icon from '@/components/Icon'
import TaskPreview from './TaskPreview'

function TaskBar() {
  const { boot, lock, appListTar } = useAppSelector(({ win }) => win)

  const previewRef = useRef() as MutableRefObject<IPreviewRef>

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
      <div className="task-middle" style={{ width: appListTar.length * 40 }}>
        {appListTar.map(({ src, hide, name }, index) => (
          <TaskIcon key={src} src={src} hide={hide} name={name} index={index} preview={previewRef.current} />
        ))}
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
      <TaskPreview ref={previewRef} width={appListTar.length * 40} />
    </TaskBarDiv>
  )
}

export default memo(TaskBar)
