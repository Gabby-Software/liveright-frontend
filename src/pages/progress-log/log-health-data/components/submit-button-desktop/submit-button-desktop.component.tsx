import { useFormikContext } from 'formik'
import React, { FC, useEffect, useRef, useState } from 'react'

import Button from '../../../../../components/buttons/button/button.component'
import { useScroll } from '../../../../../hooks/scroll.hook'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { SubmitButtonWrapper } from './submit-button-desktop.styles'

const SubmitButtonDesktop: FC = () => {
  const { t } = useTranslation()
  const { isValid, submitForm } = useFormikContext()
  const scrollY = useScroll()
  const [top, setTop] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const t = ref.current.getBoundingClientRect().top - top - 20
    setTop(Math.max(0, -t))
  }, [scrollY])

  return (
    <SubmitButtonWrapper top={top} ref={ref}>
      <Button
        disabled={!isValid}
        onClick={submitForm}
        className="submit__button"
      >
        {t('progress:saveLogs')}
      </Button>
    </SubmitButtonWrapper>
  )
}
export default SubmitButtonDesktop
