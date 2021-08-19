import { usePage } from './page.hook'
export const useDesignVersion = () => {
  const page = usePage()
  return page?.version || 1
}
