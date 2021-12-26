import { useLocation } from 'react-router-dom'

export function useSearchParam(key: string): string | null {
  const search = useLocation().search
  const name = new URLSearchParams(search).get(key)

  return name
}
