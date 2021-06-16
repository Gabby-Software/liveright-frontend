import {LibraryType} from "./library.type";

export type FoodInfoType = {
    grams: number;
    kcal: number;
    fat: number;
    total_carbs: number;
    net_carbs: number;
    calories:number;
    proteins: number;
    sugar: number;
    fiber: number;
}
export type FoodRecipeType = {
    stepnumber: number;
    instruction: string;
}
export type FoodType = LibraryType & {
    info: FoodInfoType;
    recipe_instructions: FoodRecipeType[];
}
