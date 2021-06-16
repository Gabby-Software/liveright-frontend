import {LibraryType} from "./library.type";
import {FoodInfoType} from "./food.type";

export type MealPlanItemType = {
    meal_id: number;
    timestamp:number;
}
export type MealPlanType = LibraryType & {
    target: FoodInfoType;
    current: FoodInfoType;
    eat_list: MealPlanItemType[];
}
