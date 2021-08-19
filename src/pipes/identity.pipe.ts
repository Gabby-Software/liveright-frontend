export const identity = (path: string) => {
  if (document.location.host.startsWith('localhost'))
    return 'http://localhost:5111' + path
  return (
    document.location.protocol + '//identity.' + document.location.host + path
  )
}
