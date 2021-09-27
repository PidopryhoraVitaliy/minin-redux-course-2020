import { DECREMENT, INCREMENT } from "./types"

export function rootReducer(state, action) {
    if (action.type === INCREMENT) {
        state++
    } else if (action.type === DECREMENT) {
        state--
    }
    return state
}