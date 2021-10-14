import isEqual from 'lodash.isequal'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWatch } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { formatNumberValues } from '../../utils/api/progress'

interface UseMeasurementsFormLock {
  updateInitialValues: (values: any) => void
  onUnlock: () => void
  blockedPath: string
}

export default function useMeasurementsFormLock(
  control: any,
  initialValues: any,
  onOpenDialog: any
): UseMeasurementsFormLock {
  const values = useWatch({ control })
  // const valuesRef = useRef(initialValues)
  const history = useHistory()
  const unblock = useRef<any>()
  const [blockedPath, setBlockedPath] = useState('')
  const [initValues, setInitValues] = useState(initialValues)

  // console.log('1111111', initValues)
  const key = JSON.stringify(values)
  const initKey = JSON.stringify(initValues)

  useEffect(() => {
    const valuesCopy = { ...values }
    delete valuesCopy.goals

    // `type` is unnecessary field to compare, so it always the same as values.type
    const refCopy = { ...initValues }
    delete refCopy.goals
    refCopy.type = valuesCopy.type

    // console.log({
    //   valuesCopy: formatNumberValues(values),
    //   refCopy,
    //   'isEqual(formatNumberValues(valuesCopy), refCopy)': isEqual(
    //     formatNumberValues(valuesCopy),
    //     refCopy
    //   )
    // })

    if (!isEqual(formatNumberValues(valuesCopy), refCopy)) {
      unblock.current = history.block((location) => {
        setBlockedPath(location.pathname)

        onOpenDialog()

        return false
      })

      return () => {
        unblock.current?.()
      }
    } else {
      unblock.current?.()
      setBlockedPath('')
    }
  }, [key, initKey])

  const updateInitialValues = useCallback((values: any) => {
    // console.log('222222222', values)
    setInitValues(values)
  }, [])

  const onUnlock = () => {
    unblock.current?.()
  }

  return {
    updateInitialValues,
    onUnlock,
    blockedPath
  }
}
