interface ICalc {
  X: number
  Y: number
  W: number
  H: number
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
