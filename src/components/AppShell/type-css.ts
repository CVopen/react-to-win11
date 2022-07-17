import React from 'react'
import styled from 'styled-components'

export interface IShellProps {
  children: React.ReactNode | React.ReactNode[]
  name: string
  width?: number
  height?: number
  time?: number
  top?: number
  left?: number
}

export interface IGlobalRef {
  enter: () => void
  leave: () => void
  hide: (offHand?: boolean) => void
}

export type SplitSetHandlerType = (params: { width: number; height: number; x: number; y: number }) => void

export interface ISplitProps {
  splitSetSize: SplitSetHandlerType
}

export const ShellDiv = styled.div`
  position: fixed;
  top: 100px;
  left: 100px;
  border-radius: ${(props) => props.theme.borderRadiusLarge};
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  color: ${(props) => (props.theme.name === 'dark' ? '#fff' : '#000')};
  .shell-body {
    overflow: auto;
    height: calc(100% - 30px);
    background-color: ${(props) => (props.theme.name === 'dark' ? '#000' : '#fff')};
    ::-webkit-scrollbar {
      width: 14px;
      border-left: 1px solid #fff;
    }
    ::-webkit-scrollbar-track {
      background-color: ${(props) => (props.theme.name === 'dark' ? '#000' : '#fff')};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${(props) => (props.theme.name === 'dark' ? '#202b36' : '#dde7f0')};
    }
  }
  img {
    pointer-events: auto;
  }
  .shell-header {
    background: ${(props) => props.theme.themeOpacity};
    height: 30px;
    display: flex;
    justify-content: space-between;
    .shell-header-status {
      img {
        filter: invert(${(props) => (props.theme.name === 'dark' ? 1 : 0)});
        padding: 7px 17px;
        &:hover {
          background: rgba(136, 136, 136, 0.2);
        }
        &:last-child {
          &:hover {
            background: rgba(${(props) => (props.theme.name === 'dark' ? '0,255,255' : '255,0,0')}, 0.8);
            img {
              filter: invert(1);
            }
          }
        }
      }
    }
  }
  .shell-split-screen {
    position: absolute;
    top: 35px;
    right: 30px;
    width: 244px;
    height: 0;
    opacity: 1;
    overflow: hidden;
    background: ${(props) => props.theme.themeOpacity};
    border-radius: ${(props) => props.theme.borderRadiusLarge};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 0 0 10px;
    transition: all ${(props) => props.theme.transitionSlow};
    .shell-split-screen-mode {
      width: 68px;
      margin: 0 10px 10px 0;
      height: 52px;
      display: flex;
      div {
        background-color: #d5d5d5;
        border: 1px solid #aaa;
        box-sizing: border-box;
        &:hover {
          background: ${(props) => props.theme.themeColor};
        }
      }
    }
    .mode-one {
      div {
        width: 33px;
        height: 100%;
      }
      div:nth-child(1) {
        margin-right: 4px;
      }
    }
    .mode-two {
      div {
        height: 100%;
      }
      div:nth-child(1) {
        width: 42px;
        margin-right: 4px;
      }
      div:nth-child(2) {
        flex: 1;
      }
    }
    .mode-three {
      div {
        height: 100%;
        width: 22px;
        margin-right: 4px;
      }
      div:nth-child(3) {
        margin-right: 0;
      }
    }
    .mode-four {
      position: relative;
      div {
        position: absolute;
        width: 32px;
        height: 24px;
      }
      div:nth-child(1) {
        height: 100%;
      }
      div:nth-child(2) {
        right: 0;
      }
      div:nth-child(3) {
        right: 0;
        bottom: 0;
      }
    }
    .mode-five {
      position: relative;
      div {
        position: absolute;
        width: 32px;
        height: 24px;
      }
      div:nth-child(2) {
        right: 0;
      }
      div:nth-child(3) {
        left: 0;
        bottom: 0;
      }
      div:nth-child(4) {
        right: 0;
        bottom: 0;
      }
    }
    .mode-six {
      div {
        height: 100%;
        width: 18px;
        margin-right: 4px;
      }
      div:nth-child(2) {
        width: 30px;
      }
      div:nth-child(3) {
        margin-right: 0;
      }
    }

    .block-radius-tl {
      border-top-left-radius: ${(props) => props.theme.borderRadiusLarge};
    }
    .block-radius-tr {
      border-top-right-radius: ${(props) => props.theme.borderRadiusLarge};
    }
    .block-radius-br {
      border-bottom-right-radius: ${(props) => props.theme.borderRadiusLarge};
    }
    .block-radius-bl {
      border-bottom-left-radius: ${(props) => props.theme.borderRadiusLarge};
    }
  }
`
