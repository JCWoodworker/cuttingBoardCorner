export enum LocalStorageElements {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  PERSIST = 'persist',
  THEME = 'theme'
}

export const clearLocalStorage = (...localStorageElements: string[]) => {
  localStorageElements.forEach(arg => {
    localStorage.removeItem(arg)
  })
}