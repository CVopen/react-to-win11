class SessionStorage {
  getItem(key: string) {
    const value = sessionStorage.getItem(key)
    if (value) return JSON.parse(value)
    return value
  }
  setItem(key: string, value: any) {
    return sessionStorage.setItem(key, JSON.stringify(value))
  }
  removeItem(key: string) {
    sessionStorage.removeItem(key)
  }
  clear() {
    sessionStorage.clear()
  }
}

class Localstorage {
  getItem(key: string) {
    const value = localStorage.getItem(key)
    if (value) return JSON.parse(value)
    return value
  }
  setItem(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  removeItem(key: string) {
    localStorage.removeItem(key)
  }
  clear() {
    localStorage.clear()
  }
}

export const session = new SessionStorage()
export const local = new Localstorage()
