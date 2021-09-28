import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { rootReducer } from './redux/rootReducer'
import { asyncIncrement, changeTheme, decrement, freezeBtns, increment } from './redux/actions'
import './styles.css'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// time 57:00
function mylogger(state) {
    return function (next) {
        return function (action) {
            console.log('prev state: ', state.getState());
            console.log('action: ', action);
            const nextState = next(action)
            console.log('next state: ', state.getState());
            return nextState
        }
    }
}

/*const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, mylogger),
        //applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)*/
const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, mylogger)
    )
)

store.subscribe(() => {
    const state = store.getState()
    counter.textContent = state.counter
    document.body.className = state.theme.value
    document.querySelectorAll('.btn').forEach(btn => {
        btn.disabled = state.freeze.value
        console.log(btn.disabled);
    })
})
store.dispatch({ type: 'INIT_APPLICATION' })

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light'
    store.dispatch(changeTheme(newTheme))
})
