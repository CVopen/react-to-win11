import { CenteredDiv, DivFull } from '@/assets/css/common'
import styled from 'styled-components'

export const DesktopPage = styled(DivFull)`
  background-size: cover;
  background-repeat: no-repeat;
  user-select: none;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 48px;
`

export const DesktopIconDiv = styled.div`
  width: 0;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

export interface IPreviewRef {
  setUrl: (url: string[], name: string, index: number) => void
  close: () => void
}

export const TaskBarDiv = styled(CenteredDiv)`
  width: 100%;
  height: 48px;
  background: ${(props) => props.theme.themeOpacity};
  color: ${(props) => props.theme.fontColor};
  font-size: 0.7rem;
  font-weight: 400;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 10px;
  justify-content: space-between;
  z-index: 999;
  .task-middle {
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: all ${(props) => props.theme.transitionSlow} ease-in-out;
  }
  .task-right {
    display: flex;
    align-items: center;
    height: 100%;
    div {
      transition: all ${(props) => props.theme.transitionSlow} ease-in-out;
      border-radius: ${(props) => props.theme.borderRadiusMiddle};
      &:hover {
        background-color: rgba(255, 255, 255, ${(props) => (props.theme.name === 'dark' ? 0.2 : 0.8)});
      }
    }
    .task-right-up {
      height: 100%;
      width: 20px;
      border-radius: 0;
      line-height: 48px;
      text-align: center;
    }
    .task-rigth-date {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      padding: 4px;
      padding-left: 10px;
    }
    .task-right-status {
      img {
        margin: 10px 4px;
        filter: invert(${(props) => (props.theme.name === 'dark' ? 0 : 1)});
      }
    }
  }

  .task-preview {
    position: absolute;
    top: -130px;
    transform: translateX(-50%);
    height: 120px;
    background: ${(props) => props.theme.themeOpacity};
    display: flex;
    border-radius: ${(props) => props.theme.borderRadiusLarge};
    overflow: hidden;
    .task-preview-item {
      transition: all ${(props) => props.theme.transitionSlow} ease-in-out;
      box-sizing: border-box;
      padding: 8px;
      padding-top: 5px;
      display: flex;
      align-items: center;
      flex-direction: column;
      &:hover {
        background-color: rgba(255, 255, 255, ${(props) => (props.theme.name === 'dark' ? 0.2 : 0.8)});
      }
      img {
        max-width: 104px;
        height: 80px;
        object-fit: contain;
        text-align: center;
      }
      div {
        width: 100%;
        height: 24px;
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        max-width: 100px;
        img {
          height: 16px;
          margin-right: 5px;
          &:last-child {
            margin-right: 0;
            padding: 4px;
            border-radius: ${(props) => props.theme.borderRadiusSmall};
            filter: invert(${(props) => (props.theme.name === 'dark' ? 1 : 0)});
            pointer-events: auto;
            &:hover {
              background: rgba(${(props) => (props.theme.name === 'dark' ? '0,255,255' : '255,0,0')}, 0.8);
              img {
                filter: invert(1);
              }
            }
          }
        }

        span {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
`

export const TaskIconDiv = styled(CenteredDiv)`
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadiusMiddle};
  transition: all ${(props) => props.theme.transitionSlow} ease-in-out;
  position: relative;
  &:hover {
    background-color: rgba(255, 255, 255, ${(props) => (props.theme.name === 'dark' ? 0.2 : 0.8)});
  }
  background-color: ${({ active, theme: { name } }) =>
    active ? `rgba(255, 255, 255, ${name === 'dark' ? 0.2 : 0.8})` : ''};
  &::after {
    content: '';
    transition: all ${(props) => props.theme.transitionSlow} ease-in-out;
    position: absolute;
    bottom: 0;
    width: ${({ active, hide }: { active: boolean; hide: boolean | undefined; down: boolean; index?: number }) =>
      hide ? 0 : active ? 12 : 7}px;
    height: 3px;
    background-color: ${({ active, theme }) => (active ? theme.themeColor : '#858585')};
    border-radius: ${(props) => props.theme.borderRadiusMiddle};
  }
  img {
    transform: scale(${({ down }) => (down ? 0.8 : 1)});
    transition: all ${(props) => props.theme.transitionSlow} ease-in-out;
  }
  span {
    transform: translateY(40px) scale(0.9);
    animation: move-top ${(props) => props.theme.transitionSlow} linear
      ${({ index }) => ((index as number) > 4 ? 0.2 : 0.1 * (index as number))}s 1 alternate forwards;
    @keyframes move-top {
      0% {
        transform: translateY(40px) scale(0.9);
      }
      30% {
        transform: translateY(-20px) scale(0.8);
      }
      100% {
        transform: translateY(0) scale(1);
      }
    }
  }
  &:nth-child(2) {
    img {
      filter: invert(${(props) => (props.theme.name === 'dark' ? 1 : 0)});
    }
  }
`
