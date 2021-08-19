import { PaginationMetaType } from './pagination-meta.type'

export type PaginatedDataType<G> = {
  data: G[]
  meta: PaginationMetaType
}
