import React, { memo, useEffect, useState } from 'react'
import { LockTimeDiv, LoginPage } from './type-css'
import dayjs from 'dayjs'

import Lock from '@/assets/img/lock.jpg'
import Icon from '@/components/Icon'

const WeekZh = ['一', '二', '三', '四', '五', '六', '日']

const LockTime = memo(() => {
  const [showTime, setShowTime] = useState({ time: '', date: '' })

  useEffect(() => {
    const setTime = () => {
      const nowTime = dayjs()
      setShowTime({
        time: nowTime.format('HH:mm'),
        date: `${nowTime.format('M月DD日')}, 星期${WeekZh[nowTime.day()]}`,
      })
    }
    const tiemr = setInterval(setTime, 1000)
    return () => {
      clearInterval(tiemr)
    }
  }, [])

  return (
    <LockTimeDiv>
      <div>
        <p>{showTime.time}</p>
        <p>{showTime.date}</p>
      </div>
      <Icon src={require('../../assets/icon/status/network-wired-symbolic.svg')} />
    </LockTimeDiv>
  )
})

export default function index() {
  return (
    <LoginPage style={{ backgroundImage: `url(${Lock})` }}>
      <LockTime />
    </LoginPage>
  )
}
