import { PropsWithChildren } from 'react'
import { ThemeProvider as SThemeProvider } from 'styled-components'

import { clientTheme, theme } from '../../assets/styles'
import { useAuth } from '../../hooks/auth.hook'
import { isClient } from '../../utils/api/auth'

export default function ThemeProvider({ children }: PropsWithChildren<any>) {
  const auth = useAuth()
  return (
    <SThemeProvider theme={isClient(auth.type) ? clientTheme : theme}>
      {children}
    </SThemeProvider>
  )
}
