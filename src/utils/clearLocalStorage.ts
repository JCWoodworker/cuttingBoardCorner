export const clearLocalStorage = (...localStorageElements: string[]) => {
  localStorageElements.forEach(arg => {
    localStorage.removeItem(arg)
  })
}