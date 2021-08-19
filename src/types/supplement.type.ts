import { FoodInfoType } from './food.type'
import { LibraryType } from './library.type'

export type SupplementType = LibraryType & {
  link_store: string
  product_id: number
  details: FoodInfoType
}
