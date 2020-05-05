const initialState = {
    soundsActive: true, 
}

function HandleUserPrefsReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_PREFS-INITIATE' :   
            console.log("Reducer HandleQueresStatsReducer USER_PREFS-INITIATE")
            nextState = {
                ...state,
                    soundsActive: true,
            }
            return nextState
        case 'USER_PREFS-SOUNDS' :   // value : boolean
            console.log("Reducer HandleQueresStatsReducer USER_PREFS-SOUNDS")
            console.log("Reducer HandleQueresStatsReducer USER_PREFS-SOUNDS value = ", action.value)
            nextState = {
                ...state,
                    soundsActive: action.value,
            } 
            return nextState
        default:
            return state
    }
}

export default HandleUserPrefsReducer