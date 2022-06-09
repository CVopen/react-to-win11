export interface CreatePathLocal {
  path: string[]
  folderList: { folderName: string; frame: '' | 'vue' | 'react' }[]
}

export interface AppState {
  count: number
}

export const initialState: AppState = {
  count: 0,
}
