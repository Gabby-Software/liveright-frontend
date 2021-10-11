import { compile } from 'path-to-regexp'

export function getRoute(
  url: string,
  params: Record<string, any> = {}
): string {
  const route = compile(url, { encode: encodeURIComponent })(params)
  return route
}
