import { DivFull } from '@/assets/css/common'
import styled from 'styled-components'

export const DesktopPage = styled(DivFull)`
  background-size: cover;
  background-repeat: no-repeat;
  user-select: none;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 48px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

export const TaskBarDiv = styled.div`
  width: 100%;
  height: 48px;
  background: ${(props) => props.theme.themeOpacity};
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  padding: 2px 10px;
`
