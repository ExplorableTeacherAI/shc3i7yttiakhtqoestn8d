import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import the addition lesson blocks
import { additionLessonBlocks } from "./sections/AdditionLesson";

/**
 * ------------------------------------------------------------------
 * ADDITION LESSON FOR PRIMARY SCHOOL STUDENTS
 * ------------------------------------------------------------------
 * This interactive lesson teaches young learners about addition
 * using colorful circle visualizations.
 */

export const blocks: ReactElement[] = [
    ...additionLessonBlocks,
];
