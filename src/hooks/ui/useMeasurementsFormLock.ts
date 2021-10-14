import cloneDeep from 'lodash.clonedeep'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWatch } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { formatNumberValues } from '../../utils/api/progress'

const keysToRemove = ['body_fat', 'fat_mass', 'lean_mass', 'goals']

interface UseMeasurementsFormLock {
  updateInitialValues: (values: any) => void
  onUnlock: () => void
}

export default function useMeasurementsFormLock(
  control: any,
  initialValues: any,
  onOpenDialog: any,
  onRedirectTo: any
): UseMeasurementsFormLock {
  const values = useWatch({ control })
  const history = useHistory()
  const unblock = useRef<any>()
  const [initValues, setInitValues] = useState(initialValues)

  const key = JSON.stringify(values)
  const initKey = JSON.stringify(initValues)

  const compare = useCallback(
    debounce((values1, values2) => {
      const v1 = cloneDeep(values1)
      const v2 = cloneDeep(values2)

      // `type` is unnecessary field to compare, so it always the same as values.type
      v2.type = v1.type

      keysToRemove.forEach((key) => {
        delete v1[key]
        delete v2[key]
      })

      const formatV1 = formatNumberValues(v1)
      const formatV2 = formatNumberValues(v2)

      const equal = isEqual(formatV1, formatV2)

      console.log({
        valuesCopy: formatV1,
        refCopy: formatV2,
        equal
      })

      if (!equal) {
        unblock.current = history.block((location) => {
          onRedirectTo(location.pathname)
          onOpenDialog()
          return false
        })

        return () => {
          unblock.current?.()
        }
      } else {
        unblock.current?.()
        onRedirectTo('')
      }
    }, 400),
    []
  )

  useEffect(() => {
    compare(values, initValues)
  }, [key, initKey])

  const updateInitialValues = useCallback((values: any) => {
    setInitValues(cloneDeep(values))
  }, [])

  const onUnlock = () => {
    unblock.current?.()
  }

  return {
    updateInitialValues,
    onUnlock
  }
}
