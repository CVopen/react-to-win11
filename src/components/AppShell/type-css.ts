import React from 'react'
import styled from 'styled-components'

export interface IShellProps {
  children: React.ReactNode | React.ReactNode[]
  minWidth?: number
  minHeight?: number
  width?: number
  height?: number
  time?: number
  top?: number
  left?: number
}

export const ShellDiv = styled.div`
  position: fixed;
  top: 100px;
  left: 100px;
  border-radius: ${(props) => props.theme.borderRadiusLarge};
  overflow: hidden;
  .shell-header {
    background: ${(props) => props.theme.themeOpacity};
    height: 30px;
  }
`
