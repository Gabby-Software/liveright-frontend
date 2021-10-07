import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const GOALS_VALIDATION_SCHEMA = yup.object().shape({
  from: yup.string().required(),
  to: yup.string().required(),
  body_weight: yup.number().required().nullable(),
  body_fat: yup.number().required().nullable(),
  lean_mass: yup.number().required().nullable()
})

export const GOALS_FORM_CONFIG: any = {
  defaultValues: {
    from: '',
    to: '',
    body_weight: null,
    body_fat: null,
    lean_mass: null
  },
  resolver: yupResolver(GOALS_VALIDATION_SCHEMA)
}
