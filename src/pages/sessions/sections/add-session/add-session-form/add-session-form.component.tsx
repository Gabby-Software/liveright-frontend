/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
import { Form, Formik, FormikHelpers } from 'formik'
import moment from 'moment'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

import { useClients } from '../../../../../hooks/clients.hook'
import {
  ACTION_EDIT_SESSIONS_REQUEST,
  ACTION_TRAINER_CREATE_SESSION_REQUEST
} from '../../../../../store/action-types'
import { SessionType } from '../../../../../types/session.type'

export type AddSessionFormType = {
  type: string
  date: string
  duration: string
  time: string
  notes: string
  client_id?: number
  session_id?: number
  isBusy?: boolean
  client_request?: {
    duration: string
    date: string
    time: string
  }
}

const initialValuesEmpty: AddSessionFormType = {
  type: 'Paid PT',
  date: '',
  duration: '',
  time: '',
  notes: '',
  session_id: 0,
  isBusy: false
}

type Props = {
  children: React.ReactNode
  onClose: () => void
  session?: SessionType
}

const AddSessionForm: React.FC<Props> = (props) => {
  const { children, onClose, session } = props
  const dispatch = useDispatch()
  const clients = useClients()
  const initialValues = useMemo<AddSessionFormType>(() => {
    if (session) {
      const { client_request } = session
      const date =
        client_request?.date || moment(session.starts_at).format('YYYY-MM-DD')
      const duration = moment(
        client_request?.duration || session.duration,
        'HH:mm:ss'
      ).format('HH:mm')
      const time = client_request
        ? moment(client_request?.time, 'HH:mm:ss').format('HH:mm')
        : moment.utc(session.starts_at).format('HH:mm')

      return {
        type: session.type,
        date,
        time,
        duration,
        client_id: session.client?.id || 0,
        notes: session.notes || '',
        session_id: session.id,
        client_request
      }
    } else {
      return initialValuesEmpty
    }
  }, [session])

  const handleSubmit = (
    values: AddSessionFormType,
    helper: FormikHelpers<AddSessionFormType>
  ) => {
    const { duration, time, client_id, isBusy, ...rest } = values

    if (session) {
      dispatch({
        type: ACTION_EDIT_SESSIONS_REQUEST,
        payload: {
          ...rest,
          isAwaiting: !!session.client_request,
          id: session?.id,
          duration: moment(duration, 'HH:mm').format('HH:mm:ss'),
          time: moment(time, 'HH:mm').format('HH:mm:ss')
        }
      })
    } else {
      const client = clients.data.data.find((it) => it.id === Number(client_id))

      dispatch({
        type: ACTION_TRAINER_CREATE_SESSION_REQUEST,
        payload: {
          ...rest,
          duration: moment(duration, 'h:mm').format('HH:mm:ss'),
          time: moment(time, 'h:mm').format('HH:mm:ss'),
          client_id: Number(client_id),
          client_info: {
            first_name: client?.first_name,
            last_name: client?.last_name
          }
        }
      })
    }

    helper.setSubmitting(false)
    helper.resetForm()
    onClose()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Yup.object({
        type: Yup.string().required(),
        date: Yup.date().required(),
        duration: Yup.string().required(),
        time: Yup.string().required(),
        client_id: Yup.number().required()
      })}
    >
      <Form className="add-session__form">{children}</Form>
    </Formik>
  )
}

export default AddSessionForm
