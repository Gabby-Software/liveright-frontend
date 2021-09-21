import { createContext } from 'react'

import { UseHealth } from '../../../../hooks/api/progress/useHealth'

const ProgressHealthDataContext = createContext<UseHealth>({
  health: [],
  filters: {},
  isLoading: false,
  onlyInclude: 'sleep',
  onOnlyInclude: () => {},
  onFilters: () => {},
  meta: {
    current_page: 1,
    per_page: 10,
    total: 10
  },
  averages: {},
  isAveragesLoading: false
})

export default ProgressHealthDataContext
