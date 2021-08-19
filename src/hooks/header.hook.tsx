import { useState } from 'react'

import headers, { DEFAULT_TITLE } from '../config/header.config'
import { HeaderConfigType } from '../types/route.type'
import { usePage } from './page.hook'

const defaultHeader: HeaderConfigType = {
  title: DEFAULT_TITLE,
  items: headers.default
}
export const manualHeader: any = {
  title: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTitle: (title: string) => {}
}
export const useHeader = () => {
  const { header } = usePage() || {}
  const [manual, setManual] = useState('')
  manualHeader.title = manual
  manualHeader.setTitle = setManual
  const res = {
    ...defaultHeader,
    ...header
  }
  if (manual) {
    res.title = manual
  }
  return res
}
