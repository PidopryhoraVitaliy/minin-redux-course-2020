import { combineReducers } from "redux"
import { CHANGE_THEME, DECREMENT, FREEZE_BTNS, INCREMENT } from "./types"

export function counterReducer(state = 10, action) {
    if (action.type === INCREMENT) {
        state++
    } else if (action.type === DECREMENT) {
        state--
    }
    return state
}

const ititialThemeState = {
    value: 'light'
}
export function themeReducer(state = ititialThemeState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return {...state, value: action.payload}
        default:
            return state
    }
}

export function freezeReducer(state = {value: false}, action) {
    if (action.type === FREEZE_BTNS) {
        return {...state, value: action.payload}
    }
    return state
}

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer,
    freeze: freezeReducer
})