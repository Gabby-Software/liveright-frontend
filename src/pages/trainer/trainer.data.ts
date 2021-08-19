import moment, { Moment } from 'moment'

import { genderTypes } from '../../enums/gender-types'
import { OptionType } from '../../types/option.type'
export type OnBoardFieldType =
  | 'text'
  | 'date'
  | 'select'
  | 'row'
  | 'textarea'
  | 'country-select'
  | 'radio'
  | 'password'
  | 'list'
export type OnBoardItemType = {
  type: OnBoardFieldType
  name?: string
  label?: string
  options?: OptionType[]
  data?: OnBoardItemType[]
  props?: any
}
export const lrClientFields: OnBoardItemType[] = [
  {
    type: 'textarea',
    name: 'dietary_restrictions',
    label: 'profile:dietary-restrictions'
  },
  {
    type: 'textarea',
    name: 'injuries',
    label: 'profile:injuries'
  }
]
export const lrTrainerFields: OnBoardItemType[] = [
  {
    type: 'textarea',
    name: 'about',
    label: 'profile:about'
  },
  {
    type: 'textarea',
    name: 'qualifications',
    label: 'profile:qualifications'
  },
  {
    type: 'textarea',
    name: 'additional_info',
    label: 'profile:additional-information'
  }
]

export const profileInfo = lrTrainerFields
export const profileBasic: OnBoardItemType[] = [
  {
    name: '',
    label: '',
    type: 'row',
    data: [
      {
        name: 'first_name',
        label: 'profile:first-name',
        type: 'text'
      },
      {
        name: 'last_name',
        label: 'profile:last-name',
        type: 'text'
      },
      {
        name: 'birthday',
        label: 'profile:birth-date',
        type: 'date',
        props: {
          disabledDate: (d: Moment) =>
            d.isAfter(moment()) || d.isBefore(moment().add(-120, 'years'))
        }
      }
    ]
  },
  {
    name: '',
    label: '',
    type: 'row',
    data: [
      {
        name: 'email',
        label: 'profile:email',
        type: 'text'
      },
      {
        name: 'phone_number',
        label: 'profile:phone',
        type: 'text'
      },
      {
        name: 'gender',
        label: 'profile:gender',
        type: 'radio',
        options: [
          { label: 'Male', value: genderTypes.MALE },
          { label: 'Female', value: genderTypes.FEMALE },
          { label: 'Other', value: genderTypes.OTHER }
        ]
      }
    ]
  }
]
