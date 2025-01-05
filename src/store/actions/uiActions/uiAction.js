import { 
    SET_UI_STATE,
    TOGGLE_UI_STATE, 
} from "./uiActionsTypes";

export const setUIState = (key, value) => ({
    type: SET_UI_STATE,
    payload: { key, value },
});

export const toggleUIState = (key) => ({
    type: TOGGLE_UI_STATE,
    payload: key,
});