import React, { memo, useCallback, useRef, useState } from 'react'
import { IInputProps, Input, Span, IconSpan } from './type-css'

import { AiOutlineClose, AiFillEye } from 'react-icons/ai'

function index({ onChange, clear, icon, style, placeholder = 'Please enter', password, value }: IInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [exist, setExist] = useState(false)

  const onClear = () => {
    ;(inputRef.current as HTMLInputElement).value = ''
    if (onChange) onChange('')
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setExist(Boolean(e.target.value))
    if (onChange) onChange(e.target.value)
  }, [])

  const calcCount = () => {
    if (icon && clear) return 2
    if (icon || !clear) return 1
    if (!icon || (clear && exist)) return 1
    return 0
  }

  const handleMouseDown = useCallback(() => {
    ;(inputRef.current as HTMLInputElement).type = 'text'
  }, [])

  const handleMouseup = useCallback(() => {
    ;(inputRef.current as HTMLInputElement).type = 'password'
  }, [])

  return (
    <Span style={style}>
      <Input
        ref={inputRef}
        type={password ? 'password' : 'text'}
        placeholder={placeholder}
        count={calcCount()}
        onChange={handleInputChange}
        value={value}
      />
      <em> </em>
      {clear && exist && !password && (
        <IconSpan count={icon ? 1 : 0}>
          <AiOutlineClose onClick={onClear} />
        </IconSpan>
      )}
      {password && (
        <IconSpan count={0} onMouseDown={handleMouseDown} onMouseUp={handleMouseup}>
          <AiFillEye />
        </IconSpan>
      )}
      {icon && !password && <IconSpan count={0}>{icon}</IconSpan>}
    </Span>
  )
}

export default memo(index)
