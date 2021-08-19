import { ComponentType, SVGProps } from 'react'

export type KnownFileTypesType =
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'xls'
  | 'xlsx'
  | 'csv'
  | 'zip'

export type FileTypesOptionsType = {
  [Property in KnownFileTypesType]: ComponentType<SVGProps<SVGSVGElement>>
}
