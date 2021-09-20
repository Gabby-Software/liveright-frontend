import { compile } from 'path-to-regexp'

export function getRoute(
  url: string,
  params: Record<string, any> = {}
): string {
  // let route = url

  // Object.keys(params).forEach((key) => {
  //   const regex = new RegExp(`:${key}[?]?`)
  //   route = route.replace(regex, encodeURIComponent(params[key]))
  // })

  const route = compile(url, { encode: encodeURIComponent })(params)
  return route
}
