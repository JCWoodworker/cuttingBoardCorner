export enum LocalStorageElements {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  PERSIST = 'persist',
  THEME = 'theme',
  SELECTED_PRODUCT = 'selected_product'
}

export const clearLocalStorage = (...localStorageElements: string[]) => {
  localStorageElements.forEach(arg => {
    localStorage.removeItem(arg)
  })
}