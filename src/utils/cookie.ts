import cookieManager from '../managers/cookie.manager'

export function isCookieBlocked(): boolean {
  return !!cookieManager.get('BLOCK_COOKIE_SET')
}

export function unblockCookies() {
  cookieManager.remove('BLOCK_COOKIE_SET')
}
