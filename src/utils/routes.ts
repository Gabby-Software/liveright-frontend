export function getRoute(
  url: string,
  params: Record<string, any> = {}
): string {
  let route = url

  Object.keys(params).forEach((key) => {
    route = route.replace(`:${key}`, encodeURIComponent(params[key]))
  })

  return route
}
