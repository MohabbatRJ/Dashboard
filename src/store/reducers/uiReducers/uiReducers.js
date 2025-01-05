import {
    SET_UI_STATE,
    TOGGLE_UI_STATE
} from '../../actions/uiActions/uiActionsTypes';

// uiReducer.js
const initialUIState = {
    mainSidebarOpen: false,
};

const uiReducer = (state = initialUIState, action) => {
    switch (action.type) {
        case SET_UI_STATE:
            if (action.payload.key === null) {
                // Reset all dropdowns to false
                return Object.keys(state).reduce((newState, key) => {
                    newState[key] = false;
                    return newState;
                }, {});
            }
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        case TOGGLE_UI_STATE:
            return {
                // ...state,
                [action.payload]: !state[action.payload],
            };
        default:
            return state;
    }
};

export default uiReducer;
