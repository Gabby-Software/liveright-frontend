export const setItemInLocalStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.log('ERROR: Unable to set item in local storage', error)
  }
}

// Gets item from local storage
export const getItemFromLocalStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.log('ERROR: Unable to get item from local storage', error)

    return ''
  }
}

export const removeItemFromLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
