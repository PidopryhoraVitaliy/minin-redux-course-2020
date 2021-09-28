import { CHANGE_THEME, DECREMENT, FREEZE_BTNS, INCREMENT } from "./types"

export function increment() {
    return {
        type: INCREMENT
    }
}

export function decrement() {
    return {
        type: DECREMENT
    }
}

export function asyncIncrement() {
    return function(dispatch) {
        dispatch(freezeBtns(true))
        setTimeout(() => {
            dispatch(increment())
            dispatch(freezeBtns(false))
        }, 1500)
    }
}

/////////////////////////////////////////////////////

export function changeTheme(newTheme) {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}

/////////////////////////////////////////////////////

export function freezeBtns(freeze = false) {
    return {
        type: FREEZE_BTNS,
        payload: freeze
    }
}
