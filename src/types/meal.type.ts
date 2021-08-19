import { FoodInfoType } from './food.type'
import { LibraryType } from './library.type'

export type MealItemType = {
  food_id: number
  supplement_id: number
  my_info: FoodInfoType
}
export type MealType = LibraryType & {
  target: FoodInfoType
  current: FoodInfoType
  food_list: MealType[]
}
