import React from 'react'

import Explorer from '@/app/Explorer'
import Edge from '@/app/Edge'
import Music from '@/app/Music'

export const render = (name: string) => {
  const key = new Date().getTime()
  switch (name) {
    case 'Microsoft Edge':
      return <Edge key={key} />
    case '网易云':
      return [{ src: 'wy-music', name }, <Music key={key} />]
    case 'explorer':
      return <Explorer name="CVopen" key={key} />
    case 'Github':
      window.open('https://github.com/CVopen', '_blank')
      return null
    default:
      return <Explorer name={name} key={key} />
  }
}
