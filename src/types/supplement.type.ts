import {LibraryType} from "./library.type";
import {FoodInfoType} from "./food.type";

export type SupplementType = LibraryType & {
    link_store: string;
    product_id: number;
    details: FoodInfoType;
};
