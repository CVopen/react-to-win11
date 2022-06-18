import React from 'react'
import styled, { CSSProperties } from 'styled-components'

export const Input = styled.input`
  outline: none;
  width: 100%;
  height: 100%;
  background-color: #212121;
  font-size: 1rem;
  color: #fff;
  padding-left: 5px;
  padding-right: ${({ count }: { count: number }) => `${count * 24 + count ? 10 : 5}px`};
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  &::-webkit-selection {
    background: #ccc;
    color: #ff645d;
  }
  &:focus ~ em::after {
    background-color: pink;
    transform: scaleX(1);
  }
`

export const Span = styled.span`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.inputborderColor};
  display: inline-block;
  height: 36px;
  box-sizing: border-box;
  em {
    height: 3px;
    width: 100%;
    background-color: ${(props) => props.theme.inputborderColor};
    position: absolute;
    left: 0;
    bottom: 0;
    &::after {
      content: '';
      height: 3px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      transition: all 0.3s;
      transform: scaleX(0);
    }
  }
`

export const IconSpan = styled.span`
  position: absolute;
  right: ${({ count }: { count: number }) => `${count * 40 + 5}px`};
  bottom: 6px;
  width: 24px;
  height: 24px;
  background-color: #212121;
  padding: 4px;
  box-sizing: border-box;
  color: #b5b5b5;
  transition: all 0.2s;
  border-radius: 2px;
  &:hover {
    background-color: ${(props) => props.theme.inputborderColor};
  }
`

export interface IInputProps {
  clear?: boolean
  placeholder?: string
  icon?: React.ReactNode
  onChange?: (value: string) => void
  style?: CSSProperties
  password?: boolean
  value?: string
}
