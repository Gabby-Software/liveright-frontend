import { useSelector } from 'react-redux'

import { RootState } from '../store/reducers'

export const useProgress = () => {
  return useSelector((state: RootState) => state.progress)
}
