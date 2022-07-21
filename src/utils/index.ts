interface ICalc {
  X: number
  Y: number
  W: number
  H: number
}

export type Timer = ReturnType<typeof setTimeout>

export enum constant {
  explorer = 'explorer',
}

export function clacMenuPosition({ X, Y, W, H }: ICalc): { X: number; Y: number } {
  const { innerWidth, innerHeight } = window
  if (X + W > innerWidth) {
    X = innerWidth - W
  }
  if (Y + H > innerHeight) {
    Y = innerHeight - H
  }
  return { X, Y }
}

export const explorerList = ['此电脑', '回收站', '网络', '控制面板', 'CVopen']

export const taskIconMap = {
  'Microsoft Edge': require('@/assets/img/desktop/edge browser.png'),
  网易云: require('@/assets/img/desktop/wy-music.png'),
  explorer: require('@/assets/icon/task/Folder.png'),
  settings: require('@/assets/icon/task/settings.png'),
}

export type iconKeys = keyof typeof taskIconMap

export function isExploer(name: string): boolean {
  return explorerList.includes(name)
}

export function getKeyName(key: string): iconKeys {
  if (isExploer(key)) {
    key = 'explorer'
  }
  return key as iconKeys
}

export function computedTransform(dom: HTMLElement): [number, number] {
  let transform: string | string[] = getComputedStyle(dom, null).transform
  if (transform === 'none') transform = '0,0,0,0,0,0)'
  transform = transform.slice(0, transform.length - 1).split(',')
  return [Number(transform[4]), Number(transform[5])]
}
