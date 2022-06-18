import React, { memo, useEffect, useState } from 'react'
import { LockTimeDiv, LoginPage, LoginScreenDiv } from './type-css'
import dayjs from 'dayjs'

import Lock from '@/assets/img/lock.jpg'
import Icon from '@/components/Icon'
import Image from '@/components/Image'
import Input from '@/components/Input'
import { useAppDispatch } from '@/store'
import { wallunlock } from '@/store/win'

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
    </LockTimeDiv>
  )
})

const LoginScreen = memo(({ isLogin }: { isLogin: boolean }) => {
  const dispatch = useAppDispatch()

  const handleInput = (value: string) => {
    if (value.length < 4) return
    dispatch(wallunlock())
  }

  return (
    <LoginScreenDiv style={isLogin ? {} : { display: 'none' }}>
      <div>
        <Image width={200} height={200} src={require('../../assets/avatar.jpg')} style={{ borderRadius: '50%' }} />
        <p>CVopen</p>
        <Input
          style={{ width: 400 }}
          password
          onChange={handleInput}
          placeholder="Please enter your free four-digit password."
        />
      </div>
    </LoginScreenDiv>
  )
})

export default function index() {
  const [isLogin, setIsLogin] = useState(false)

  const startLogin = () => {
    setIsLogin(true)
  }

  return (
    <LoginPage style={{ backgroundImage: `url(${Lock})` }} onClick={startLogin}>
      {!isLogin && <LockTime />}
      <LoginScreen isLogin={isLogin} />
      <Icon
        style={{ position: 'absolute', bottom: '24px', right: '24px' }}
        src={require('../../assets/icon/status/network-wired-symbolic.svg')}
      />
    </LoginPage>
  )
}
