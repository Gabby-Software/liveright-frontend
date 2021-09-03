import qs from 'qs'
import qst, { ParsedUrl } from 'query-string'

export function stringifyURL(url: string, params: Record<string, any>): string {
  return url + '?' + qs.stringify(params)
}

export function parseQuery(query: string) {
  return qs.parse(query)
}

export function parseURL(url: string): ParsedUrl {
  return qst.parseUrl(url)
}
