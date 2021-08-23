import { useEffect } from 'react'

interface DesktopLayoutConfig {
  className?: string
}

interface ConfigRef {
  setClassName: (className: string) => void
}

export const configRef: ConfigRef = {
  setClassName: () => {}
}

export function useDesktopLayoutConfig(config: DesktopLayoutConfig = {}) {
  useEffect(() => {
    if (config.className) {
      configRef.setClassName(config.className)
      return () => configRef.setClassName('')
    }
  }, [config.className])
}
