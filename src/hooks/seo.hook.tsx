import { useEffect } from 'react'

import { usePage } from './page.hook'

export const useSeo = () => {
  const page = usePage()
  useEffect(() => {
    if (page) {
      document.title = page.header?.title || page.title
    }
  }, [page])
}
