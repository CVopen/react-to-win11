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
  .task-middle {
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .task-right {
    display: flex;
    align-items: center;
    height: 100%;
    div {
      transition: all 0.2s ease-in-out;
      border-radius: ${(props) => props.theme.borderRadiusMiddle};
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
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
      }
    }
  }
`

export const TaskIconDiv = styled(CenteredDiv)`
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadiusMiddle};
  transition: all 0.2s ease-in-out;
  position: relative;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  background-color: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.2)' : '')};
  &::after {
    content: '';
    transition: all 0.2s ease-in-out;
    position: absolute;
    bottom: 0;
    width: ${({ active, hide }: { active: boolean; hide: boolean | undefined; down: boolean }) =>
      hide ? 0 : active ? 12 : 7}px;
    height: 3px;
    background-color: ${({ active, theme }) => (active ? theme.themeColor : '#858585')};
    border-radius: ${(props) => props.theme.borderRadiusMiddle};
  }
  img {
    transform: scale(${({ down }) => (down ? 0.8 : 1)});
    transition: all 0.2s ease-in-out;
  }
  &:nth-child(2) {
    img {
      filter: invert(1);
    }
  }
`
