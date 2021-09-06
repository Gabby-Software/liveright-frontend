export const identity = (path: string) => {
  if (document.location.host.startsWith('localhost'))
    return 'http://localhost:5111' + path
  if (document.location.host.includes('local')) {
    return 'https://bs-local.com:5111'
  }
  return (
    document.location.protocol + '//identity.' + document.location.host + path
  )
}
