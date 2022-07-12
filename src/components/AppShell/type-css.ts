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
    display: flex;
    justify-content: space-between;
    .shell-header-status {
      display: flex;
      div {
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        img {
          filter: invert(${(props) => (props.theme.name === 'dark' ? 1 : 0)});
        }
        &:hover {
          background: rgba(136, 136, 136, 0.2);
        }
        &:last-child {
          &:hover {
            background: rgba(255, 0, 0, 0.8);
            img {
              filter: invert(1);
            }
          }
        }
      }
    }
  }
`
