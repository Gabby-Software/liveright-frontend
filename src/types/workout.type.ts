import {LibraryType} from "./library.type";
import {ExerciseLogType} from "./exercise-log.type";

export type WorkoutItemType = {
    exercise_id: number;
    my_info: ExerciseLogType;
}
export type WorkoutType = LibraryType & {
    exercise_list: WorkoutItemType[];
}
